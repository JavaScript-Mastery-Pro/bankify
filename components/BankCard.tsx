"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery, formatAmount } from "@/lib/utils";

const BankCard = ({ bank }: { bank: BankCard }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: bank.id,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn(
        "gap-[18px] flex p-4 rounded-xl bg-pink-25 cursor-pointer hover:shadow-md transition-all shadow-sm",
        {
          "bg-blue-25": bank.type === "checking",
          "bg-success-25": bank.type === "savings",
        }
      )}
    >
      <figure
        className={cn("flex-center size-10 rounded-full bg-pink-100", {
          "bg-blue-100": bank.type === "checking",
          "bg-success-100": bank.type === "savings",
        })}
      >
        <Image
          src={
            bank.type === "checking"
              ? "/icons/monitor.svg"
              : bank.type === "savings"
                ? "/icons/coins.svg"
                : "/icons/shopping-bag.svg"
          }
          width={20}
          height={20}
          alt={bank.type}
        />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-16 flex justify-between">
          <h2
            className={cn("font-bold text-pink-900", {
              "text-blue-900": bank.type === "checking",
              "text-success-900": bank.type === "savings",
            })}
          >
            {bank.name}
          </h2>
          <h3
            className={cn("font-medium", {
              "text-blue-700": bank.type === "checking",
              "text-success-700": bank.type === "savings",
            })}
          >
            {formatAmount(bank.currentBalance)}
          </h3>
        </div>
        <p
          className={cn("text-[14px]", {
            "text-blue-700": bank.type === "checking",
            "text-success-700": bank.type === "savings",
          })}
        >
          {bank.type}
        </p>
      </div>
    </div>
  );
};

export default BankCard;
