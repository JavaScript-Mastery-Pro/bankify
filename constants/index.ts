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
    company: "Spotify",
    companyLogo: "/icons/spotify.svg",
    amount: 12.99,
    date: "Wed 1:00pm",
    category: "Subscriptions",
    status: "debited",
  },
  {
    company: "A coffee",
    companyLogo: "/icons/a-coffee.svg",
    amount: 18.99,
    date: "Wed 7:20pm",
    category: "Food and dining",
    status: "debited",
  },
  {
    company: "Stripe",
    companyLogo: "/icons/stripe.svg",
    amount: 88.0,
    date: "Wed 2:45pm",
    category: "Income",
    status: "credited",
  },
  {
    company: "Figma",
    companyLogo: "/icons/figma.svg",
    amount: 15.0,
    date: "Tue 6:10pm",
    category: "Subscriptions",
    status: "debited",
  },
  {
    company: "TBF Bakery",
    companyLogo: "/icons/tbfBakery.svg",
    amount: 35.5,
    date: "Tue 7:52am",
    category: "Food and dining",
    status: "debited",
  },
  {
    company: "Fresh F&V",
    companyLogo: "/icons/fresh-fv.svg",
    amount: 25.5,
    date: "Tue 7:52am",
    category: "Groceries",
    status: "debited",
  },
  {
    company: "Stripe",
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
