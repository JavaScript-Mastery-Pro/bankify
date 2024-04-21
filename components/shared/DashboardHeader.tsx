"use client";

import { PlaidLink } from "@/components/shared/PlaidLink";
import { TEST_USER_ID } from "@/constants";
import { useUserContext } from "@/context/AuthContext";

export const DashboardHeader = () => {
  const { user } = useUserContext();

  // Todo - get actual userId
  const userId = TEST_USER_ID;

  return (
    <header className="flex justify-between">
      <div className="flex flex-col gap-1 ">
        <h1 className="text-24 lg:text-30 font-semibold text-gray-900">
          Welcome,{" "}
          <span className="text-bankGradient">{user.name.split(" ")[0]}</span>
        </h1>
        <p className="text-14 lg:text-16 font-normal text-gray-600">
          Access & manage your account and transactions efficiently.
        </p>
      </div>

      <PlaidLink user={userId} />
    </header>
  );
};
