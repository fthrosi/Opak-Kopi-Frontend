import Modal from "./modal";
import InputForm from "../molecules/inputForm";
import { Button } from "../atoms/button";
import type { Order } from "@/types/order";
import type { Rating } from "@/types/rating";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ratingFormSchema, type RatingFormData } from "@/validateSchema/rating";
import { useEffect } from "react";
import { Text } from "../atoms/text";

type ratingProps = {
  order: Order | null;
  onClose: () => void;
  onSubmit: (rating: Rating[]) => void;
};
export const ModalRating = ({ order, onClose, onSubmit }: ratingProps) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    register,
    watch,
  } = useForm<RatingFormData>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      ratings: [],
    },
  });

  const watchedRatings = watch("ratings");

  useEffect(() => {
    if (order?.order_items) {
      const initialRatings = order.order_items.map((item) => ({
        menuId: item.menu.id,
        orderItemId: item.id,
        rating: 0, // Default rating
        comment: "",
      }));

      setValue("ratings", initialRatings);
    }
  }, [order, setValue]);
  const onFormSubmit = (data: RatingFormData) => {
    try {
      console.log("Form data:", data);
      onSubmit(data.ratings);
      reset(); // Reset form setelah submit
      onClose();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };
  const handleClose = () => {
    reset(); // Reset form saat close
    onClose();
  };
  const getIncompleteItems = () => {
    if (!watchedRatings) return [];
    return watchedRatings.filter(
      (item) =>
        !item.rating ||
        item.rating < 1 ||
        !item.comment ||
        item.comment.trim().length < 5
    );
  };
  const incompleteItems = getIncompleteItems();
  const hasFormErrors = Object.keys(errors).length > 0;
  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      background="white"
      padding="default"
      rounded="default"
      modalClassName="max-w-lg pt-10"
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-4"
      >
        {order?.order_items.map((item, index) => (
          <div className="flex flex-col gap-2" key={item.id}>
            <div className="flex flex-col gap-1">
              <InputForm
                inputId={`ratings.${index}.rating`}
                children={`Beri rating untuk ${item.name_menu}`}
                inputClassName={`${
                  errors.ratings?.[index]?.rating
                    ? "border-red-500 focus:border-red-500"
                    : ""
                } px-3 py-2`}
                inputProps={{
                  ...register(`ratings.${index}.rating`, {
                    valueAsNumber: true,
                  }),
                  type: "number",
                  min: 1,
                  max: 5,
                  placeholder: `Rating 1-5 untuk ${item.name_menu}`,
                }}
              />
              {errors.ratings?.[index]?.rating && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.ratings[index]?.rating?.message}
                </Text>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <InputForm
                inputId={`ratings.${index}.comment`}
                children={`Beri komentar untuk ${item.name_menu}`}
                inputClassName={`${
                  errors.ratings?.[index]?.comment
                    ? "border-red-500 focus:border-red-500"
                    : ""
                } px-3 py-2`}
                inputProps={{
                  type: "text",
                  ...register(`ratings.${index}.comment`),
                  placeholder: `Komentar untuk ${item.name_menu}`,
                }}
              />
              {errors.ratings?.[index]?.comment && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.ratings[index]?.comment?.message}
                </Text>
              )}
            </div>
            <input
              type="hidden"
              {...register(`ratings.${index}.menuId`, {
                valueAsNumber: true,
              })}
              value={item.menu.id}
            />
            <input
              type="hidden"
              {...register(`ratings.${index}.orderItemId`, {
                valueAsNumber: true,
              })}
              value={item.id}
            />
          </div>
        ))}
        {errors.ratings?.message && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <Text
              size="caption"
              className="text-red-600 text-center font-medium"
            >
              ⚠️ {errors.ratings.message}
            </Text>
          </div>
        )}

        {/* Form Summary */}
        {incompleteItems.length > 0 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Text size="caption" className="text-yellow-700 text-center">
              {incompleteItems.length} dari {order?.order_items.length} item
              belum lengkap diisi
            </Text>
          </div>
        )}
        {incompleteItems.length === 0 &&
          watchedRatings &&
          watchedRatings.length > 0 && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <Text size="caption" className="text-green-700 text-center">
                ✅ Semua {order?.order_items.length} item sudah diisi dengan
                lengkap
              </Text>
            </div>
          )}
        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting
              ? "Mengirim..."
              : `Kirim Rating (${order?.order_items.length} Item)`}
          </Button>
          <Button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            Batal
          </Button>
        </div>
      </form>
    </Modal>
  );
};
