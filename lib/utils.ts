import { type ClassValue, clsx } from "clsx";
import Stripe from "stripe";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const calculateStripeFee = (amount: number) => {
  const percentageFee = 0.029; // 2.9%
  const fixedFee = 0.3; // 30 cents

  // Calculate the fee without rounding first
  let feeWithoutRounding = amount * percentageFee;

  // Round up to the nearest higher decimal place
  feeWithoutRounding = Math.ceil(feeWithoutRounding * 100) / 100;

  // Add the fixed fee
  const totalFee = feeWithoutRounding + fixedFee + 0.01;

  return totalFee;
};
