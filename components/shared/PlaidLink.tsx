/* eslint-disable camelcase */

import React, { useCallback } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  usePlaidLink,
} from "react-plaid-link";

type PlaidLinkProps = {
  linkToken: string | null;
};

export const PlaidLink = ({ linkToken }: PlaidLinkProps) => {
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/plaid/exchange_public_token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicToken: public_token }),
        }
      );
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
