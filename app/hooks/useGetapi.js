import { useState, useEffect, useCallback } from 'react';
import { database } from '../backend/appwite';
import { DATABASE_ID, IDD } from '@env';
import { useUser } from '../backend/user';

const useGetApi = () => {
  const { user } = useUser();
  const [ApiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchApikey();
    }
  }, [user]);

  const fetchApikey = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch the documents from the collection
      const apiQuery = await database.listDocuments(DATABASE_ID, IDD);

      if (apiQuery.total > 0) {
        // Assuming the API key is stored under the attribute 'api' in the document
        setApiKey(apiQuery.documents[0].api);
      } else {
        setApiKey(null); // No API key found
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching API key:', error);
      setError(error);
      setLoading(false);
    }
  }, []);

  return { ApiKey, loading, error, fetchApikey };
};

export default useGetApi;
