"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery, formatAmount } from "@/lib/utils";

const BankCard = ({
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
  const isActive = appwriteItemId === account.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account.appwriteItemId,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn("gap-[18px] flex p-4 bg-pink-25 transition-all", {
        "bg-blue-25": account.subtype === "checking",
        "bg-success-25": account.subtype === "savings",
        "shadow-md border": type === "card" && isActive,
        "rounded-xl": type === "card",
        "hover:shadow-md cursor-pointer": type === "card",
      })}
    >
      <figure
        className={cn("flex-center rounded-full h-fit bg-pink-100", {
          "bg-blue-100": account.subtype === "checking",
          "bg-success-100": account.subtype === "savings",
        })}
      >
        <Image
          src={
            account.subtype === "checking"
              ? "/icons/monitor.svg"
              : account.subtype === "savings"
                ? "/icons/coins.svg"
                : "/icons/shopping-bag.svg"
          }
          width={20}
          height={20}
          alt={account.subtype}
          className="m-2 min-w-5"
        />
      </figure>
      <div className="flex w-full flex-1 flex-col justify-center">
        <div className="text-16 flex items-center justify-between gap-2 overflow-hidden">
          <h2
            className={cn("font-bold text-pink-900 flex-1 line-clamp-1", {
              "text-blue-900": account.subtype === "checking",
              "text-success-900": account.subtype === "savings",
            })}
          >
            {account.officialName}
          </h2>
          <p
            className={cn("font-bold text-[16px]", {
              "text-blue-700": account.subtype === "checking",
              "text-success-700": account.subtype === "savings",
            })}
          >
            {formatAmount(account.currentBalance)}
          </p>
        </div>
        {type === "full" && (
          <p
            className={cn("text-[14px] flex-1 mt-1", {
              "text-blue-700": account.subtype === "checking",
              "text-success-700": account.subtype === "savings",
            })}
          >
            {account.subtype}
          </p>
        )}
      </div>
    </div>
  );
};

export default BankCard;
