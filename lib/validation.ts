import { z } from "zod";

// Schema for sign-in form
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Schema for sign-up form
export const signUpSchema = z.object({
  firstName: z.string().min(3, "First name cannot be empty"),
  lastName: z.string().min(3, "Last name cannot be empty"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  address1: z.string().min(3, "Address cannot be empty"),
  city: z.string().min(3, "City cannot be empty"),
  state: z.string().min(2, "State cannot be empty").max(2),
  postalCode: z.string().min(3, "Postal code cannot be empty"),
  dateOfBirth: z.string().min(3, "Date of birth cannot be empty"),
  ssn: z.string().min(4, "SSN cannot be empty").max(4),
});
