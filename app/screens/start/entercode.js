import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../../backend/user';
import { DATABASE_ID, VERIFICATION, MAILGUN_API_KEY, MAILGUN_DOMAIN } from '@env';
import { database, ID, Query } from '../../backend/appwite';
import styles from '../../styles/style';

const EnterCode = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email,phone, password } = route.params || {};
  const contextUser = useUser();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(600);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(10); 

  const timerRef = useRef(null);
  const resendTimerRef = useRef(null);

  useEffect(() => {
    if (!email || !password) {
      setError('Invalid registration details');
      navigation.navigate('Register'); 
      return;
    }

    const sendEmailAndCreateVerification = async () => {
      const verificationCode = generateCode();
      const success = await sendEmail(email, verificationCode);

      if (success) {
        try {
          await database.createDocument(
            DATABASE_ID,
            VERIFICATION,
            ID.unique(),
            {
              email,
              code: verificationCode,
              created_at: new Date().toISOString(),
            }
          );
        } catch (err) {
          console.error('Error creating verification document:', err);
        }
      } else {
        setError('Failed to send verification email');
      }
    };

    sendEmailAndCreateVerification();
    startCountdown();
    startResendCountdown();

    return () => {
      clearInterval(timerRef.current);
      clearInterval(resendTimerRef.current);
    };
  }, [email, password, navigation]);

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
  };

  const sendEmail = async (email, verificationCode) => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const url = `https://api.mailgun.net/v3/xkrow.org/messages`;
      const formData = new FormData();

      formData.append('from', 'Xkrow <mailgun@xkrow.org>');
      formData.append('to', email);
      formData.append('subject', 'Your Verification Code');
      formData.append('text', `Your verification code is: ${verificationCode}`);

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Email sent successfully:', xhr.responseText);
            resolve(true);
          } else {
            console.error('Error sending email:', xhr.responseText);
            resolve(false);
          }
        }
      };

      xhr.onerror = function () {
        console.error('Request error');
        resolve(false);
      };

      xhr.send(formData);
    });
  };

  const startCountdown = () => {
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startResendCountdown = () => {
    resendTimerRef.current = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 0) {
          clearInterval(resendTimerRef.current);
          setResendEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        VERIFICATION,
        [Query.equal('email', email), Query.equal('code', code)]
      );

      if (response.documents.length > 0) {
        const document = response.documents[0];
        const createdAt = new Date(document.created_at);
        const now = new Date();
        const tenMinutes = 10 * 60 * 1000;

        if (now - createdAt > tenMinutes) {
          setLoading(false);
          setError('Verification code expired. Please request a new code.');
          return;
        }

        await contextUser.register(email,phone, password);
        await database.deleteDocument(DATABASE_ID, VERIFICATION, document.$id);

        setLoading(false);
        navigation.navigate('AdvertVideo'); 
      } else {
        setLoading(false);
        setError('Invalid verification code');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setLoading(false);
      setError('Verification failed');
    }
  };

  const resendCode = async () => {
    if (!resendEnabled) return;

    setError('');
    const newCode = generateCode();
    const success = await sendEmail(email, newCode);

    if (success) {
      try {
        await database.createDocument(
          DATABASE_ID,
          VERIFICATION,
          ID.unique(),
          {
            email,
            code: newCode,
            created_at: new Date().toISOString(),
          }
        );
        setResendCountdown(10);
        setResendEnabled(false);
        startResendCountdown();
      } catch (err) {
        console.error('Error creating verification document:', err);
        setError('Failed to resend verification email');
      }
    } else {
      setError('Failed to resend verification email');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.login}>
      <Text style={styles.text}>Email Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter verification Code sent to your email"
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

export default EnterCode;
