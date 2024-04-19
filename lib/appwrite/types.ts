import * as sdk from "node-appwrite";

export type User = sdk.Models.Document & {
  accountId: string;
  email: string;
  name: string;
  items: string[];
  accessToken: string;
  image: string;
};
