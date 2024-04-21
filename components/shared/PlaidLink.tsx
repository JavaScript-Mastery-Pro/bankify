/* eslint-disable camelcase */

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  usePlaidLink,
} from "react-plaid-link";

import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";

import { Button } from "../ui/button";

type PlaidLinkProps = {
  user: string;
};

export const PlaidLink = ({ user }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const { linkToken } = await createLinkToken(user);
      setToken(linkToken);
    };
    getLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },
    []
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button
      onClick={() => open()}
      disabled={!ready}
      className="text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form"
    >
      Add bank
    </Button>
  );
};
