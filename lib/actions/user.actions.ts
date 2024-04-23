"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Client, Account, ID, Databases, Query } from "node-appwrite";
import { CountryCode, Products } from "plaid";

import { plaidClient } from "@/lib/plaid/config";

export async function createAdminClient() {
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
  };
}

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  // // get cookie from request 'appwrite-cookie'
  // const appWriteCookie = cookies().get("appwrite-cookie");

  // if (appWriteCookie) {
  //   client.setKey(appWriteCookie.value);
  // }

  return {
    get account() {
      return new Account(client);
    },
  };
}

// CREATE EMAIL SESSION
export async function createEmailSession(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account/sessions/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Response-Format": "1.4.0",
          "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
        },
        body: JSON.stringify({ email, password }),
      }
    );

    // get cookies
    const responseCookie = response.headers.get("Set-Cookie");
    console.log({ responseCookie });

    // set cookie
    cookies().set("appwrite-cookie", responseCookie!);

    const result = await response.json();
    console.log({ session: result });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error", error);
  }
}

// SIGN UP
export const signUp = async ({ name, email, password }: SignUpParams) => {
  // create appwrite user
  const { account } = await createSessionClient();
  const newAccount = await account.create(ID.unique(), email, password, name);

  // create new user document
  const { database } = await createAdminClient();
  const newUser = await database.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    ID.unique(),
    {
      name,
      email,
      password,
      userId: newAccount.$id,
    }
  );

  // create email session
  await createEmailSession(email, password);

  return JSON.parse(JSON.stringify({ id: newUser.$id, name }));
};

// GET LOGGEDIN USER
export async function getLoggedInUser() {
  try {
    const appWriteCookie = cookies().get("appwrite-cookie");

    console.log({ appWriteCookie });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Response-Format": "1.4.0",
          "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
          "X-Appwrite-Key": process.env.APPWRITE_SECRET!,
          Cookie: appWriteCookie?.value!,
        },
      }
    );

    const result = await response.json();

    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("userId", [result.$id])]
    );

    console.log({ documents: user.documents, total: user.total });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

// CREATE PLAID LINK TOKEN
export const createLinkToken = async (user: User) => {
  try {
    const tokeParams = {
      user: {
        client_user_id: user.id,
      },
      client_name: user.name,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokeParams);

    return JSON.parse(JSON.stringify({ linkToken: response.data.link_token }));
  } catch (error) {
    console.error(
      "An error occurred while creating a new bankify user:",
      error
    );
  }
};

// EXCHANGE PLAID PUBLIC TOKEN
export const exchangePublicToken = async ({
  publicToken,
  user,
}: {
  publicToken: string;
  user: User;
}) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const { database } = await createAdminClient();

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // create new user to the user collection
    await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ITEM_COLLECTION_ID!,
      ID.unique(),
      {
        itemId,
        accessToken,
        user: user.id,
        accountId: accountData.account_id,
      }
    );

    revalidatePath("/");

    return JSON.parse(
      JSON.stringify({
        publicTokenExchange: "complete",
      })
    );
  } catch (error) {
    console.error(
      "An error occurred while creating a new bankify user:",
      error
    );
  }
};

// LOGOUT USER
export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-cookie");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}
