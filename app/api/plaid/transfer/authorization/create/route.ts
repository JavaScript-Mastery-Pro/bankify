import { NextResponse } from "next/server";
import {
  ACHClass,
  TransferAuthorizationCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "@/lib/configs/plaid.config";

export const POST = async (request: Request) => {
  const { accessToken, accountId } = await request.json();

  try {
    const request: TransferAuthorizationCreateRequest = {
      access_token: accessToken,
      account_id: accountId,
      type: "debit" as TransferType,
      network: "ach" as TransferNetwork,
      amount: "12.34",
      ach_class: "ppd" as ACHClass,
      user: {
        legal_name: "Anne Charleston",
      },
    };

    const response = await plaidClient.transferAuthorizationCreate(request);
    const authorizationId = response.data.authorization.id;

    return NextResponse.json({ authorizationId, accessToken });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
