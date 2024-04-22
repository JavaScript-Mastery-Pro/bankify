"use client";

import { BankCard } from "@/components/BankCard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const SelectBank = ({
  appwriteItemId,
  accounts,
}: {
  appwriteItemId: string;
  accounts: Account[];
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="text14_padding10 flex gap-2 rounded-lg bg-bank-gradient text-white shadow-form">
          Select bank
        </div>
      </SheetTrigger>
      <SheetContent className="sheet-content">
        <section className="flex flex-1 flex-col gap-6">
          <h1 className="text-18 font-semibold text-gray-900">My Banks</h1>
          <div className="flex flex-col gap-3">
            {accounts.map((account: Account) => (
              <BankCard
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
                type="card"
              />
            ))}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};
