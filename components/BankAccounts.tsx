"use client";

import { useEffect, useState } from "react";

import { useUserContext } from "@/context/AuthContext";
import { getBankAccounts } from "@/lib/services";
import { formatDateTime } from "@/lib/utils";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";

export const BankAccounts = () => {
  const { user } = useUserContext();
  const [banks, setBanks] = useState<any[]>([]);

  console.log({ banks });

  useEffect(() => {
    const getTransactionsData = async () => {
      const data = await getBankAccounts(user.id);
      if (data) {
        const tableData = data.documents.map((bank) => ({
          bankName: bank.bankName,
          externalAccount: bank.externalAccount,
          date: bank.$createdAt,
        }));
        setBanks(tableData);
      }

      return banks;
    };

    getTransactionsData();
  }, [user.id]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="px-0">Bank Name</TableHead>
          <TableHead className="px-0">External Account Id</TableHead>
          <TableHead className="px-0">Added</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {banks.map((item, index) => (
          <TableRow key={index + 1}>
            <TableCell className="px-0">{item.bankName}</TableCell>
            <TableCell className="px-0">{item.externalAccount}</TableCell>
            <TableCell className="px-0">
              {formatDateTime(new Date(item.date)).dateTime}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
