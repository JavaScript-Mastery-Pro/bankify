"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useUserContext } from "@/context/AuthContext";
import { getBalance } from "@/lib/stripe";

const AccountHeader = () => {
  const { user } = useUserContext();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchBalance() {
      const balance = await getBalance(user.stripeId);

      console.log("balance", balance);
      setBalance(balance.pending[0].amount / 100);
    }
    fetchBalance();
  });

  return (
    <article className="flex w-full flex-1 flex-col gap-6">
      <h1 className="text-16 font-semibold text-gray-900">Primary account</h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-14 font-medium text-gray-600">Current balance</h1>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-24 lg:text-30 flex-1 font-semibold text-gray-900">
            ${balance}
          </h1>
          <div className="text-14  flex h-fit items-center rounded-2xl bg-success-50 px-2 font-medium text-success-700 max-sm:hidden">
            <Image
              src="/icons/arrow-up.svg"
              width={12}
              height={12}
              alt="arrow up"
            />{" "}
            <h3>3.4</h3>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AccountHeader;
