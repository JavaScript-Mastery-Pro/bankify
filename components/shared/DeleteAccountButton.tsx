"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const DeleteAccountButton = ({ accountId }: { accountId: string }) => {
  const router = useRouter();
  const [accountDeletePending, setAccountDeletePending] = useState(false);
  const [deletedAccount, setDeletedAccount] = useState();

  // Delete a connected account
  const deleteAccount = async () => {
    setAccountDeletePending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/account_delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAccountDeletePending(false);

        console.log("Deleted Account", data);

        if (data) {
          setDeletedAccount(data);
        }

        router.push("/");
      });
  };

  return (
    <div className="flex flex-col space-y-5">
      <p>
        Account ID: <span className="font-bold">{accountId}</span>
      </p>

      {!deletedAccount && !accountDeletePending && (
        <Button
          variant="destructive"
          onClick={deleteAccount}
          disabled={accountDeletePending}
        >
          Delete Account:
        </Button>
      )}

      {accountDeletePending && <p>Deleting a connected account...</p>}
    </div>
  );
};
