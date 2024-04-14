"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CreateBankButton } from "./CreateBankButton";

export const GenerateBankTokenButton = ({
  accountName,
  routingNumber,
  accountNumber,
  account,
}: {
  accountName: string;
  routingNumber: string;
  accountNumber: string;
  account: string;
}) => {
  const [generateTokenPending, setGenerateTokenPending] = useState(false);
  const [bankToken, setBankToken] = useState<any>();

  const generateBankToken = async () => {
    setGenerateTokenPending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bank_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountName,
        routingNumber,
        accountNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGenerateTokenPending(false);

        const { token } = data;

        setBankToken(token);
      });
  };

  console.log("Bank Token", bankToken);

  return (
    <div className="flex flex-col space-y-5">
      <p>
        Bank Token:{" "}
        <span className="font-bold">{bankToken && bankToken?.id}</span>
      </p>

      <Button
        variant="default"
        onClick={generateBankToken}
        disabled={generateTokenPending}
      >
        Generate Bank Token
      </Button>

      {bankToken && bankToken?.id && (
        <CreateBankButton bankToken={bankToken?.id!} account={account} />
      )}

      {generateTokenPending && <p>Generating bank token...</p>}
    </div>
  );
};
