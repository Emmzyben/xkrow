import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import styles from '../styles/style';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useGetTransaction from '../hooks/useGetTransaction';
import useCheckInstallments from '../hooks/useCheckInstallments'; // Import the new hook

const TransactionsMain = () => {
  const navigation = useNavigation();
  const { transactions, loading, error, fetchTransactions } = useGetTransaction();
  const { checkInstallments } = useCheckInstallments(); // Get the function from the hook
  const [intervalId, setIntervalId] = useState(null);

  const fetchAndCheck = useCallback(async () => {
    await fetchTransactions();
    await checkInstallments();
  }, [fetchTransactions, checkInstallments]);

  useFocusEffect(
    useCallback(() => {
      fetchAndCheck(); // Initial call when component is focused

      const id = setInterval(fetchAndCheck, 30000); // Interval to run fetchAndCheck every 10 seconds
      setIntervalId(id);

      return () => {
        clearInterval(id); // Clear the interval on cleanup
        setIntervalId(null);
      };
    }, [])
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'green' };
      case 'pending':
        return { color: 'orange' };
        case 'Installment paid':
        return { color: 'green' };
      default:
        return { color: 'red' };
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);
    return `${formattedDate} at ${formattedTime}`;
  };

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TransactionDetailsPage', { escrowLink: item.escrow_link })}
      style={styles.transact}
    >
      <View>
        <Text style={styles.text5}>{item.productName}</Text>
        <Text style={styles.text7}>{formatDateTime(item.created_at)}</Text>
      </View>
      <View>
        <Text style={styles.text25}>₦{item.amount}</Text>
        <Text style={[styles.statusText, getStatusStyle(item.status)]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && transactions.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error.message}</Text>;
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
            <Text style={styles.text7}>No transaction yet. Click New Xcrow to start transactions</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.$id}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchTransactions}
            />
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
  viewAllText: {
    color: '#62248F',
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
  statusText: {
    // Default style if needed
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default TransactionsMain;
