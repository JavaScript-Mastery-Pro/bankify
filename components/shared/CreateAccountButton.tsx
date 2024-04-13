"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export const CreateAccountButton = () => {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState();
  const newUser = { email: "nikky@jsmastery.pro", country: "US" };

  // Create connected account
  const createAccount = async () => {
    setAccountCreatePending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/account_create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        user: newUser,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAccountCreatePending(false);

        const { account } = data;
        if (account) {
          setConnectedAccountId(account);
        }
        console.log("New Account", data);
      });
  };

  // Onboard connected account with account link
  const onboardAccount = async () => {
    setAccountLinkCreatePending(true);
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/account_link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: connectedAccountId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAccountLinkCreatePending(false);

        const { url } = data;
        if (url) {
          window.location.href = url;
        }

        console.log("Account Link", data);
      });
  };

  return (
    <div className="space-y-5">
      {!connectedAccountId && !accountCreatePending && (
        <Button
          variant="default"
          onClick={createAccount}
          disabled={accountCreatePending}
        >
          Create Account
        </Button>
      )}

      {accountCreatePending && <p>Creating a connected account...</p>}

      {connectedAccountId && !accountCreatePending && (
        <Button
          variant="default"
          onClick={onboardAccount}
          disabled={accountLinkCreatePending}
        >
          Start Onboarding
        </Button>
      )}
    </div>
  );
};
