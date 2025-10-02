import {z} from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  email: z.email({ message: "Format email tidak valid" }).min(1, { message: "Email harus diisi" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;



export const createUserSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  email: z.email({ message: "Format email tidak valid" }).min(1, { message: "Email harus diisi" }),
  phone : z.string().min(1, { message: "No. Telp harus diisi" }).max(12, { message: "No. Telp maksimal 12 karakter" }),
});

export type createUserFormData = z.infer<typeof createUserSchema>;