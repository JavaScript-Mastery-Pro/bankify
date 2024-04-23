import { NextResponse } from "next/server";
import {
  ACHClass,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "@/lib/plaid/config";

export const POST = async (request: Request) => {
  const { accountId, accessToken, senderAccountId, receiverAccountId } =
    await request.json();
  try {
    const transferAuthorizatioRequest: TransferAuthorizationCreateRequest = {
      access_token: accessToken,
      account_id: receiverAccountId,
      type: "debit" as TransferType,
      network: "ach" as TransferNetwork,
      amount: "12.34",
      ach_class: "ppd" as ACHClass,
      funding_account_id: senderAccountId,
      user: {
        legal_name: "Anne Charleston",
      },
    };

    const transferAuthorizatioResponse =
      await plaidClient.transferAuthorizationCreate(
        transferAuthorizatioRequest
      );
    const authorizationId = transferAuthorizatioResponse.data.authorization.id;

    const transferRequest: TransferCreateRequest = {
      access_token: accessToken,
      account_id: accountId,
      description: "transfer",
      authorization_id: authorizationId,
      amount: "5.00",
    };

    const transferResponse = await plaidClient.transferCreate(transferRequest);
    const transfer = transferResponse.data.transfer;

    return NextResponse.json({ transfer });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
