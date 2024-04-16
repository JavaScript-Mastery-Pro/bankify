//

import { ID, Query } from "appwrite";

import {
  account,
  appwriteConfig,
  avatars,
  databases,
} from "../appwrite/config";
import {
  createStripeAccount,
  createOnboardingLink,
} from "../stripe/user.stripe";

// SIGN-UP
export const signUpUser = async (user: CreateNewUser) => {
  try {
    // Create stripe account
    const newStripeAccount = await createStripeAccount({
      email: user.email,
      ssn: user.ssn,
    });
    if (!newStripeAccount) throw Error;

    // Create appwrite account
    const newAppwriteAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAppwriteAccount) throw Error;

    // Create appwrite user
    const newAppwriteUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAppwriteAccount.$id,
        stripeId: newStripeAccount.id,
        email: user.email,
        name: user.name,
        password: user.password,
        image: avatars.getInitials(user.name),
      }
    );
    if (!newAppwriteUser) throw Error;

    // Get user's onboarding link
    const onboardingLink = await createOnboardingLink(newStripeAccount.id);
    if (!onboardingLink) throw Error;

    // Return the onboarding link
    return JSON.parse(JSON.stringify(onboardingLink));
  } catch (error) {
    console.error(
      "An error occurred while creating a new bankify user:",
      error
    );
  }
};

// LOGIN
export const loginUser = async (user: LoginUser) => {
  try {
    // Create appwrite email & pass session
    const session = await account.createEmailSession(user.email, user.password);

    if (!session) throw Error;
    return session;
  } catch (error) {
    console.error("An error occurred while logging in:", error);
  }
};

//
// LOGOUT USER
export async function logoutAccount() {
  try {
    await account.deleteSession("current");
    return { loggedOut: true };
  } catch (error) {
    console.log(error);
  }
}

// GET CURRENT USER
export async function getCurrentUserServer() {
  try {
    const currentAccount = await account.get();

    console.log({ currentAccount });

    // Get current user's details
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    const currentUser = result.documents[0];
    return currentUser;
  } catch (error) {
    console.log(error);
  }
}
