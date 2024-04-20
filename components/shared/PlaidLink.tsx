/* eslint-disable camelcase */

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  usePlaidLink,
} from "react-plaid-link";

import { exchangePublicToken } from "@/lib/actions/user.actions";

type PlaidLinkProps = {
  linkToken: string | null;
};

export const PlaidLink = ({ linkToken }: PlaidLinkProps) => {
  const router = useRouter();
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      await exchangePublicToken(public_token);
      router.push("/");
    },
    []
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};
