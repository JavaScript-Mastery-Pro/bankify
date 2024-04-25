import Link from "next/link";
import Image from "next/image";

import { formatAmount } from "@/lib/utils";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card"
      >
        <div className="bank-card_content">
          <h1 className="text-16 font-semibold text-white">{account.name}</h1>
          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">{userName}</h1>
              <h2 className="text-12 font-semibold text-white">●● / ●●</h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-16">{account.mask}</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon">
          <Image
            src="/icons/Paypass.svg"
            width={20}
            height={24}
            alt="Paypass"
          />
          <Image src="icons/mastercard.svg" width={45} height={32} alt="visa" />
        </div>

        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute left-0 top-0"
        />
      </Link>

      {showBalance && (
        <div className="text-16 flex justify-between px-1 py-3">
          <div className="flex gap-1">
            <Image
              src="/icons/dollar-circle.svg"
              alt="dollar"
              width={20}
              height={20}
            />
            <p className="text-gray-600">Current balance</p>
          </div>
          <p className="font-medium">{formatAmount(account.currentBalance)}</p>
        </div>
      )}
    </div>
  );
};

export default BankCard;
