import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Corrected array of bank objects
const banks = [
  { code: '000001', name: 'Sterling Bank' },
  { code: '000002', name: 'Keystone Bank' },
  { code: '000003', name: 'FCMB' },
  { code: '000004', name: 'United Bank for Africa' },
  { code: '000005', name: 'Diamond Bank' },
  { code: '000006', name: 'JAIZ Bank' },
  { code: '000007', name: 'Fidelity Bank' },
  { code: '000008', name: 'Polaris Bank' },
  { code: '000009', name: 'Citi Bank' },
  { code: '000010', name: 'Ecobank Bank' },
  { code: '000011', name: 'Unity Bank' },
  { code: '000012', name: 'StanbicIBTC Bank' },
  { code: '000013', name: 'GTBank Plc' },
  { code: '000014', name: 'Access Bank' },
  { code: '000015', name: 'Zenith Bank Plc' },
  { code: '000016', name: 'First Bank of Nigeria' },
  { code: '000017', name: 'Wema Bank' },
  { code: '000018', name: 'Union Bank' },
  { code: '000019', name: 'Enterprise Bank' },
  { code: '000020', name: 'Heritage' },
  { code: '000021', name: 'Standard Chartered' },
  { code: '000022', name: 'Suntrust Bank' },
  { code: '000023', name: 'Providus Bank' },
  { code: '000025', name: 'Titan Trust Bank' },
  { code: '000026', name: 'Taj Bank' },
  { code: '000027', name: 'Globus Bank' },
  { code: '000031', name: 'Premium Trust Bank' },
  { code: '050006', name: 'Branch International Financial Services' },
  { code: '090198', name: 'RenMoney Microfinance Bank' },
  { code: '090267', name: 'Kuda Microfinance Bank' },
  { code: '090285', name: 'First Option Microfinance Bank' },
  { code: '100004', name: 'Opay Digital Services LTD' },
  { code: '100018', name: 'ZenithMobile' },
  { code: '100019', name: 'Fidelity Mobile' },
  { code: '100026', name: 'One Finance' },
  { code: '100030', name: 'EcoMobile' },
  { code: '100031', name: 'FCMB Easy Account' },
  { code: '100033', name: 'PalmPay Limited' },
  { code: '100034', name: 'Zenith Eazy Wallet' },
  { code: '100039', name: 'TitanPaystack' },
  { code: '080002', name: 'Taj_Pinspay' },
  { code: '110002', name: 'Flutterwave Technology Solutions Limited' },
  { code: '110003', name: 'Interswitch Limited' },
  { code: '110004', name: 'First Apple Limited' },
  { code: '110006', name: 'Paystack Payment Limited' },
];

const BankSelect = ({ selectedBank, onBankChange }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedBank}
        onValueChange={(itemValue) => onBankChange(itemValue)}
        style={styles.picker}
      >
        {banks.map((bank) => (
          <Picker.Item key={bank.code} label={bank.name} value={bank.code} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default BankSelect;
