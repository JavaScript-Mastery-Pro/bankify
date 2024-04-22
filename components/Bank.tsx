"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import {
  cn,
  formUrlQuery,
  formatAmount,
  getAccountTypeColors,
} from "@/lib/utils";

export const Bank = ({
  account,
  appwriteItemId,
  type,
}: {
  account: Account;
  appwriteItemId?: string;
  type: "full" | "card";
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  console.log(account);

  const colors = getAccountTypeColors(account?.type as AccountTypes);

  return (
    <div
      onClick={handleBankChange}
      className={cn(
        `gap-[18px] flex p-4 transition-all border bg-blue-25 border-transparent ${colors.bg}`,
        {
          "shadow-sm border-blue-700": type === "card" && isActive,
          "rounded-xl": type === "card",
          "hover:shadow-sm cursor-pointer": type === "card",
        }
      )}
    >
      <figure
        className={`flex-center h-fit rounded-full bg-blue-100 ${colors.lightBg}`}
      >
        <Image
          src="/icons/connect-bank.svg"
          width={20}
          height={20}
          alt={account.subtype}
          className="m-2 min-w-5"
        />
      </figure>
      <div className="flex w-full flex-1 flex-col justify-center gap-1">
        <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
          <h2
            className={`text-16 line-clamp-1 flex-1 font-bold text-blue-900 ${colors.title}`}
          >
            {account.institutionName}
          </h2>
          {type === "full" && (
            <p
              className={`rounded-full px-3 py-1 text-[12px] font-medium text-blue-700 ${colors.subText} ${colors.lightBg}`}
            >
              {account.subtype}
            </p>
          )}
        </div>
        <p
          className={`text-[16px] font-medium text-blue-700 ${colors.subText}`}
        >
          {formatAmount(account.currentBalance)}
        </p>
      </div>
    </div>
  );
};
