import { useState } from 'react';
import { database, Query } from '../backend/appwite';
import { DATABASE_ID, COLLECTION_ID_PROFILE } from '@env';
import { useUser } from '../backend/user'; // Adjust the import path as needed

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser(); // Assuming user context provides user information

  const updateProfile = async (profileData) => {
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
        throw new Error('Profile not found.');
      }

      // Assuming there's only one document per user_id
      const documentId = queryResult.documents[0].$id;

      // Update the document
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_PROFILE,
        documentId,
        profileData
      );
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};

export default useUpdateProfile;
