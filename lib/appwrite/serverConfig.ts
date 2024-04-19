import * as sdk from "node-appwrite";

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.APPWRITE_DATABASE_ID!,
  usersCollectionId: process.env.APPWRITE_USER_COLLECTION_ID!,
  secret: process.env.APPWRITE_SECRET!,
};

const client = new sdk.Client();
client
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectId)
  .setKey(appwriteConfig.secret);

export const databases = new sdk.Databases(client);
export const account = new sdk.Account(client);
export const avatars = new sdk.Avatars(client);
