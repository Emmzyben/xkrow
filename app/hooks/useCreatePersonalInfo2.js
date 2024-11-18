import { database, ID, Query } from '../backend/appwite';
import { DATABASE_ID, COLLECTION_ID_PERSONAL_INFO2 } from '@env';

const useCreateOrUpdatePersonalInfo = async (personalInfo) => {
  const {
    userId,
    businessName,
    businessType,
    businessCategory,
    businessDescription,
    address,
  } = personalInfo;

  try {
    const existingDocuments = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_PERSONAL_INFO2,
      [Query.equal('user_id', userId)]
    );

    if (existingDocuments.total > 0) {
      const documentId = existingDocuments.documents[0].$id;
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_PERSONAL_INFO2,
        documentId,
        {
          business_name: businessName,
          business_type: businessType,
          business_category: businessCategory,
          description: businessDescription,
          address: address,
          created_at: new Date().toISOString(), 
        }
      );
    } else {
      // Create a new document
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID_PERSONAL_INFO2,
        ID.unique(),
        {
          user_id: userId,
          business_name: businessName,
          business_type: businessType,
          business_category: businessCategory,
          description: businessDescription,
          address: address,
          created_at: new Date().toISOString(),
        }
      );
    }
  } catch (error) {
    console.error('Error creating or updating personal info:', error);
    throw error;
  }
};

export default useCreateOrUpdatePersonalInfo;
