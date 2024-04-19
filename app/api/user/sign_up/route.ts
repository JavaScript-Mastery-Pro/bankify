import { NextResponse } from "next/server";
import { ID } from "node-appwrite";

import {
  databases,
  appwriteConfig,
  avatars,
} from "@/lib/appwrite/serverConfig";

export const POST = async (request: Request) => {
  const { accountId, email, name, password } = await request.json();

  console.log("avatar", avatars.getInitials());

  try {
    const user = {
      accountId,
      email,
      name,
      password,
      image: avatars.getInitials(name),
    };

    // Create appwrite user
    const newAppwriteUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );
    if (!newAppwriteUser) throw Error;

    //

    return NextResponse.json({ newAppwriteUser });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to top-up balance:",
      error
    );
  }
};
