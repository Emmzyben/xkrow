import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import styles from '../../styles/style';
import { account } from '../../backend/appwite'

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState(''); 

  const handleRecovery = async () => {
    const recoveryUrl = 'https://xkrow.org/passwordReset.html'; 

    try {
      // Call the account.createRecovery method to send the recovery email
      await account.createRecovery(email, recoveryUrl);
      Alert.alert('Success', 'A recovery email has been sent to your address.');
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred while sending the recovery email.');
    }
  };

  return (
    <View style={styles.login}>
      <Text style={styles.text}>Forgot<Text>{'\n'}</Text>password?</Text>
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder='Enter your email address' 
          keyboardType='email-address'
          value={email} 
          onChangeText={setEmail}
        />
        <Text>
          <Text style={{color: 'red'}}>*</Text>  
          We will send you a message to set or reset your new password
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleRecovery}>
          <Text style={{ color: 'white',textAlign:'center' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Forgot;
