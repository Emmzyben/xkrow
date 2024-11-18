import { useState } from 'react';
import { database, Query } from '../backend/appwite';
import { DATABASE_ID, COLLECTION_ID_ESCROW, COLLECTION_ID_PROFILE } from '@env';
import useCreateNotification from './useCreateNotification';

const useHandleConfirmInstallment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const createNotification = useCreateNotification(); // Use the notification hook

  const HandleConfirmInstallment = async ({ vendorId, escrowUrl, buyerId }) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch the escrow document
      const escrowQuery = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_ESCROW,
        [Query.equal('escrow_link', escrowUrl)]
      );

      if (escrowQuery.total === 0) {
        throw new Error('Escrow document not found');
      }

      const escrowDoc = escrowQuery.documents[0];

      // Convert amounts from string to integers
      const escrowAmount = parseInt(escrowDoc.amount, 10);
      const installmentAmount = parseInt(escrowDoc.installment_amount, 10);

      console.log(`Escrow Amount: ${escrowAmount}, Installment Amount: ${installmentAmount}`);

      // Validate escrow document attributes
      if (
        escrowDoc.vendor_id !== vendorId ||
        escrowDoc.buyer_id !== buyerId 
      ) {
        throw new Error('Escrow document validation failed');
      }

      // Fetch the buyer's profile document
      const buyerProfileQuery = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_PROFILE,
        [Query.equal('user_id', buyerId)]
      );

      if (buyerProfileQuery.total === 0) {
        throw new Error('Buyer profile not found');
      }

      const buyerProfileDoc = buyerProfileQuery.documents[0];
      const currentBalance = buyerProfileDoc.balance ? parseInt(buyerProfileDoc.balance, 10) : 0;

      console.log(`Current Balance: ${currentBalance}`);

      const newBalance = currentBalance + installmentAmount;

      // Update buyer's profile balance
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_PROFILE,
        buyerProfileDoc.$id,
        { balance: newBalance }
      );

      console.log(`New Balance: ${newBalance}`);

      // Update escrow document amount and status
      const remainingAmount = escrowAmount - installmentAmount;

      console.log(`Remaining Amount: ${remainingAmount}`);

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_ESCROW,
        escrowDoc.$id,
        remainingAmount <= 0
          ? { amount: '0', status: 'completed' }
          : { amount: remainingAmount.toString(), status: 'Installment paid' }
      );

      // Fetch the vendor's profile document
      const vendorProfileQuery = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_PROFILE,
        [Query.equal('user_id', vendorId)]
      );

      if (vendorProfileQuery.total === 0) {
        throw new Error('Vendor profile not found');
      }

      const vendorProfileDoc = vendorProfileQuery.documents[0];
      const vendorName = `${vendorProfileDoc.firstName} ${vendorProfileDoc.lastName}`;

      // Send a notification to the vendor
      const message = `You have received an installment payment of ${installmentAmount} from ${vendorName}.`;
      await createNotification(vendorId, buyerId, message);

      setLoading(false);
    } catch (error) {
      console.error('Error confirming installment:', error);
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { HandleConfirmInstallment, loading, error };
};

export default useHandleConfirmInstallment;
