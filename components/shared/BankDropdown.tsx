"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { formUrlQuery, formatAmount } from "@/lib/utils";

export const BankDropdown = ({
  accounts = [],
  appwriteItemId,
}: {
  accounts: Account[];
  appwriteItemId: string;
}) => {
  const [itemId, setItemId] = useState(appwriteItemId);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleBankChange = (id: string) => {
    setItemId(id);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <Select
      defaultValue={itemId}
      onValueChange={(value) => handleBankChange(value)}
    >
      <SelectTrigger className="flex w-full md:w-[180px]">
        <Image
          src="icons/credit-card.svg"
          width={20}
          height={20}
          alt="account"
        />
        <p>Select Account</p>
      </SelectTrigger>
      <SelectContent className="w-full md:w-[300px]" align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">
            Select a bank to display
          </SelectLabel>
          {accounts.map((account: Account) => (
            <SelectItem
              key={account.id}
              value={account.appwriteItemId}
              className="cursor-pointer border-t"
            >
              <div className="flex flex-col ">
                <p className="text-16 font-medium">{account.institutionName}</p>
                <p className="text-14 font-medium text-blue-600">
                  {formatAmount(account.currentBalance)}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    // <Sheet>
    //   <SheetTrigger>
    //     <div className="text14_padding10 flex gap-2 rounded-lg bg-bank-gradient text-white shadow-form">
    //       Select bank
    //     </div>
    //   </SheetTrigger>
    //   <SheetContent className="sheet-content">
    //     <section className="flex flex-1 flex-col gap-6">
    //       <h1 className="text-18 font-semibold text-gray-900">My Banks</h1>
    //       <div className="flex flex-col gap-3">
    //         {accounts.map((account: Account) => (
    //           <Bank
    //             key={account.id}
    //             account={account}
    //             appwriteItemId={appwriteItemId}
    //             type="card"
    //           />
    //         ))}
    //       </div>
    //     </section>
    //   </SheetContent>
    // </Sheet>
  );
};
