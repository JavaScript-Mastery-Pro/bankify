"use server";

import { cookies } from "next/headers";
import { Client, Account, ID } from "node-appwrite";
import { CountryCode, Products } from "plaid";

import { plaidClient } from "@/lib/plaid/config";

import { account, appwriteConfig, databases } from "../appwrite/serverConfig";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.APPWRITE_SECRET!);

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

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
    const responseCookie = response.headers.get("set-cookie");
    console.log({ responseCookie });

    // set cookie
    cookies().set("appwrite-session", responseCookie!);

    const result = await response.json();
    console.log({ session: result });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error", error);
  }
}

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

// ### SIGN-UP FLOW
// 1.Create appwrite user
// 2.Create a plaid link token and pass to Link widget
// 3.Exchange plaid public token
export const signUp = async ({ name, email, password }: SignUpParams) => {
  // create appwrite user
  const { account } = await createAdminClient();
  await account.create(ID.unique(), email, password, name);

  // get userId from session
  const { userId } = await createEmailSession(email, password);

  // create Plaid token
  const { linkToken } = await createLinkToken(userId);

  const user = {
    userId,
    email,
    name,
    password,
  };

  console.log(linkToken);
  return JSON.parse(JSON.stringify({ linkToken, user }));
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    return await account.get();
  } catch (error) {
    return null;
  }
}

// CREATE PLAID LINK TOKEN
export const createLinkToken = async (userId: string) => {
  try {
    const tokeParams = {
      user: {
        client_user_id: userId,
      },
      client_name: "Bankify",
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
  user: NewUserParams;
}) => {
  console.log(publicToken);

  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // create add user to the user collection
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        name: user.name,
        email: user.email,
        password: user.password,
        userId: user.userId,
        accessToken,
        items: [itemId],
      }
    );

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

//= ================================
// LOGOUT USER
export async function logoutAccount() {
  try {
    await account.deleteSession("current");
    return { loggedOut: true };
  } catch (error) {
    console.log(error);
  }
}
