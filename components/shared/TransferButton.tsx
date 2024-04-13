"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

import { Button } from "../ui/button";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const TransferButton = ({
  amountInDollar,
  account,
}: {
  amountInDollar: number;
  account: string;
}) => {
  const [depositPending, setDepositPending] = useState(false);
  const [transfer, setTransfer] = useState();

  const depositToBalance = async () => {
    setDepositPending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/balance_transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amountInDollar,
        account,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDepositPending(false);

        const { transfer } = data;
        if (transfer) {
          setTransfer(transfer);
        }
      });
  };

  console.log({ transfer });

  return (
    <div className="flex flex-col space-y-5">
      <Button
        className="bg-bankGradient text-white"
        onClick={depositToBalance}
        disabled={depositPending}
      >
        Transfer
      </Button>

      {depositPending && <p>Transfering to your users balance...</p>}
    </div>
  );
};
