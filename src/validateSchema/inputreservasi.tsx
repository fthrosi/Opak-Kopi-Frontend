// src/schema/reservasiSchema.ts
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
export const reservasiSchema = z.object({
  //   nama: z.string().min(2, "Nama minimal 2 karakter"),
  //   email: z.email("Format email tidak valid"),
  number_of_guest: z
  .string()
  .refine((val) => val !== "", { message: "Jumlah orang harus diisi" })
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), { message: "Jumlah orang harus diisi" })
  .refine((val) => val >= 1, { message: "Minimal 1 orang" }),
  //   noTelepon: z.string().min(13, "Nomor telepon minimal 13 digit").max(13, "Nomor telepon maksimal 13 digit"),
  reservation_time: z.custom<Dayjs>(
    (val) => dayjs.isDayjs(val) && val.isValid(),
    {
      message: "Tanggal tidak valid",
    }
  ),
  // ...validasi lain sesuai kebutuhan
});
