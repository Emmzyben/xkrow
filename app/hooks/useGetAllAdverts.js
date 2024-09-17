import { useState, useEffect } from 'react';
import { database } from '../backend/appwite';
import { DATABASE_ID, COLLECTION_ID_ADVERTS } from '@env';
import { Query } from '../backend/appwite';

const useGetAllAdverts = (searchTerm = '') => {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const queries = searchTerm
          ? [Query.search('business_name', searchTerm)]
          : [];

        const response = await database.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_ADVERTS,
          queries
        );

        setAdverts(response.documents);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdverts();
  }, [searchTerm]);

  return { adverts, loading, error };
};

export default useGetAllAdverts;
