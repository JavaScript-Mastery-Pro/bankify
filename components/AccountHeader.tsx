"use client";

import { cn, formatAmount } from "@/lib/utils";

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
          <div
            className={cn(
              "text-[14px] flex h-fit items-center rounded-2xl px-3 py-1 font-medium text-success-700 max-sm:hidden",
              {
                "bg-blue-100": account.subtype === "checking",
                "bg-success-100": account.subtype === "savings",
              }
            )}
          >
            <p
              className={cn("font-medium text-pink-900", {
                "text-blue-900": account.subtype === "checking",
                "text-success-900": account.subtype === "savings",
              })}
            >
              {account.subtype}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AccountHeader;
