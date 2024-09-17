import { useState } from 'react';
import { Account, Client, Databases, Query, Storage } from 'appwrite';
import { DATABASE_ID, COLLECTION_ID_PROFILE, COLLECTION_ID_BVN, COLLECTION_ID_IDENTITY, COLLECTION_ID_VENDOR, COLLECTION_ID_CONTRACTOR, COLLECTION_ID_ESCROW, COLLECTION_ID_PERSONAL_INFO, COLLECTION_ID_PRODUCTS, COLLECTION_ID_CONVERSATIONS, COLLECTION_ID_MESSAGES, COLLECTION_ID_NOTIFICATION, API_URL, BUCKET_ID, API_KEY } from '@env';
import { useUser } from '../backend/user';

// Initialize Appwrite client
const client = new Client();
client.setEndpoint(String(API_URL)).setProject(String(API_KEY));

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

const useDeleteAccount = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const contextUser = useUser();

    const deleteAccount = async () => {
        setLoading(true);
        setError(null);

        try {
            const user = await account.get(); // Get the current logged-in user
            const userID = user.$id; // Retrieve the current user's ID

            const collections = [
                COLLECTION_ID_PROFILE,
                COLLECTION_ID_BVN,
                COLLECTION_ID_IDENTITY,
                COLLECTION_ID_VENDOR,
                COLLECTION_ID_CONTRACTOR,
                COLLECTION_ID_ESCROW,
                COLLECTION_ID_PERSONAL_INFO,
                COLLECTION_ID_PRODUCTS,
                COLLECTION_ID_CONVERSATIONS,
                COLLECTION_ID_MESSAGES,
                COLLECTION_ID_NOTIFICATION
            ];

            // Function to delete documents based on user ID
            const deleteDocuments = async (collectionId) => {
                try {
                    let offset = 0;
                    const limit = 100;

                    while (true) {
                        const documents = await database.listDocuments(DATABASE_ID, collectionId, [Query.equal('user_id', userID)], limit, offset);
                        if (documents.documents.length === 0) break;

                        await Promise.all(
                            documents.documents.map(async (doc) => {
                                try {
                                    await database.deleteDocument(DATABASE_ID, collectionId, doc.$id);
                                } catch (err) {
                                    console.error(`Failed to delete document ${doc.$id} from collection ${collectionId}:`, err);
                                }
                            })
                        );

                        offset += limit;
                    }
                } catch (err) {
                    console.error(`Failed to delete documents from collection ${collectionId}:`, err);
                    throw err;
                }
            };

            // Function to delete files owned by the user
            const deleteFiles = async () => {
                try {
                    let files = await storage.listFiles(BUCKET_ID);
                    while (files.files.length > 0) {
                        await Promise.all(
                            files.files.map(async (file) => {
                                if (file.owner === userID) {
                                    try {
                                        await storage.deleteFile(BUCKET_ID, file.$id);
                                    } catch (err) {
                                        console.error(`Failed to delete file ${file.$id}:`, err);
                                    }
                                }
                            })
                        );

                        if (files.next) {
                            files = await storage.listFiles(BUCKET_ID, [], files.next);
                        } else {
                            break;
                        }
                    }
                } catch (err) {
                    console.error('Failed to list or delete files:', err);
                    throw err;
                }
            };

            // Delete documents from all specified collections
            await Promise.all(collections.map(deleteDocuments));

            // Delete files owned by the user
            await deleteFiles();

            // Delete the user account first
            await account.delete(userID).catch(err => {
                console.error('Failed to delete user account:', err);
                throw err; // Ensure account deletion is handled
            });

            // Clear the current session
            await account.deleteSession('current').catch(err => {
                console.error('Failed to delete session:', err);
                throw err; // Ensure session deletion is handled
            });

            setLoading(false);
            return true; // Account deletion was successful
        } catch (err) {
            console.error('Account deletion failed:', err);
            setError(err);
            setLoading(false);
            return false; // Account deletion failed
        }
    };

    return { deleteAccount, loading, error };
};

export default useDeleteAccount;
