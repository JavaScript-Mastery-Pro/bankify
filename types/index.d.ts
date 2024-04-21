/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
  email: string;
  name: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  id: string;
  accountId: string;
  stripeId: string;
  name: string;
  email: string;
  image: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  name: string;
  officialName: string;
  mask: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
};

declare type Transaction = {
  id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
};

declare type BankCard = {
  id: string;
  name: string;
  type: "checking" | "savings";
  currentBalance: number;
};
