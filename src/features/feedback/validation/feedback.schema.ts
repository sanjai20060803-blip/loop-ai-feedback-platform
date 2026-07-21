import { z } from "zod";

export const feedbackSchema = z.object({
  title: z.string().optional(),

  content: z.string().min(10),

  channel: z.string(),

  customerLabel: z.string().optional(),
});