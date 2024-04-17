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
    imgURL: "/icons/payment-transfer.svg",
    route: "/payment-transfer",
    label: "Payment Transfer",
  },
  {
    imgURL: "/icons/bank-transfer.svg",
    route: "/bank-transfer",
    label: "Bank Transfer",
  },
  {
    imgURL: "/icons/bank-transfer.svg",
    route: "/connect-bank-account",
    label: "Connect Bank Account",
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

interface BudgetCardProps {
  type: "Subscriptions" | "Food and booze" | "Savings";
  amountLeft: number;
}

export const budgetCards: BudgetCardProps[] = [
  {
    type: "Subscriptions",
    amountLeft: 25,
  },
  {
    type: "Food and booze",
    amountLeft: 125,
  },
  {
    type: "Savings",
    amountLeft: 50,
  },
];

export const AppFixedFee = 0.2;
