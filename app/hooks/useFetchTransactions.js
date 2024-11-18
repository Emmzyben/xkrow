import { useState, useEffect } from 'react';
import { database, Query } from '../backend/appwite';
import { useUser } from '../backend/user';
import { DATABASE_ID, TRANSACTIONZ } from '@env';

const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const fetchTransactions = async () => {
    if (!user || !user.id) {
      setError('User not logged in');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        TRANSACTIONZ,
        [Query.equal('userId', user.id)]
      );

      if (response.total > 0) {
        setTransactions(response.documents);
      } else {
        setTransactions([]);
        setError('No transactions found.');
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message || 'Failed to fetch transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTransactions();
    }
  }, [user]);

  return { transactions, loading, error, refetch: fetchTransactions };
};

export default useFetchTransactions;
