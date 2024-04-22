"use client";

import { useUserContext } from "@/context/AuthContext";
import { formatAmount } from "@/lib/utils";

import DoughnutChart from "../DoughnutChart";

export const DashboardHeader = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}) => {
  const { user } = useUserContext();

  return (
    <header className="flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-1 ">
        <h1 className="text-24 lg:text-30 font-semibold text-gray-900">
          Welcome,
          <span className="text-bankGradient">
            {user.name.split(" ")[0]} Adrian
          </span>
        </h1>
        <p className="text-14 lg:text-16 font-normal text-gray-600">
          Access & manage your account and transactions efficiently.
        </p>
      </div>

      <section className="flex h-[168px] w-full items-center gap-6 rounded-xl border border-gray-200 p-6 shadow-chart">
        <div className="size-full max-w-[120px]">
          <DoughnutChart accounts={accounts} />
        </div>

        <article className="flex w-full flex-1 flex-col gap-6">
          <h1 className="text-16 font-semibold text-gray-900">
            {totalBanks} Bank Accounts Connected
          </h1>

          <div className="flex flex-col gap-2">
            <h1 className="text-14 font-medium text-gray-600">
              Total Current Balance
            </h1>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-24 lg:text-30 flex-1 font-semibold text-gray-900">
                {formatAmount(totalCurrentBalance)}
              </h1>
            </div>
          </div>
        </article>
      </section>
    </header>
  );
};
