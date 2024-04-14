"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export const CreateBankButton = ({
  bankToken,
  account,
}: {
  bankToken: string;
  account: string;
}) => {
  const [createBankPending, setCreateBankPending] = useState(false);
  const [bank, setBank] = useState();

  const generateBankToken = async () => {
    setCreateBankPending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bank_create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bankToken,
        account,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCreateBankPending(false);

        const { token } = data;

        setBank(token);
      });
  };

  console.log("Bank Account", bank);

  return (
    <div className="flex flex-col space-y-5">
      {/* <p>
        Bank Account
        <span className="font-bold">{bankToken && bankToken?.id}</span>
      </p> */}

      <Button
        variant="default"
        onClick={generateBankToken}
        disabled={createBankPending}
      >
        Create Bank Account
      </Button>

      {createBankPending && <p>Creating bank account...</p>}
    </div>
  );
};
