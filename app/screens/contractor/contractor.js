import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Xkrow from '../../components/xkrow';
import styles from '../../styles/style';
import { useUser } from '../../backend/user';
import useCreateContractor from '../../hooks/useCreateContractor';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { database, Query } from '../../backend/appwite';
import { DATABASE_ID, COLLECTION_ID_PROFILE, COLLECTION_ID_BVN, COLLECTION_ID_IDENTITY } from '@env';
import useGetProfile from '../../hooks/useGetProfile';
import KYC from '../../components/kyc';
import KYC2 from '../../components/kyc2';
import KYC3 from '../../components/kyc3';

const Contractor = ({ navigation }) => {
  const [paymentType, setPaymentType] = useState('One time payment');
  const [installments, setInstallments] = useState([{ amount: '', date: new Date() }]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerIndex, setDatePickerIndex] = useState(null);
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [amount, setAmount] = useState('');
  const [escrowLink, setEscrowLink] = useState(null);
  const { profile, loading: profileLoading, error: profileError, fetchProfile } = useGetProfile();
  const [showKYC1, setShowKYC1] = useState(false);
  const [showKYC2, setShowKYC2] = useState(false);
  const [showKYC3, setShowKYC3] = useState(false);
  const [checkingKYC, setCheckingKYC] = useState(false);
  const contextUser = useUser();
  const { createContractor, loading, error } = useCreateContractor();

  const checkCollections = async () => {
    try {
      const userIdQuery = [Query.equal('user_id', contextUser.user.id)];

      const profileResponse = await database.listDocuments(DATABASE_ID, COLLECTION_ID_PROFILE, userIdQuery);
      const bvnResponse = await database.listDocuments(DATABASE_ID, COLLECTION_ID_BVN, userIdQuery);
      const identityResponse = await database.listDocuments(DATABASE_ID, COLLECTION_ID_IDENTITY, userIdQuery);

      if (profileResponse.total === 0) {
        setShowKYC1(true);
      } else if (bvnResponse.total === 0 && identityResponse.total === 0) {
        setShowKYC2(true);
      } else if (bvnResponse.total > 0 && identityResponse.total === 0) {
        setShowKYC3(true);
      }
    } catch (error) {
      console.error('Error checking collections:', error);
    }
  };

  useEffect(() => {
    if (contextUser.user?.id) {
      fetchProfile();
      setCheckingKYC(true);
      const intervalId = setInterval(() => {
        checkCollections();
      }, 1000);

      return () => {
        clearInterval(intervalId);
        setCheckingKYC(false);
      };
    }
  }, [contextUser.user]);

  const handleNavigation = (route) => {
    setShowKYC1(false);
    setShowKYC2(false);
    setShowKYC3(false);
    navigation.navigate(route);
  };

  const validate = () => {
    if (!title) return 'Contract title is required';
    if (paymentType === 'One time payment' && !amount) return 'Amount is required';
    if (paymentType === 'Installmental payment' && installments.some(inst => !inst.amount || !inst.date)) return 'All installments require an amount and date';
    return null;
  };

  const submitContractor = async () => {
    const errorMsg = validate();
    if (errorMsg) {
      Alert.alert('Validation Error', errorMsg);
      return;
    }

    try {
      const contractorData = {
        userId: contextUser.user.id,
        title,
        description,
        duration,
        paymentType,
        amount: paymentType === 'One time payment' ? amount : undefined,
        installments: paymentType === 'Installmental payment' ? installments.map(inst => ({
          amount: inst.amount,
          date: inst.date.toLocaleDateString('en-GB') // Format as "dd/mm/yyyy"
        })) : undefined,
      };

      const link = await createContractor(contractorData);
      setEscrowLink(link);
    } catch (error) {
      Alert.alert('Submit Failed', error.message || 'Submit failed');
    }
  };

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value);
    if (value === 'Installmental payment') {
      setInstallments([{ amount: '', date: new Date() }]);
    }
  };

  const handleInstallmentChange = (index, key, value) => {
    const newInstallments = [...installments];
    if (key === 'date') {
      newInstallments[index][key] = new Date(value);
    } else {
      newInstallments[index][key] = value;
    }
    setInstallments(newInstallments);
  };

  const addInstallment = () => {
    setInstallments([...installments, { amount: '', date: new Date() }]);
  };

  const removeInstallment = (index) => {
    const newInstallments = installments.filter((_, i) => i !== index);
    setInstallments(newInstallments);
  };

  const showDatepicker = (index) => {
    setDatePickerIndex(index);
    setDatePickerMode('date');
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      handleInstallmentChange(datePickerIndex, 'date', selectedDate);
    }
  };

  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
      <View style={localStyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Buyer1')} style={localStyles.arrowButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={17} />
        </TouchableOpacity>
        <Text style={localStyles.title}>New Xkrow transaction</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Chatbox')} style={localStyles.chatButton}>
          <FontAwesomeIcon icon={faCommentDots} size={17} />
        </TouchableOpacity>
      </View>

      <View style={localStyles.formContainer}>
        <Text style={styles.text4}>What contract would you like to do</Text>
        <Text style={styles.text5}>Contract Title</Text>
        <TextInput style={styles.input} placeholder='Enter title' keyboardType='default' value={title} onChangeText={setTitle} />

        <Text style={styles.text5}>Descriptions</Text>
        <TextInput style={styles.input} placeholder='Enter description' keyboardType='default' value={description} onChangeText={setDescription} />
        <Text style={styles.text5}>Duration</Text>
        <TextInput style={styles.input} placeholder='Enter Duration' keyboardType='default' value={duration} onChangeText={setDuration} />

        <Text style={styles.text5}>Type of payment</Text>
        <View style={localStyles.picker}>
          <Picker
            selectedValue={paymentType}
            onValueChange={(itemValue) => handlePaymentTypeChange(itemValue)}
          >
            <Picker.Item label="One time payment" value="One time payment" />
            <Picker.Item label="Installmental payment" value="Installmental payment" />
          </Picker>
        </View>

        {paymentType === 'One time payment' ? (
          <>
            <Text style={styles.text5}>Amount</Text>
            <TextInput style={styles.input} placeholder='Enter amount' keyboardType='numeric' value={amount} onChangeText={setAmount} />
          </>
        ) : (
          <View>
            {installments.map((installment, index) => (
              <View key={index} style={localStyles.installmentRow}>
                <TextInput
                  style={[styles.input, localStyles.installmentInput]}
                  placeholder='Enter amount'
                  keyboardType='numeric'
                  value={installment.amount}
                  onChangeText={(value) => handleInstallmentChange(index, 'amount', value)}
                />
                <TouchableOpacity onPress={() => showDatepicker(index)}>
                  <TextInput
                    style={[styles.input, localStyles.installmentInput]}
                    placeholder='Enter date'
                    value={installment.date.toLocaleDateString('en-GB')} // Format as "dd/mm/yyyy"
                    editable={false}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeInstallment(index)} style={localStyles.removeButton}>
                  <Text style={localStyles.text5}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={addInstallment} style={localStyles.addButton}>
              <Text style={localStyles.text5}>Add Installment</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={submitContractor} style={styles.btn} >
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{color:'#fff',textAlign:"center"}}>Submit</Text>}
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={installments[datePickerIndex]?.date || new Date()}
            mode={datePickerMode}
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
      {escrowLink && <Xkrow escrowLink={escrowLink} />}
      {showKYC1 && <KYC onClose={() => handleNavigation('KYC')} />}
      {showKYC2 && <KYC2 onClose={() => handleNavigation('KYC2')} />}
      {showKYC3 && <KYC3 onClose={() => handleNavigation('KYC3')} />}
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,paddingTop:35
  },
  arrowButton: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatButton: {
    padding: 10,
  },
  formContainer: {
    padding: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  installmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  installmentInput: {
    flex: 1,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: 'rgba(98, 36, 143, 1)',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    marginBottom:15,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  text5:{
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
    color: '#fff',
  }
});


export default Contractor;
