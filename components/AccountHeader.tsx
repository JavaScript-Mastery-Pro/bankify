"use client";

import { formatAmount } from "@/lib/utils";

const AccountHeader = ({ account }: { account: Account }) => {
  return (
    <article className="flex w-full flex-1 flex-col gap-6">
      <h1 className="text-16 font-semibold text-gray-900">Primary Account</h1>

      <div className="flex flex-col gap-2">
        <h1 className="text-14 font-medium text-gray-600">
          Current balance ({account.name})
        </h1>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-24 lg:text-30 flex-1 font-semibold text-gray-900">
            {formatAmount(account.currentBalance)}
          </h1>
          <div className="text-14  flex h-fit items-center rounded-2xl bg-success-50 px-3 py-1 font-medium text-success-700 max-sm:hidden">
            <h3>{account.subtype}</h3>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AccountHeader;
