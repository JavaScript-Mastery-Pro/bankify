"use client";

import { formatAmount } from "@/lib/utils";

import DoughnutChart from "../DoughnutChart";

export const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex w-full flex-1 flex-col gap-6">
        <h2 className="header-2">{totalBanks} Bank Accounts</h2>

        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>

          <p className="total-balance-amount">
            {formatAmount(totalCurrentBalance)}
          </p>
        </div>
      </div>
    </section>
  );
};
