"use client";

import { useUserContext } from "@/context/AuthContext";

import { Button } from "../ui/button";

export const DashboardHeader = () => {
  const { user } = useUserContext();

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
      <Button className="text-14 bg-bank-gradient px-4 py-2.5 font-semibold text-white shadow-form">
        Send funds
      </Button>
    </header>
  );
};
