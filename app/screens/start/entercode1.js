import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/style';
import { SMS_API_kEY } from '@env';

const EnterCode1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, phone, password } = route.params || {};

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60); 
  const [pinId, setPinId] = useState(''); // State to store the pinId

  useEffect(() => {
    if (!email || !password || !phone) {
      setError('Invalid registration details');
      navigation.navigate('Register'); 
      return;
    }

    sendSMSCode();

    const timer = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [phone]);

  const sendSMSCode = () => {
    setLoading(true);
    const data = JSON.stringify({
      api_key: SMS_API_kEY,
      message_type: "NUMERIC",
      to: phone,
      from: "N-Alert",
      channel: "dnd",
      pin_attempts: 3,
      pin_time_to_live: 5,
      pin_length: 6,
      pin_placeholder: "< 1234 >",
      message_text: "Your Xkrow verification code is < 1234 >. Valid for 10 minutes, one-time use only",
      pin_type: "NUMERIC",
    });
  
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        try {
          if (this.responseText) {
            const response = JSON.parse(this.responseText);
            console.log(response);
            if (response.pinId) {
              setPinId(response.pinId); // Store pinId
            } else {
              setError('Failed to get a valid response from the server.');
            }
          } else {
            setError('');
          }
        } catch (error) {
          console.error('Failed to parse response', error);
          setError('Error parsing response.');
        } finally {
          setLoading(false);
          setResendEnabled(true);
        }
      }
    });
  
    xhr.open("POST", "https://v3.api.termii.com/api/sms/otp/send");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  };
  

  const resendCode = () => {
    setResendCountdown(60); // reset countdown
    setResendEnabled(false);
    sendSMSCode();
  };

  const verifyCode = () => {
    if (!code || !pinId) {
      setError('Verification code or Pin ID is missing');
      return;
    }
  
    setLoading(true);
    const data = JSON.stringify({
      api_key: SMS_API_kEY,
      pin_id: pinId, 
      pin: code,
    });
  
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        try {
          if (this.responseText) {
            const response = JSON.parse(this.responseText);
            console.log(response);
  
            if (response.verified) {
              navigation.navigate('EnterCode', { email,phone, password });
            } else {
              setError('Invalid verification code');
            }
          } else {
            setError('No response from the server.');
          }
        } catch (error) {
          console.error('Failed to parse response', error);
          setError('Error parsing response.');
        } finally {
          setLoading(false);
        }
      }
    });
  
    xhr.open("POST", "https://v3.api.termii.com/api/sms/otp/verify");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.login}>
      <Text style={styles.text}>Phone Number Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter verification code sent to your phone"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      {error ? <Text style={styles.text7}>{error}</Text> : null}

      {resendCountdown <= 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={resendCode}
          disabled={!resendEnabled}
        >
          <Text style={styles.buttonText}>Resend Code</Text>
        </TouchableOpacity>
      )}
      <Text style={{ fontSize: 13 }}>Resend Code Available In: {formatTime(resendCountdown)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={verifyCode}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EnterCode1;
