export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },

  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/deposit.svg",
    route: "/new-deposit",
    label: "My Banks",
  },
  {
    imgURL: "/icons/payment-transfer.svg",
    route: "/payment-transfer",
    label: "Payment Transfer",
  },
];

export const transactionHistory = [
  {
    id: "Spotify",
    name: "Spotify",
    companyLogo: "/icons/spotify.svg",
    amount: 12.99,
    date: "Wed 1:00pm",
    category: "Subscriptions",
    status: "debited",
  },
  {
    id: "A coffee",
    name: "A coffee",
    companyLogo: "/icons/a-coffee.svg",
    amount: 18.99,
    date: "Wed 7:20pm",
    category: "Food and dining",
    status: "debited",
  },
  {
    id: "Stripe",
    name: "Stripe",
    companyLogo: "/icons/stripe.svg",
    amount: 88.0,
    date: "Wed 2:45pm",
    category: "Income",
    status: "credited",
  },
  {
    id: "Figma",
    name: "Figma",
    companyLogo: "/icons/figma.svg",
    amount: 15.0,
    date: "Tue 6:10pm",
    category: "Subscriptions",
    status: "debited",
  },
  {
    id: "TBF Bakery",
    name: "TBF Bakery",
    companyLogo: "/icons/tbfBakery.svg",
    amount: 35.5,
    date: "Tue 7:52am",
    category: "Food and dining",
    status: "debited",
  },
  {
    id: "Fresh F&V",
    name: "Fresh F&V",
    companyLogo: "/icons/fresh-fv.svg",
    amount: 25.5,
    date: "Tue 7:52am",
    category: "Groceries",
    status: "debited",
  },
  {
    id: "Stripe",
    name: "Stripe",
    companyLogo: "/icons/stripe.svg",
    amount: 88.0,
    date: "Wed 2:45pm",
    category: "Income",
    status: "credited",
  },
];

export const bankCards: BankCard[] = [
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
    id: "6624c02e00367128945e",
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
];
