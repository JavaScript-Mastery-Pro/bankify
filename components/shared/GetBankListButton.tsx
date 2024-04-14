"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export const GetBankListButton = ({ account }: { account: string }) => {
  const [getBankListPending, setBankListPending] = useState(false);
  const [bankList, setBankList] = useState();

  const getBankList = async () => {
    setBankListPending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bank_list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBankListPending(false);

        const { externalAccounts } = data;
        if (externalAccounts) {
          setBankList(externalAccounts);
        }
      });
  };
  console.log({ bankList });

  return (
    <div className="space-y-5">
      <Button
        variant="default"
        onClick={getBankList}
        disabled={getBankListPending}
      >
        Get Bank List
      </Button>

      {getBankListPending && <p>Retrieving bank list...</p>}
    </div>
  );
};
