// @/schemas/ratingSchema.ts
import { z } from "zod";

export const ratingItemSchema = z.object({
  menuId: z.number(),
  orderItemId: z.number(),
  rating: z
    .number({ message: "Rating harus diisi" })
    .min(1, "Rating minimal 1")
    .max(5, "Rating maksimal 5"),
  comment: z
    .string({ message: "Komentar harus diisi" })
    .min(5, "Komentar minimal 5 karakter")
    .max(500, "Komentar maksimal 500 karakter")
    .refine(
      (comment) => comment.trim().length >= 5,
      {
        message: "Komentar tidak boleh hanya spasi, minimal 5 karakter bermakna"
      }
    ),
});

export const ratingFormSchema = z.object({
  ratings: z.array(ratingItemSchema)
    .min(1, "Data rating tidak valid")
    .superRefine((ratings, ctx) => {
      ratings.forEach((item, index) => {
        if (!item.rating || item.rating < 1 || item.rating > 5) {
          ctx.addIssue({
            code: "custom",
            message: "Rating harus diisi (1-5)",
            path: [index, "rating"],
          });
        }

        if (!item.comment || item.comment.trim().length < 5) {
          ctx.addIssue({
            code: "custom",
            message: "Komentar harus diisi minimal 5 karakter",
            path: [index, "comment"],
          });
        }
      });

      const emptyItems = ratings.filter(item => 
        !item.rating || 
        item.rating < 1 || 
        !item.comment || 
        item.comment.trim().length < 5
      );

      if (emptyItems.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `Semua ${ratings.length} item harus diisi rating dan komentarnya. ${emptyItems.length} item belum lengkap.`,
          path: ["ratings"],
        });
      }
    }),
});

export type RatingFormData = z.infer<typeof ratingFormSchema>;
export type RatingItemData = z.infer<typeof ratingItemSchema>;