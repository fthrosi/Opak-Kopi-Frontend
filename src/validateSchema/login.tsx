import {z} from "zod";

export const loginSchema = z.object({
  email: z.email({message: "Format email tidak valid"}).min(1, {message: "Email harus diisi"}),
  password: z.string().min(6, {message: "Password minimal 6 karakter"}),
});

export type LoginFormData = z.infer<typeof loginSchema>;