import { type ClassValue, clsx } from "clsx";
import Stripe from "stripe";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
