import { NextResponse } from "next/server";

import { plaidClient } from "@/lib/plaid/config";

export const GET = async (request: Request) => {
  const { accessToken } = await request.json();

  try {
    const response = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
