import { z } from "zod";

export const taskCreateSchema = z.object({
  title: z.string().min(1).max(150),
  duration: z.number(),
  unit: z.enum(["min", "h"]),
});
