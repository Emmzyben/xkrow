import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../../styles/style';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState({ code: 'US', name: 'United States', callingCode: ['1'] });
  const countryCode = country.callingCode[0]; // Extracting calling code
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    setError('');

    if (!email) {
      setError('An Email is required');
      return true;
    }
    if (!phone) {
      setError('A phone number is required');
      return true;
    }

    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailReg.test(email)) {
      setError('The Email is not valid');
      return true;
    }

    if (phone.length < 10) {
      setError('The phone number is not valid');
      return true;
    }

    if (!password) {
      setError('A Password is required');
      return true;
    }

    if (password.length < 8) {
      setError('The Password needs to be longer');
      return true;
    }

    if (password !== confirmPassword) {
      setError('The Passwords do not match');
      return true;
    }

    return false;
  };

  const handleNext = () => {
    if (!validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('EnterCode1', { email, phone: `+${countryCode}${phone}`, password });
      }, 1500);
    }
  };

  return (
    <View style={styles.login}>
      <Text style={styles.text}>Create an Account</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CountryPicker
            countryCode={country.code}
            withFilter
            withFlag
            withCountryNameButton={false}
            onSelect={(selectedCountry) => {
              setCountry({
                code: selectedCountry.cca2,
                name: selectedCountry.name,
                callingCode: selectedCountry.callingCode,
              });
            }}
            containerButtonStyle={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.input10}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {error ? <Text style={styles.text7}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ margin: 50 }}>
        <Text style={{ textAlign: 'center', color: 'grey' }}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link2}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
