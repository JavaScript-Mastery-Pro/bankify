import { NextResponse } from "next/server";

import { plaidClient } from "@/lib/configs/plaid.config";

export const POST = async (request: Request) => {
  const { accessToken } = await request.json();

  try {
    const response = await plaidClient.authGet({
      access_token: accessToken,
    });
    const accountData = response.data.accounts;
    const numbers = response.data.numbers;

    return NextResponse.json({ accountData, numbers });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
