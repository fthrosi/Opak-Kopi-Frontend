// schemas/menuSchema.ts (Contoh file terpisah)
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Nama menu wajib diisi." }).min(3, { message: "Nama menu minimal 3 karakter." }).max(20, { message: "Nama menu maksimal 20 karakter." }),
  category_id: z.string().nonempty({ message: "Kategori wajib dipilih." }),
  status: z.enum(["tersedia", "habis"]),
  current_price: z.number().min(1, { message: "Harga harus Diisi" }).positive({ message: "Harga tidak boleh negatif." }),
  current_cogs: z.number().min(1, { message: "Harga pokok harus Diisi" }).positive({ message: "Harga pokok tidak boleh negatif." }),
  description: z.string().nonempty({ message: "Deskripsi harus diisi." }).max(300, { message: "Deskripsi maksimal 300 karakter." }).optional(),
  image: z
    .any()
    .optional()
    .refine(
        (files) => !files || files?.length === 1,
        "Gambar wajib diunggah."
    )
    .refine(
      (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 5MB.`
    )
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Hanya format .jpg, .jpeg, .png dan .webp yang didukung."
    ),
});

// Mengekstrak tipe TypeScript dari skema Zod
export type MenuFormValues = z.infer<typeof menuSchema>;