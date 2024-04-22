import Image from "next/image";
import Link from "next/link";

interface CreditCardProps {
  account: Account;
  userName: string;
}

export const BankCard = ({ account, userName }: CreditCardProps) => {
  return (
    <Link
      href={`/transactions/?id=${account.appwriteItemId}`}
      className="relative flex h-[190px] w-full max-w-[316px] justify-between rounded-[20px] border border-white bg-bank-gradient shadow-creditCard backdrop-blur-[6px]"
    >
      <div className="relative z-10 flex size-full max-w-[228px] flex-col justify-between rounded-l-[20px] bg-gray-700 bg-bank-gradient px-5 pb-4 pt-5">
        <h1 className="text-16 font-semibold text-white">
          {account.institutionName}
        </h1>
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
      <div className="flex size-full flex-1 flex-col items-end justify-between rounded-r-[20px] bg-bank-gradient bg-cover bg-center bg-no-repeat py-5 pr-5">
        <Image src="/icons/Paypass.svg" width={20} height={24} alt="Paypass" />
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
  );
};
