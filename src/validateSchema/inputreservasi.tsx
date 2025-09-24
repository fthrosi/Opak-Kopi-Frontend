// src/schema/reservasiSchema.ts
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
export const reservasiSchema = z.object({
  number_of_guest: z
  .string()
  .refine((val) => val !== "", { message: "Jumlah orang harus diisi" })
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), { message: "Jumlah orang harus diisi" })
  .refine((val) => val >= 1, { message: "Minimal 1 orang" }),
  reservation_time: z.custom<Dayjs>(
    (val) => dayjs.isDayjs(val) && val.isValid(),
    {
      message: "Tanggal tidak valid",
    }
  ),
});
