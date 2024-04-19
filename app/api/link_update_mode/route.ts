import { NextResponse } from "next/server";

import { plaidClient } from "@/lib/plaid/config";

export const POST = async (request: Request) => {
  const { publicToken } = await request.json();

  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
