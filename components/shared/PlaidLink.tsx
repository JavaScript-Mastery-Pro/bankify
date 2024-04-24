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

type PlaidLinkProps = {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId: string;
};

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
          className="text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form"
        >
          Connect bank
        </Button>
      ) : (
        <Button
          onClick={() => open()}
          variant="ghost"
          className="flex cursor-pointer items-center justify-center gap-4 rounded-lg px-3 py-7 hover:bg-white lg:justify-start"
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
