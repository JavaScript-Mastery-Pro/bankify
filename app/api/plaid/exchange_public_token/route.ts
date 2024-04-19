import { NextResponse } from "next/server";

import { plaidClient } from "@/lib/configs/plaid.config";

export const POST = async (request: Request) => {
  const { publicToken } = await request.json();

  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;

    return NextResponse.json({
      publicTokenExchange: "complete",
      itemID,
      accessToken,
    });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
