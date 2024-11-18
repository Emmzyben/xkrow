import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useCreateTransfer from '../../hooks/useCreateTransfer';
import styles from '../../styles/style';
import BankSelect from '../../components/BankSelect';
import useGetApi from '../../hooks/useGetapi';

const Withdraw = ({ navigation }) => {
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [loadingAccount, setLoadingAccount] = useState(false); 
  const { ApiKey, loading: apiLoading, apierror } = useGetApi(); 
  const { createTransfer, loading, error, result } = useCreateTransfer();

  useEffect(() => {
    console.log('Fetched ApiKey:', ApiKey);
  }, [ApiKey]);

  // Function to handle account lookup
  const handleAccountLookup = async () => {
    if (bankCode && accountNumber) {
      setLoadingAccount(true);
      console.log('Account Lookup Payload:', { bank_code: bankCode, account_number: accountNumber });
  
      try {
        const response = await fetch(`https://nubapi.com/api/verify?account_number=${accountNumber}&bank_code=${bankCode}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer dqcefCCG3UQ69laZ6d1kiSos2AW4X2ocUhd2TBDW66245e20`,
          }
        });
  
        const data = await response.json();
        console.log('Account Lookup Response:', data);
  
        // Check 'status' inside 'data' instead of response.status
        if (data.status === 200) {
          setAccountName(data.account_name);
        } else {
          Alert.alert('Error', 'Account lookup failed. Please check your details.');
        }
      } catch (error) {
        console.log('Account Lookup Error:', error);
        Alert.alert('Error', 'Something went wrong during account lookup.');
      } finally {
        setLoadingAccount(false);
      }
    } else {
      Alert.alert('Validation Error', 'Please enter both bank code and account number.');
    }
  };
  
  

  const handleConfirm = async () => {
    if (bankCode && accountNumber && accountName && amount) {
      await createTransfer(bankCode, accountNumber, accountName, amount);
    } else {
      Alert.alert('Validation Error', 'Please fill all fields.');
    }
  };
  useEffect(() => {
    if (result) {
      Alert.alert('Success', 'Withdrawal Successful!');
      navigation.navigate('Wallet');
    }
  }, [result]);
  
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);
  
  
  return (
    <ScrollView>
      <View style={styless.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Landing')}
          style={styless.button}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={19} />
        </TouchableOpacity>
        <Text style={styless.title}>Withdraw</Text>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
        <View>
          <Text style={styles.text4}>Send to your bank account</Text>
          <Text>{'\n'}</Text>
          <Text style={styles.text7}>Kindly enter and confirm your bank details</Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={styles.text5}>Bank Name</Text>
        <BankSelect selectedBank={bankCode} onBankChange={setBankCode} />
        
        <Text style={styles.text5}>Account No.</Text>
        <TextInput
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType='numeric'
          style={styles.input}
          onBlur={handleAccountLookup} 
        />
       
        <Text style={styles.text5}>Account Name</Text>
        <View style={styless.inputWithLoader}>
          <TextInput
            value={accountName}
            onChangeText={setAccountName}
            keyboardType='default'
            style={[styles.input, { paddingRight: 40 }]} 
            editable={false} 
          />
          {loadingAccount && (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={styless.loadingIndicator}
            />
          )}
        </View>

        <Text style={styles.text5}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType='numeric'
          style={styles.input}
        />
      </View>

      <View style={styles.lastDown1}>
        <TouchableOpacity
          style={styless.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styless.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" />}
      </View>
    </ScrollView>
  );
};

const styless = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(102, 112, 133, 1)',paddingTop:40
  },
  button: {
    position: 'absolute',
    top: 40,
    left: 30,
    zIndex: 1000,
  },
  title: {
    textAlign: 'center',
    fontSize: 15.3,
    lineHeight: 18.51,
    fontWeight: '700',
    color: '#141414',
  },
  confirmButton: {
    backgroundColor: 'rgba(98, 36, 143, 1)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
  inputWithLoader: {
    position: 'relative',
    justifyContent: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
    right: 200,
    top: 25,
  },
});

export default Withdraw;
