import Image from "next/image";

import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";

export const Category = ({ category }: { category: CategoryCount }) => {
  return (
    <div
      className={cn("gap-[18px] flex p-4 rounded-xl bg-pink-25", {
        "bg-blue-25": category.name === "Food and Drink",
        "bg-success-25": category.name === "Travel",
      })}
    >
      <figure
        className={cn("flex-center size-10 rounded-full bg-pink-100", {
          "bg-blue-100": category.name === "Food and Drink",
          "bg-success-100": category.name === "Travel",
        })}
      >
        <Image
          src={
            category.name === "Food and Drink"
              ? "/icons/monitor.svg"
              : category.name === "Travel"
                ? "/icons/coins.svg"
                : "/icons/shopping-bag.svg"
          }
          width={20}
          height={20}
          alt={category.name}
        />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
          <h2
            className={cn("font-medium text-pink-900", {
              "text-blue-900": category.name === "Food and Drink",
              "text-success-900": category.name === "Travel",
            })}
          >
            {category.name}
          </h2>
          <h3
            className={cn("font-normal text-pink-700", {
              "text-blue-700": category.name === "Food and Drink",
              "text-success-700": category.name === "Travel",
            })}
          >
            {category.count}
          </h3>
        </div>
        <Progress
          value={(category.count / category.totalCount) * 100}
          className={cn("h-2 w-full bg-pink-100", {
            "bg-blue-100": category.name === "Food and Drink",
            "bg-success-100": category.name === "Travel",
          })}
          indicatorClassName={cn("bg-pink-700", {
            "bg-blue-700": category.name === "Food and Drink",
            "bg-success-700": category.name === "Travel",
          })}
        />
      </div>
    </div>
  );
};
