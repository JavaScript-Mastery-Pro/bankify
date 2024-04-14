"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

import { Button } from "../ui/button";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const TransferToPlatformButton = ({
  amountInDollar,
  account,
}: {
  amountInDollar: number;
  account: string;
}) => {
  const [transferPending, setTransferPending] = useState(false);

  const transferToPlatformBalance = async () => {
    setTransferPending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/balance_transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amountInDollar,
        destination: process.env.NEXT_PUBLIC_STRIPE_PLATFORM_ID!,
        origin: account,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransferPending(false);

        const { url } = data;
        if (url) {
          window.location.href = url;
        }
      });
  };

  return (
    <div className="flex flex-col space-y-5">
      <Button
        className="bg-bankGradient text-white"
        onClick={transferToPlatformBalance}
        disabled={transferPending}
      >
        Tranfer to Platform
      </Button>

      {transferPending && <p>Transfering to your balance...</p>}
    </div>
  );
};
