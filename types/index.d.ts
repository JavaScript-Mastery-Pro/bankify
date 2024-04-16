/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type CreateAppwriteUser = {
  email: string;
  name: string | undefined;
  password: string;
  stripeId: string;
};

// ========================================

declare type CreateNewUser = {
  email: string;
  name: string;
  password: string;
  ssn: string;
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
