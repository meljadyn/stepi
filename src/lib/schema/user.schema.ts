import { z } from "zod";

export const userCreateSchema = z
  .object({
    email:        z.string()
                   .email({ message: "Invalid email" })
                   .max(254),
    password:     z.string()
                   .min(6, { message: "Must be at least 6 characters long" })
                   .max(50, { message: "Must be less than 50 characters long" }),
    confirmation: z.string()
  })
  .refine((data) => data.password === data.confirmation, {
    message: "Passwords must match",
    path: ["confirmation"]
  });
