/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type CreateNewUser = {
  accountId: string;
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

declare type Balance = {
  type: string;
  amount: number;
};
