import { z } from "zod";

export const projectCreateSchema = z.object({
  name: z.string().max(50, { message: "Must be fewer than 50 characters" }),
});
