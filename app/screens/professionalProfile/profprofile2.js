import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../backend/user';
import useCreatePersonalInfo from '../../hooks/useCreatePersonalInfo2';
import Successfull from '../../components/successfull';

const ProfProfile2 = ({ navigation }) => {
  const contextUser = useUser();

  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); 

  const handleSubmit = async () => {
    if (!businessName || !businessType || !businessCategory || !businessDescription || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (contextUser && contextUser.user && contextUser.user.id) {
      const personalInfo = {
        userId: contextUser.user.id,
        businessName,
        businessType,
        businessCategory,
        businessDescription,
        address,
      };

      setLoading(true); // Start loading
      try {
        await useCreatePersonalInfo(personalInfo);
        setSuccess(true); // Set success to true
      } catch (error) {
        console.error('Error saving business information:', error);
        Alert.alert('Error', 'Failed to save business information');
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      Alert.alert('Error', 'User not found');
    }
  };

  if (success) {
    return <Successfull />;
  }

  return (
    <ScrollView>
      <View style={localStyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfProfile1')} style={localStyles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={19} />
        </TouchableOpacity>
        <Text style={localStyles.headerTitle}>Professional Information</Text>
      </View>

      <View style={styles.maincontainer}>
        <Text style={styles.text5}>Professional Name</Text>
        <TextInput 
          style={styles.input1} 
          placeholder='Professional Name' 
          keyboardType='default'
          value={businessName}
          onChangeText={setBusinessName}
        />

        <Text style={styles.text5}>Profession Type</Text>
        <View style={localStyles.picker}>
          <Picker
            selectedValue={businessType}
            onValueChange={(itemValue) => setBusinessType(itemValue)}
            itemStyle={localStyles.pickerItem} 
          >
            <Picker.Item label="Select Profession Type" value="" />
            <Picker.Item label="Information Technology (IT)" value="Information Technology (IT)" />
            <Picker.Item label="Engineering and Architecture" value="Engineering and Architecture" />
            <Picker.Item label="Legal and Law Enforcement" value="Legal and Law Enforcement" />
            <Picker.Item label="Education and Training" value="Education and Training" />
            <Picker.Item label="Arts, Design, and Media" value="Arts, Design, and Media" />
            <Picker.Item label="Sales, Marketing, and Advertising" value="Sales, Marketing, and Advertising" />
            <Picker.Item label="Construction and Skilled Trades" value="Construction and Skilled Trades" />
            <Picker.Item label="Sports and Fitness" value="Sports and Fitness" />
            <Picker.Item label="Manufacturing and Production" value="Manufacturing and Production" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <Text style={styles.text5}>Profession Category</Text>
        <View style={localStyles.picker}>
          <Picker
            selectedValue={businessCategory}
            onValueChange={(itemValue) => setBusinessCategory(itemValue)}
            itemStyle={localStyles.pickerItem} 
          >
            <Picker.Item label="Select Profession Category" value="" />
            <Picker.Item label="Software Developer" value="Software Developer" />
            <Picker.Item label="Web Developer" value="Web Developer" />
            <Picker.Item label="Data Scientist" value="Data Scientist" />
            <Picker.Item label="Cybersecurity Expert" value="Cybersecurity Expert" />
            <Picker.Item label="IT Support Specialist" value="IT Support Specialist" />
            <Picker.Item label="Civil Engineers" value="Civil Engineers" />
            <Picker.Item label="Mechanical Engineers" value="Mechanical Engineers" />
            <Picker.Item label="Electrical Engineers" value="Electrical Engineers" />
            <Picker.Item label="Architects" value="Architects" />
            <Picker.Item label="Lawyers" value="Lawyers" />
            <Picker.Item label="Tutors" value="Tutors" />
            <Picker.Item label="Graphic Designers" value="Graphic Designers" />
            <Picker.Item label="Writers and Editors" value="Writers and Editors" />
            <Picker.Item label="Photographers" value="Photographers" />
            <Picker.Item label="Musicians and Composers" value="Musicians and Composers" />
            <Picker.Item label="Digital Marketers" value="Digital Marketers" />
            <Picker.Item label="Content Creators" value="Content Creators" />
            <Picker.Item label="Carpenters" value="Carpenters" />
            <Picker.Item label="Electricians" value="Electricians" />
            <Picker.Item label="Plumbers" value="Plumbers" />
            <Picker.Item label="Masons" value="Masons" />
            <Picker.Item label="Welders" value="Welders" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <Text style={styles.text5}>Description</Text>
        <TextInput 
          style={styles.input1} 
          placeholder='Description' 
          keyboardType='default' 
          value={businessDescription}
          onChangeText={setBusinessDescription}
        />

        <Text style={styles.text5}>Address</Text>
        <TextInput 
          style={styles.input1} 
          placeholder='Address' 
          keyboardType='default' 
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.lastDown}>
        <TouchableOpacity
          style={styles.btn} 
          onPress={handleSubmit}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(102, 112, 133, 1)',paddingTop:35
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 30,zIndex:10000
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18.52,
    fontWeight: '700',
    color: '#141414',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  pickerItem: {
    fontSize: 12, // Set the font size to 12
  },
});

export default ProfProfile2;
