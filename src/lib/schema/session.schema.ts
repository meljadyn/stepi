import { z } from "zod";

export const sessionCreateSchema = z
  .object({
    email:        z.string(),
    password:     z.string()
  });
