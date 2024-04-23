"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery } from "@/lib/utils";

export const BankTabItem = ({
  account,
  appwriteItemId,
}: {
  account: Account;
  appwriteItemId?: string;
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

  return (
    <div
      onClick={handleBankChange}
      className={cn(
        `gap-[18px] flex px-2 sm:px-4 py-2 transition-all border-b-2  border-transparent`,
        {
          "shadow-sm border-blue-600": isActive,
        }
      )}
    >
      <p
        className={cn(`text-16 line-clamp-1 flex-1 font-medium text-gray-500`, {
          "shadow-sm text-blue-600": isActive,
        })}
      >
        {account.institutionName}
      </p>
    </div>
  );
};
