import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import styles from '../../styles/style';
import { useUser } from '../../backend/user';
import { account } from '../../backend/appwite';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PasswordReset = ({ navigation }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    setError('');

    if (!currentPassword) {
      setError('Current password is required');
      return true;
    }

    if (!newPassword) {
      setError('New password is required');
      return true;
    }

    if (!confirmPassword) {
      setError('Confirm password is required');
      return true;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return true;
    }

    return false;
  };

  const resetPassword = async () => {
    if (validate()) return;

    try {
      setLoading(true);
      await account.updatePassword(newPassword, currentPassword); // Provide both new and current passwords
      setLoading(false);
      alert('Password has been reset successfully');
      navigation.goBack(); // Navigate to the desired page after password reset
    } catch (error) {
      console.error('Password reset error:', error);
      setLoading(false);
      setError('Password reset failed. Please check your credentials.');
    }
  };

  return (
    <ScrollView style={styles.kyc1}>
      <View style={localStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={17} />
        </TouchableOpacity>
        <Text style={localStyles.headerTitle}>Password Reset</Text>
      </View>
      <View style={styles.maincontainer}>
        <Text style={styles.text5}>Current password</Text>
        <TextInput
          style={styles.input}
          placeholder='Current password'
          keyboardType='default'
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <Text style={styles.text5}>New password</Text>
        <TextInput
          style={styles.input}
          placeholder='New password'
          keyboardType='default'
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Text style={styles.text5}>Confirm password</Text>
        <TextInput
          style={styles.input}
          placeholder='Confirm password'
          keyboardType='default'
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      {error ? <Text style={styles.text7}>{error}</Text> : null}

      <View style={styles.lastDown}>
        <TouchableOpacity
          style={styles.btn}
          onPress={resetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Change password</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 30,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 25,
    zIndex: 10000,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 15.3,
    lineHeight: 18.52,
    fontWeight: '700',
    color: '#141414',
  },
});

export default PasswordReset;
