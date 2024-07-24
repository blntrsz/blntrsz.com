import { z } from "zod";

export const createArticleActionSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
});
