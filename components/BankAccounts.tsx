"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody } from "./ui/table";

export const BankAccounts = () => {
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
        {/* Render banks */}
        {/* {banks.map((item, index) => (
          <TableRow key={index + 1}>
            <TableCell className="px-0">{item.bankName}</TableCell>
            <TableCell className="px-0">{item.externalAccount}</TableCell>
            <TableCell className="px-0">
              {formatDateTime(new Date(item.date)).dateTime}
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};
