import { Client, Account, Databases, Avatars } from "appwrite";

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  usersCollectionId: process.env
    .NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID as string,
  transactionsCollectionId: process.env
    .NEXT_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID as string,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
