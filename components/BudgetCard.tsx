import Image from "next/image";

import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";

interface BudgetCardProps {
  type: "Subscriptions" | "Food and booze" | "Savings";
  amountLeft: number;
}

const BudgetCard = ({ type, amountLeft }: BudgetCardProps) => {
  return (
    <div
      className={cn("gap-[18px] flex p-4 rounded-xl bg-pink-25", {
        "bg-blue-25": type === "Subscriptions",
        "bg-success-25": type === "Savings",
      })}
    >
      <figure
        className={cn("flex-center size-10 rounded-full bg-pink-100", {
          "bg-blue-100": type === "Subscriptions",
          "bg-success-100": type === "Savings",
        })}
      >
        <Image
          src={
            type === "Subscriptions"
              ? "/icons/monitor.svg"
              : type === "Savings"
                ? "/icons/coins.svg"
                : "/icons/shopping-bag.svg"
          }
          width={20}
          height={20}
          alt={type}
        />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
          <h2
            className={cn("font-medium text-pink-900", {
              "text-blue-900": type === "Subscriptions",
              "text-success-900": type === "Savings",
            })}
          >
            {type}
          </h2>
          <h3
            className={cn("font-normal text-pink-700", {
              "text-blue-700": type === "Subscriptions",
              "text-success-700": type === "Savings",
            })}
          >
            ${amountLeft} left
          </h3>
        </div>
        <Progress
          value={amountLeft}
          className={cn("h-2 w-full bg-pink-100", {
            "bg-blue-100": type === "Subscriptions",
            "bg-success-100": type === "Savings",
          })}
          indicatorClassName={cn("bg-pink-700", {
            "bg-blue-700": type === "Subscriptions",
            "bg-success-700": type === "Savings",
          })}
        />
      </div>
    </div>
  );
};

export default BudgetCard;
