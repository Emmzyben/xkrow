import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import styles from '../../styles/style';
import { useUser } from '../../backend/user';
import useCreateBvn from '../../hooks/useCreateBvn';

const Page3 = ({ navigation }) => {
  const contextUser = useUser();
  const { createBvn, loading, error } = useCreateBvn();
  const [bvn, setBvn] = useState('');

  const validate = () => {
    if (!bvn) {
      return 'A BVN is required';
    }
    return null;
  };

  const submitBvn = async () => {
    const errorMsg = validate();
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    try {
      await createBvn({
        userId: contextUser.user.id,
        bvn,
      });
      navigation.navigate('Page4');
    } catch (error) {
      alert(error.message || 'Submit failed');
    }
  };

  return (
    <View style={styles.kyc1}>
      <Text style={localStyles.header}>Personal Information</Text>
      <View style={styles.maincontainer}>
        <Text style={styles.text5}>BVN Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder='BVN' 
          keyboardType='numeric'
          value={bvn}
          onChangeText={setBvn}
        />
        
        {error ? <Text style={styles.text7}>{error.message}</Text> : null}
        
        <View style={styles.lastDown}>
          <TouchableOpacity
            style={styles.btn}
            onPress={submitBvn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Proceed</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
    padding: 10,
  },
});

export default Page3;
