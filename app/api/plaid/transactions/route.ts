import { NextResponse } from "next/server";
import {
  RemovedTransaction,
  Transaction,
  TransactionsSyncRequest,
} from "plaid";

import { plaidClient } from "@/lib/configs/plaid.config";

export const POST = async (request: Request) => {
  const { accessToken } = await request.json();

  let cursor = "";
  let added: Array<Transaction> = [];
  let modified: Array<Transaction> = [];
  // Removed transaction ids
  let removed: Array<RemovedTransaction> = [];
  let hasMore = true;

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const request: TransactionsSyncRequest = {
        access_token: accessToken,
        cursor,
      };

      const response = await plaidClient.transactionsSync(request);
      const data = response.data;
      // Add this page of results
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;
      // Update cursor to the next cursor
      cursor = data.next_cursor;
    }
    return NextResponse.json({ added, modified, removed });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to get transactions:",
      error
    );
  }
};
