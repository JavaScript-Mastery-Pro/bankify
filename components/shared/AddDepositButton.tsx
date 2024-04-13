"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

import { Button } from "../ui/button";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const AddDepositButton = ({
  amountInDollar,
  account,
}: {
  amountInDollar: number;
  account: string;
}) => {
  const [depositPending, setDepositPending] = useState(false);
  const applicationFee = 1; // .45 (stripe fee) + .65 (application fee)

  const depositToBalance = async () => {
    setDepositPending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/charge_destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amountInDollar,
        account,
        applicationFee,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDepositPending(false);

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
        onClick={depositToBalance}
        disabled={depositPending}
      >
        Add Deposit
      </Button>

      {depositPending && <p>Depositing to your balance...</p>}
    </div>
  );
};
