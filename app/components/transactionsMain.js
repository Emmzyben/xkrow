import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import styles from '../styles/style';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useFetchTransactions from '../hooks/useFetchTransactions';

const TransactionsMain = () => {
  const navigation = useNavigation();
  const { transactions, loading, error, refetch } = useFetchTransactions();
  const [intervalId, setIntervalId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      refetch(); // Initial fetch on focus
  
      const id = setInterval(refetch, 60000); // Refetch every 30 seconds
  
      return () => clearInterval(id); // Cleanup on unfocus
    }, [refetch])
  );
  
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);
    return `${formattedDate} at ${formattedTime}`;
  };

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity style={styles.transact}>
      <View>
        <Text style={styles.text5}>{item.transaction_type}</Text>
        <Text style={styles.text7}>{formatDateTime(item.date)}</Text>
      </View>
      <View>
        <Text style={styles.text25}>₦{item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  // Show loading or error if there is no transaction data
  if (loading && transactions.length === 0) {
    return (
      <View style={localStyles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={localStyles.center}>
        <Text style={styles.errorText}>{error.message || 'An error occurred while fetching transactions'}</Text>
      </View>
    );
  }

  return (
    <View style={localStyles.container}>
      <View style={localStyles.header}>
        <Text style={localStyles.headerText}>Transactions</Text>
      </View>

      {transactions.length === 0 ? (
        <View style={localStyles.noTransactions}>
          <View style={localStyles.noTransactionsContent}>
            <Image source={require('../../assets/Group.png')} style={localStyles.noTransactionsImage} />
            <Text style={styles.text7}>No transactions yet</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.$id || item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
        />
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  noTransactions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  noTransactionsContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTransactionsImage: {
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionsMain;
