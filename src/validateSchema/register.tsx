import {z} from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  email: z.email({ message: "Format email tidak valid" }).min(1, { message: "Email harus diisi" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;