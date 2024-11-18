import { useState, useEffect } from 'react';
import { database, Query } from '../backend/appwite';
import { DATABASE_ID, COLLECTION_ID_PROFILE } from '@env';
import { useUser } from '../backend/user'; 

const useGetInfo2 = () => {
  const [info, setInfo] = useState({ image_url: '', firstName: '', lastName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser(); 

  useEffect(() => {
    const fetchInfo = async () => {
      if (!user || !user.id) {
        setError('User not found.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Query to find the document by user_id
        const queryResult = await database.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_PROFILE,
          [Query.equal('user_id', user.id)]
        );

        if (queryResult.total === 0) {
        //   throw new Error('Profile not found.');
        }

        // Assuming there's only one document per user_id
        const document = queryResult.documents[0];
        setInfo({
          image_url: document.image_url || '',
          firstName: document.firstName || '',
          lastName: document.lastName || ''
        });
      } catch (err) {
        // console.error('Error fetching profile info:', err);
        // setError('Failed to fetch profile info. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [user]);

  return { info, loading, error };
};

export default useGetInfo2;
