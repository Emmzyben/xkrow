import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, Image } from 'react-native';
import { useUser } from '../../backend/user';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import useUpdateProfile from '../../hooks/useUpdateProfile';
import { API_URL, BUCKET_ID, PROJECT_ID } from '@env';
import Successfull from '../../components/successfull';
import * as ImagePicker from 'expo-image-picker';
import { ID } from '../../backend/appwite';

const Biopage = ({ navigation }) => {
  const contextUser = useUser();
  const { updateProfile } = useUpdateProfile(); // Use the hook
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number
  const [Dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const uploadFile = async (file) => {
    if (!file) {
      throw new Error("No file selected");
    }

    const filename = file.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(file.uri);
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append('fileId', ID.unique());
    formData.append('file', {
      uri: file.uri,
      name: filename,
      type,
    });

    try {
      const response = await sendXmlHttpRequest(formData);
      return response.$id;
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Failed to upload image');
      throw error; // Rethrow to handle in submitProfile
    }
  };

  const sendXmlHttpRequest = (data) => {
    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 201) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Request failed with status ${xhr.status}`));
          }
        }
      };
      
      xhr.open("POST", `${API_URL}/storage/buckets/${BUCKET_ID}/files/`);
      xhr.withCredentials = true;
      xhr.setRequestHeader("X-Appwrite-Project", PROJECT_ID);
      xhr.setRequestHeader("X-Appwrite-Response-Format", "0.15.0");
      xhr.setRequestHeader("x-sdk-version", "appwrite:web:9.0.1");
      xhr.send(data);
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || Dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const submitProfile = async () => {
    if (!firstName || !lastName || !gender || !address || !Dob || !file || !phone) {
      Alert.alert('Error', 'Please fill in all fields and add an image');
      return;
    }

    if (contextUser && contextUser.user && contextUser.user.id) {
      setLoading(true);
      try {
        const fileId = await uploadFile(file);
        const image_url = `${API_URL}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;

        const profileData = {
          firstName,
          lastName,
          gender,
          address,
          phone, // Add phone number to profile data
          Dob: Dob.toISOString().split('T')[0],
          image_url,
        };

        await updateProfile(profileData);
        setSuccess(true);
      } catch (error) {
        console.error('Error saving profile information:', error);
        setError('Failed to save profile information');
      } finally {
        setLoading(false);
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
      <View style={{ padding: 20, paddingTop: 55 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 55, left: 25, zIndex: 10000 }}>
          <FontAwesomeIcon icon={faArrowLeft} size={17} />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontSize: 15.3, lineHeight: 18.52, fontWeight: '700', color: '#141414' }}>Bio-data</Text>
      </View>
      <View style={{ margin: 15, padding: 15 }}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            {file ? (
              <Image source={{ uri: file.uri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
              <Text>Select Profile Image</Text>
            )}
            <TouchableOpacity onPress={handleImagePick} style={{ position: 'absolute', bottom: -5, right: -40, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 5 }}>
              <FontAwesomeIcon icon={faPen} size={18} color='#fff' />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={{ width: '100%', padding: 15, marginVertical: 10, backgroundColor: '#fff' }}
          placeholder='First name'
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={{ width: '100%', padding: 15, marginVertical: 10, backgroundColor: '#fff' }}
          placeholder='Last name'
          value={lastName}
          onChangeText={setLastName}
        />
        <View style={{ height: 50, width: '100%', backgroundColor: '#fff', borderRadius: 5, marginBottom: 10 }}>
          <Picker
            selectedValue={gender}
            style={{ height: 50, width: '100%' }}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select your gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
        <TextInput
          style={{ width: '100%', padding: 15, marginVertical: 10, backgroundColor: '#fff' }}
          placeholder='Address'
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={{ width: '100%', padding: 15, marginVertical: 10, backgroundColor: '#fff' }}
          placeholder='Phone number'
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={{ marginVertical: 10, fontSize: 16 }}>What is your date of birth</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ width: '100%', padding: 15, marginVertical: 10, backgroundColor: '#fff' }}>
          <Text style={{ color: Dob ? 'black' : 'gray' }}>{Dob.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={Dob}
            mode='date'
            display='default'
            onChange={handleDateChange}
          />
        )}
        {error ? <Text style={{ color: 'red', marginVertical: 10 }}>{error}</Text> : null}
      </View>
      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        {loading ? <ActivityIndicator size='large' color='#0000ff' /> : (
          <TouchableOpacity onPress={submitProfile} style={{ backgroundColor: '#62248F', padding: 15, borderRadius: 5,width:'85%' }}>
            <Text style={{ color: '#fff', fontSize: 16,textAlign:'center' }}>Update</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Biopage;
