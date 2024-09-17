import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from '../../styles/style';

const Support = ({ navigation }) => {

  const openWhatsApp = () => {
    const url = 'whatsapp://send?phone=+2349160008660';
    Linking.openURL(url).catch(() => {
      alert('Make sure WhatsApp is installed on your device');
    }); 
  };

  const openEmail = () => {
    const email = 'support@xkrow.org';
    const subject = 'Support Request';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    Linking.openURL(url).catch(() => {
      alert('Make sure an email client is installed on your device');
    });
  };

  return (
    <ScrollView style={styles.kyc1}>
      <View style={localStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        </TouchableOpacity>
        <Text style={localStyles.headerTitle}>Help & Support</Text>
      </View>
      <View style={{ padding: 30 }}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '600' }}>Have a chat with Us</Text>
        <Text style={{ textAlign: 'center', fontSize: 14 }}>Kindly tell us how we may help you</Text>
      </View>

      <View style={localStyles.support}>
        <TouchableOpacity onPress={openWhatsApp}>
          <View>
            <View style={localStyles.inner}>
              <FontAwesomeIcon icon={faWhatsapp} size={35} color='green' />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 14, margin: 10 }}>Whatsapp</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openEmail}>
          <View>
            <View style={localStyles.inner}>
              <FontAwesomeIcon icon={faEnvelope} size={35} color='#C00000' />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 14, margin: 10 }}>Email</Text>
          </View>
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
  support: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
});

export default Support;
