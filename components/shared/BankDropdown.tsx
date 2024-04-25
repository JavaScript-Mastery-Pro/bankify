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
import { UseFormSetValue } from "react-hook-form";

export const BankDropdown = ({
  accounts = [],
  appwriteItemId,
  setValue,
  otherStyles,
}: {
  accounts: Account[];
  appwriteItemId: string;
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
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

    if (setValue) {
      setValue("senderBank", id);
    }
  };

  return (
    <Select
      defaultValue={itemId}
      onValueChange={(value) => handleBankChange(value)}
    >
      <SelectTrigger className={`flex w-full md:w-[180px] ${otherStyles}`}>
        <Image
          src="icons/credit-card.svg"
          width={20}
          height={20}
          alt="account"
        />
        <p>Select Account</p>
      </SelectTrigger>
      <SelectContent
        className={`w-full md:w-[300px] ${otherStyles}`}
        align="end"
      >
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
                <p className="text-16 font-medium">{account.name}</p>
                <p className="text-14 font-medium text-blue-600">
                  {formatAmount(account.currentBalance)}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
