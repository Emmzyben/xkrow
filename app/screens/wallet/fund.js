import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../backend/user';
import useFundWallet from '../../hooks/useFundWallet';
import FundSuccess from '../../components/fundSuccess';
import Failure3 from '../../components/failure3';
import styles from '../../styles/style';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import useGetApi from '../../hooks/useGetapi'


 


const Fund = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { user } = useUser();
  const { fundWallet, loading: fundLoading } = useFundWallet();
  const { ApiKey, loading: apiLoading, error } = useGetApi(); 


  useEffect(() => {
    console.log('Fetched ApiKey:', ApiKey);
  }, [ApiKey]);

  
  const handleOnRedirect = async (data) => {
    console.log('Payment redirect data:', data);
    if (data.status === 'successful') {
      try {
        await fundWallet(parseFloat(amount));
        setPaymentStatus('success');
        console.log('Wallet funded successfully');
      } catch (err) {
        console.error('Error during fund wallet:', err);
        setPaymentStatus('failure');
      }
    } else {
      setPaymentStatus('failure');
    }
  };

  const generateTransactionRef = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `flw_tx_ref_${result}`;
  };

  const handleInitiatePayment = () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styless.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styless.button}>
          <FontAwesomeIcon icon={faArrowLeft} size={19} />
        </TouchableOpacity>
        <Text style={styless.title}>Withdraw</Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={styles.text4}>Enter amount to continue</Text>
        <TextInput
          value={amount}
          keyboardType="number-pad"
          onChangeText={setAmount}
          style={styles.input}
        />
      </View>

      {amount && ApiKey ? (
  <PayWithFlutterwave
    onRedirect={handleOnRedirect}
    options={{
      tx_ref: generateTransactionRef(10),
      authorization: ApiKey, // Ensure this is correctly fetched
      customer: {
        email: user.email,
      },
      amount: parseFloat(amount),
      currency: 'NGN',
      payment_options: "card, ussd, banktransfer",
    }}
    customButton={(props) => (
      <TouchableOpacity style={styles.btn} onPress={props.onPress}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Fund Wallet</Text>
      </TouchableOpacity>
    )}
  />
) : (
  <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Enter an amount')}>
    <Text style={{ color: '#fff', textAlign: 'center' }}>Fund Wallet</Text>
  </TouchableOpacity>
)}

      {paymentStatus === 'success' && <FundSuccess onClose={() => navigation.navigate('Wallet')} />}
      {paymentStatus === 'failure' && <Failure3 onClose={() => navigation.navigate('Wallet')} />}
    </View>
  );
};

export default Fund;

const styless = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(102, 112, 133, 1)',
    paddingTop: 40,
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
});
