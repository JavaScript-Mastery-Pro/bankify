"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export const TopUpBalanceButton = ({
  amountInDollar,
}: {
  amountInDollar: number;
}) => {
  const [topUpPending, setTopUpPending] = useState(false);
  const [topUpBalance, setTopUpBalance] = useState(0);

  // Delete a connected account
  const addTopUpToBalance = async () => {
    setTopUpPending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/balance_top_up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amountInDollar,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTopUpPending(false);

        const { amount } = data;
        console.log("Top-up Object", data);
        setTopUpBalance(amount);
      });
  };

  console.log("Top-up", topUpBalance);

  return (
    <div className="flex flex-col space-y-5">
      <p>
        Top-up Amount: <span className="font-bold">{amountInDollar}</span>
      </p>

      <Button
        variant="default"
        onClick={addTopUpToBalance}
        disabled={topUpPending}
      >
        Top-up Balance
      </Button>

      {topUpPending && <p>Adding top-up to your balance...</p>}
    </div>
  );
};
