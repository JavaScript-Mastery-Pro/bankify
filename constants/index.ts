export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
];

export const Banks: Bank[] = [
  {
    id: "6624c02e00367128945e",
    name: "Plaid Bank",
    type: "checking",
    currentBalance: 110.0,
  },
  {
    id: "6624bf700008ee34603c",
    name: "Chase Bank",
    type: "savings",
    currentBalance: 2588.12,
  },
  {
    id: "6624bf700008ee34603c",
    name: "First Platypus Bank",
    type: "savings",
    currentBalance: 2588.12,
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6624bf1e0022238a30a6";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017",
    itemId: "MA4zpXMbzMIreAvLgRqEf1olAgNnnxt9GQj9b",
    userId: "6624bf1e0022238a30a6",
  },
  {
    id: "6624bf700008ee34603c",
    accessToken: "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63",
    itemId: "Z7BjW4XDQ7fBxVyBqkNruBAgbgrX1Xcg97onW",
    userId: "6624bf1e0022238a30a6",
  },
  {
    id: "66261280000ceea516e1",
    accessToken: "access-sandbox-2611c8c9-0e66-4ef8-8339-66f340a866e2",
    itemId: "oVQeB3l8prH5PBJwA1lEixxoA4WBpaCRvnoBz",
    userId: "6624bf1e0022238a30a6",
  },
];
