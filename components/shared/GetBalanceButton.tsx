"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export const GetBalanceButton = ({ account }: { account: string }) => {
  const [getBalancePending, setBalancePending] = useState(false);
  const [balance, setBalance] = useState();

  // Create connected account
  const getBalance = async () => {
    setBalancePending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/balance_get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBalancePending(false);

        const { balance } = data;
        if (balance) {
          setBalance(balance);
        }
      });
  };
  console.log({ balance });

  return (
    <div className="space-y-5">
      <Button
        variant="default"
        onClick={getBalance}
        disabled={getBalancePending}
      >
        Get Balance
      </Button>

      {getBalancePending && <p>Creating a connected account...</p>}
    </div>
  );
};
