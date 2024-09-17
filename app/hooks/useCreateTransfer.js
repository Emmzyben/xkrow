import { useState, useCallback } from 'react';
import { database, Query, client } from '../backend/appwite';
import { DATABASE_ID, COLLECTION_ID_PROFILE, PAYSTACK_SECRET_KEY } from '@env';
import { useUser } from '../backend/user';



const useCreateTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const { user } = useUser();

  const createTransfer = useCallback(async (bankName, accountNumber, accountName, amount) => {
    if (!user || !user.id) {
      setError('User not logged in');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Fetch the user's profile
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
      const transferAmount = parseInt(amount, 10);

      if (currentBalance < transferAmount) {
        throw new Error('Insufficient balance for the withdrawal.');
      }

      // Create recipient on Paystack
      const recipientData = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.paystack.co/transferrecipient', true);
        xhr.setRequestHeader('Authorization', `Bearer ${PAYSTACK_SECRET_KEY}`);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error(`Error creating recipient: ${xhr.responseText}`));
            }
          }
        };

        xhr.send(JSON.stringify({
          type: 'nuban',
          name: accountName,
          account_number: accountNumber,
          bank_code: bankName,
          currency: 'NGN'
        }));
      });

      const recipientId = recipientData.data.id;

      // Initiate transfer on Paystack
      const transferData = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.paystack.co/transfer', true);
        xhr.setRequestHeader('Authorization', `Bearer ${PAYSTACK_SECRET_KEY}`);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error(`Error initiating transfer: ${xhr.responseText}`));
            }
          }
        };

        xhr.send(JSON.stringify({
          source: 'balance',
          amount: transferAmount, // Convert to kobo
          recipient: recipientId,
          reason: 'Withdrawal',
        }));
      });

      if (transferData.status === 'success') {
        setResult(transferData.data);

        const newBalance = currentBalance - transferAmount;

        // Update user's balance in Appwrite
        await database.updateDocument(
          DATABASE_ID,
          COLLECTION_ID_PROFILE,
          userProfileDoc.$id,
          { balance: newBalance }
        );
      } else {
        setError(transferData.message || 'Unknown error occurred during the transfer.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred during the withdrawal.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { createTransfer, loading, error, result };
};

export default useCreateTransfer;
