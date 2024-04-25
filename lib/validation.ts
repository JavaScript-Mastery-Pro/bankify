import { z } from "zod";

export const authValidation = (type: string) => {
  return {
    firstName:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "first name cannot be empty"),
    lastName:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "last name cannot be empty"),
    email: z.string().email(),
    address1:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .max(
              50,
              "Address cannot be empty and must be 50 or fewer characters"
            ),
    city:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "city cannot be empty"),
    state:
      type === "sign-in"
        ? z.string().optional()
        : z.string().max(2, "state must be a 2-letter abbreviation"),
    postalCode:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "postal code cannot be empty"),
    dateOfBirth:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "date of birth cannot be empty"),
    ssn:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(4, "ssn cannot be empty").max(4),
    password: z.string().min(8, "password must be 8 character"),
  };
};
