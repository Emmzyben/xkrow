import { useState, useCallback } from 'react';
import { DATABASE_ID, COLLECTION_ID_CONTRACTOR, COLLECTION_ID_ESCROW } from '@env';
import { useUser } from '../backend/user';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { database, Query } from '../backend/appwite';

dayjs.extend(customParseFormat);

const useCheckInstallments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const { user } = useUser();

  const checkInstallments = useCallback(async () => {
    if (!user || !user.id) {
      setError('User not logged in');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Check the contractor collection for documents with matching user_id
      const contractorQuery = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_CONTRACTOR,
        [Query.equal('user_id', user.id)]
      );

      if (contractorQuery.total === 0) {
        // throw new Error('No contractor profile found for this user');
      }

      const dueInstallments = [];
      const errors = [];

      const today = dayjs().format('DD/MM/YYYY');
      console.log('Today\'s Date:', today);

      for (const contractorDoc of contractorQuery.documents) {
        try {
          const installmentsString = contractorDoc.installments || '';

          console.log('Raw installments string:', installmentsString);

          const installmentMatches = installmentsString.match(/"amount":"(\d+\.?\d*)","date":"([^"]+)"/g) || [];

          for (const match of installmentMatches) {
            const [, amount, date] = match.match(/"amount":"(\d+\.?\d*)","date":"([^"]+)"/) || [];
            
            console.log('Raw Installment:', { amount, date });

            let formattedDate = dayjs(date, 'D/M/YYYY', true).format('DD/MM/YYYY');
            if (formattedDate === 'Invalid Date') {
              formattedDate = dayjs(date, 'DD/MM/YYYY', true).format('DD/MM/YYYY');
            }

            console.log('Formatted Installment Date:', formattedDate);

            // Compare the formatted date with today's date
            if (formattedDate === today) {
              console.log(`Installment due today! Date: ${formattedDate}, Amount: ${amount}`);

              const escrowUrls = Array.isArray(contractorDoc.escrow_url) ? contractorDoc.escrow_url : [contractorDoc.escrow_url];
              console.log('Escrow URLs:', escrowUrls);

              for (const escrowUrl of escrowUrls) {
                if (!escrowUrl) {
                  console.log('Skipping empty escrow URL.');
                  continue;
                }

                console.log('Searching for escrow URL:', escrowUrl);

                const escrowQuery = await database.listDocuments(
                  DATABASE_ID,
                  COLLECTION_ID_ESCROW,
                  [Query.equal('escrow_link', escrowUrl)]
                );

                console.log('Escrow Query Result:', escrowQuery);

                if (escrowQuery.total === 0) {
                  // errors.push(`No escrow document found for escrow URL: ${escrowUrl}`);
                  continue;
                }

                const escrowDoc = escrowQuery.documents[0];
                const installmentDate = escrowDoc.installment_date ? dayjs(escrowDoc.installment_date, 'DD/MM/YYYY', true).format('DD/MM/YYYY') : null;

                if (installmentDate === today) {
                  console.log(`Installment already paid today for escrow URL: ${escrowUrl}. Skipping update.`);
                  continue;
                }

                // Proceed to update the escrow document if installment_date is not today
                await database.updateDocument(
                  DATABASE_ID,
                  COLLECTION_ID_ESCROW,
                  escrowDoc.$id,
                  {
                    status: 'installment payment due',
                    installment_amount: amount,
                    installment_date: today, // Set today's date as the installment date
                  }
                );

                // Log success
                console.log(`Escrow document ${escrowDoc.$id} updated successfully.`);
              }

              dueInstallments.push({ contractorId: contractorDoc.$id, amount, date: formattedDate });
            }
          }
        } catch (docError) {
          errors.push(`Error processing contractor document ${contractorDoc.$id}: ${docError.message}`);
        }
      }

      if (errors.length > 0) {
        throw new Error(errors.join(' | '));
      }

      setResult({
        message: `${dueInstallments.length} contractor document(s) with due installments processed.`,
        details: dueInstallments
      });

    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred while processing installment payments.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { checkInstallments, loading, error, result };
};

export default useCheckInstallments;
