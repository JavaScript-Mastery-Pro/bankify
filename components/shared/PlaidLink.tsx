/* eslint-disable camelcase */

import Image from "next/image";
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

export const PlaidLink = ({
  user,
  variant = "primary",
  dwollaCustomerId,
}: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
        dwollaCustomerId,
      });
      router.push("/");
    },
    [user]
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : (
        <Button
          onClick={() => open()}
          variant="ghost"
          className="plaidlink-default"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="hidden text-[16px] font-semibold text-black-2 xl:block">
            Connect Bank
          </p>
        </Button>
      )}
    </>
  );
};
