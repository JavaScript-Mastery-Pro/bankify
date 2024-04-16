"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

import { Button } from "../ui/button";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const WithdrawButton = ({
  amountInDollar,
  bankId,
  account,
}: {
  amountInDollar: number;
  bankId: string;
  account: string;
}) => {
  const [withdrawPending, setWithdrawPending] = useState(false);
  const [payout, setPayout] = useState();

  console.log({ payout });

  const withdrawToBank = async () => {
    setWithdrawPending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/payout_create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amountInDollar,
        bankId,
        account,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setWithdrawPending(false);

        const { payout } = data;
        if (payout) {
          setPayout(payout);
        }
      });
  };

  return (
    <div className="flex flex-col space-y-5">
      <Button
        className="bg-bankGradient text-white"
        onClick={withdrawToBank}
        disabled={withdrawPending}
      >
        Withdraw
      </Button>

      {withdrawPending && <p>Transfering to your bank account...</p>}
    </div>
  );
};
