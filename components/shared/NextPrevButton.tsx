import Image from "next/image";

import { cn } from "@/lib/utils";

const NextPrevButton = ({ type }: { type: "next" | "prev" }) => {
  return (
    <div
      className={cn("flex-center gap-2", {
        "flex-row-reverse": type === "prev",
      })}
    >
      <h1 className="text-14 font-semibold text-gray-600">
        {type === "next" ? "Next" : "Previous"}
      </h1>
      <Image
        src={
          type === "next" ? "/icons/arrow-right.svg" : "/icons/arrow-left.svg"
        }
        width={20}
        height={20}
        alt="arrow icon"
      />
    </div>
  );
};

export default NextPrevButton;
