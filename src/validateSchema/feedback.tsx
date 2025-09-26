import { z } from "zod";

export const feedbackSchema = z.object({
  topic: z.string().min(1, { message: "Topik harus dipilih" }),
  message: z
    .string()
    .min(10, { message: "Pesan minimal 10 karakter" })
    .max(500, { message: "Pesan maksimal 500 karakter" }),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>; 