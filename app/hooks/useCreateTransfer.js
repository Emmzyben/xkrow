import { useState, useCallback } from 'react';
import { useUser } from '../backend/user';
import { DATABASE_ID, COLLECTION_ID_PROFILE, TRANSACTIONZ } from '@env';
import { database, Query } from '../backend/appwite';
import { Alert } from 'react-native';

const useCreateTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const { user } = useUser();

  const createTransfer = useCallback(async (bankCode, accountNumber, accountName, amount) => {
    if (!user || !user.id) {
      setError('User not logged in');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Ensure amount is a valid number
      const transferAmount = parseInt(amount, 10);
      if (isNaN(transferAmount) || transferAmount <= 0) {
        throw new Error('Invalid transfer amount.');
      }

      // Fetch the user's profile from the database
      const userProfileQuery = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_PROFILE,
        [Query.equal('user_id', user.id)]
      );

      if (userProfileQuery.total === 0) {
        throw new Error('User profile not found');
      }

      const userProfileDoc = userProfileQuery.documents[0];
      const currentBalance = userProfileDoc.balance ? parseInt(userProfileDoc.balance, 10) : 0;

      if (currentBalance < transferAmount) {
        throw new Error('Insufficient balance for the transfer.');
      }

      // Call your PHP script to process the transfer
      const response = await fetch('https://xkrow.org/processTransfer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankCode,
          accountNumber,
          accountName,
          amount: transferAmount,
          currentBalance,
        }),
      });

      const data = await response.json();

      if (data.data.status === 'success') {
        setResult(data.data);
        console.log(data.data);

        // Update the user's profile with the new balance
        const newBalance = currentBalance - transferAmount;
        await database.updateDocument(
          DATABASE_ID,
          COLLECTION_ID_PROFILE,
          userProfileDoc.$id,
          { balance: newBalance }
        );

        // Store the transaction details in the TRANSACTIONZ collection
        const transaction = {
          userId: user.id,
          date: new Date().toISOString(),
          transaction_type: 'withdrawal', 
          amount: transferAmount,
          
        };

        // Create a new transaction document
        await database.createDocument(
          DATABASE_ID,
          TRANSACTIONZ,
          ID.unique(),
          transaction
        );

        // Notify the user
        Alert.alert('Success', 'Withdrawal Successful!');
      } else {
        setError(`Transfer failed with status: ${data.data.status || 'unknown'}`);
        console.error(`Transfer failed with status: ${data.data.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred during the transfer.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { createTransfer, loading, error, result };
};

export default useCreateTransfer;
