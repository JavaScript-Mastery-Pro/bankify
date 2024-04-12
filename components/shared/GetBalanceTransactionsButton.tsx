"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export const GetBalanceTransactionsButton = ({
  account,
}: {
  account: string;
}) => {
  const [getBalanceTransactionsPending, setBalanceTransactionsPending] =
    useState(false);
  const [balanceTransactions, setBalanceTransactions] = useState();

  // Create connected account
  const getBalance = async () => {
    setBalanceTransactionsPending(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/balance_transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setBalanceTransactionsPending(false);

        const { balance } = data;
        if (balance) {
          setBalanceTransactions(balance);
        }
      });
  };
  console.log({ balanceTransactions });

  return (
    <div className="space-y-5">
      <Button
        variant="default"
        onClick={getBalance}
        disabled={getBalanceTransactionsPending}
      >
        Get Balance Transactions
      </Button>

      {getBalanceTransactionsPending && <p>Creating a connected account...</p>}
    </div>
  );
};