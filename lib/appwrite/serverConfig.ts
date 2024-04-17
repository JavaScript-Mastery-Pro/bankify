import sdk from "node-appwrite";

import { appwriteConfig } from "./config";
export const client = new sdk.Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new sdk.Account(client);
export const databases = new sdk.Databases(client);
