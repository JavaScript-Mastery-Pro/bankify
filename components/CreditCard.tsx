import Image from "next/image";

import { cn } from "@/lib/utils";

const CreditCard = ({
  bgClassName,
  icon,
}: {
  bgClassName?: string;
  icon: string;
}) => {
  return (
    <section
      className={cn(
        "relative flex h-[190px] w-full max-w-[316px] justify-between rounded-[20px] border border-white shadow-creditCard backdrop-blur-[6px]",
        bgClassName
      )}
    >
      <div
        className={cn(
          "relative z-10 flex size-full max-w-[228px] flex-col justify-between rounded-l-[20px] bg-gray-700 px-5 pb-4 pt-5",
          { "bg-transparent": bgClassName }
        )}
      >
        <h1 className="text-16 font-semibold text-white">JS Mastery Pro.</h1>
        <article className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="text-12 font-semibold text-white">Adrian Hajdin</h1>
            <h2 className="text-12 font-semibold text-white">12/24</h2>
          </div>
          <p className="text-16 font-semibold tracking-[1.1px] text-white">
            1234 1234 1234 1234
          </p>
        </article>
      </div>
      <div
        className={cn(
          "flex size-full flex-1 flex-col items-end justify-between rounded-r-[20px] bg-gradient-mesh bg-cover bg-center bg-no-repeat py-5 pr-5",
          {
            "bg-transparent": bgClassName,
          }
        )}
      >
        <Image src="/icons/Paypass.svg" width={20} height={24} alt="Paypass" />
        <Image src={icon} width={45} height={32} alt="visa" />
      </div>
      <Image
        src="/icons/lines.png"
        width={316}
        height={190}
        alt="lines"
        className="absolute left-0 top-0"
      />
    </section>
  );
};

export default CreditCard;
