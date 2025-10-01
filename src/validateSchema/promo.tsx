import { z } from "zod";
import dayjs from "dayjs";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const promoSchema = z.object({
  name: z.string().nonempty({ message: "Nama promo wajib diisi" }),
  promo_type: z.enum(["percent", "amount"], {
    message: "Tipe promo wajib dipilih",
  }),
  start_date: z.string().nonempty({ message: "Tanggal mulai wajib diisi" }),
  end_date: z.string().nonempty({ message: "Tanggal berakhir wajib diisi" }),
  promo_code: z.string().nonempty({ message: "Kode promo wajib diisi" }),
  description: z.string().nonempty({ message: "Deskripsi wajib diisi" }).max(300, { message: "Maksimal 300 karakter" }),
  syarat_promo: z.enum(["menu", "purchase"], {
    message: "Syarat promo wajib dipilih",
  }),
  amount_value: z.number().positive({ message: "Nilai amount wajib diisi" }).min(1, "Nilai amount wajib diisi").optional(),
  percent_value: z
    .number()
    .positive({ message: "Nilai persen wajib diisi" })
    .min(1, "Nilai persen wajib diisi")
    .max(100, "Maksimal 100%")
    .optional(),
  minimum_purchase: z
    .number()
    .positive({ message: "Pembelian minimum wajib diisi" })
    .min(1, "Pembelian minimum wajib diisi")
    .optional(),
  promo_menus: z.array(z.any()).optional(),
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
}).refine(
  (data) => {
    if (data.start_date && data.end_date) {
      const startDate = dayjs(data.start_date);
      const endDate = dayjs(data.end_date);
      return !startDate.isAfter(endDate);
    }
    return true;
  },
  {
    message: "Tanggal mulai tidak boleh lebih dari tanggal berakhir",
    path: ["start_date"],
  }
).refine(
  (data) => {
    if (data.start_date && data.end_date) {
      const startDate = dayjs(data.start_date);
      const endDate = dayjs(data.end_date);
      return !endDate.isBefore(startDate);
    }
    return true;
  },
  {
    message: "Tanggal berakhir tidak boleh kurang dari tanggal mulai",
    path: ["end_date"],
  }
);

export type PromoFormValues = z.infer<typeof promoSchema>;


export const promoEditSchema = z.object({
  name: z.string().nonempty({ message: "Nama promo wajib diisi" }),
  promo_type: z.enum(["percent", "amount"], {
    message: "Tipe promo wajib dipilih",
  }),
  start_date: z.string().nonempty({ message: "Tanggal mulai wajib diisi" }),
  end_date: z.string().nonempty({ message: "Tanggal berakhir wajib diisi" }),
  promo_code: z.string().nonempty({ message: "Kode promo wajib diisi" }),
  description: z.string().nonempty({ message: "Deskripsi wajib diisi" }).max(300, { message: "Maksimal 300 karakter" }),
  syarat_promo: z.enum(["menu", "purchase"], {
    message: "Syarat promo wajib dipilih",
  }),
  status: z.string().nonempty({ message: "Status promo wajib diisi" }),
  amount_value: z.number().optional(),
  percent_value: z.number().optional(),
  minimum_purchase: z.number().optional(),
  promo_menus: z.array(z.any()).optional(),
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
}).refine(
  (data) => {
    if (data.start_date && data.end_date) {
      const startDate = dayjs(data.start_date);
      const endDate = dayjs(data.end_date);
      return !startDate.isAfter(endDate);
    }
    return true;
  },
  {
    message: "Tanggal mulai tidak boleh lebih dari tanggal berakhir",
    path: ["start_date"],
  }
).refine(
  (data) => {
    if (data.start_date && data.end_date) {
      const startDate = dayjs(data.start_date);
      const endDate = dayjs(data.end_date);
      return !endDate.isBefore(startDate);
    }
    return true;
  },
  {
    message: "Tanggal berakhir tidak boleh kurang dari tanggal mulai",
    path: ["end_date"],
  }
).refine(
  (data) => {
    if (data.promo_type === "amount") {
      return data.amount_value && data.amount_value > 0;
    }
    return true;
  },
  {
    message: "Nilai nominal wajib diisi dan harus lebih dari 0",
    path: ["amount_value"],
  }
).refine(
  (data) => {
    if (data.promo_type === "percent") {
      return data.percent_value && data.percent_value > 0 && data.percent_value <= 100;
    }
    return true;
  },
  {
    message: "Nilai persentase harus antara 1-100",
    path: ["percent_value"],
  }
).refine(
  (data) => {
    if (data.syarat_promo === "purchase") {
      return data.minimum_purchase && data.minimum_purchase > 0;
    }
    return true;
  },
  {
    message: "Pembelian minimum wajib diisi dan harus lebih dari 0",
    path: ["minimum_purchase"],
  }
).refine(
  (data) => {
    if (data.syarat_promo === "menu") {
      return data.promo_menus && data.promo_menus.length > 0;
    }
    return true;
  },
  {
    message: "Minimal satu menu harus dipilih",
    path: ["promo_menus"],
  }
);

export type PromoEditFormValues = z.infer<typeof promoEditSchema>;
