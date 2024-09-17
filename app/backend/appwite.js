import { Account, Client, ID, Databases, Query, Storage, Functions } from 'appwrite';
import { API_URL, API_KEY } from '@env';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint(String(API_URL))
    .setProject(String(API_KEY));

// Initialize Appwrite services
const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
const functions = new Functions(client); // Add Functions initialization

export { client, account, database, storage, functions, Query, ID };
