import {z} from "zod";

export const orderSchemaLogin = z.object({
  userId: z.number().int().positive(),
   table_id: z
    .string()
    .refine((val) => val !== "", { message: "Meja harus dipilih" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Meja harus berupa angka" })
    .refine((val) => val >= 1, { message: "Meja harus dipilih" }),
  point_use: z.number().int().min(0).optional(),
  promo_id: z.number().int().nullable().optional(),
  note: z.string().max(255).optional(),
  order_items: z.array(
    z.object({
      menu_id: z.number().int().positive(),
      quantity: z.number().int().min(1),
    })
  ).min(1, { message: "Pesanan tidak boleh kosong" }),
});