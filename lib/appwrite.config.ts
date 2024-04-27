"use server";

import { cookies } from "next/headers";
import { Client, Account, Databases, Users } from "node-appwrite";

// get account(), get database(), and get user() are getter methods. When you try to access the account, database, or user property on the returned object, the corresponding getter method is called, and a new instance of Account, Databases, or Users is created and returned.

// For example, if obj is the object returned by this code, and you do obj.account, it will call the get account() method and return a new Account instance. The client passed to each class is likely a configured instance of a client to interact with a backend service.

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_SECRET!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
};

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
};
