import { Text } from "../atoms/text";
import SelectLabel from "../molecules/selectLabel";
import { Button } from "../atoms/button";
import SecondNavbar from "../molecules/secondNavbar";
import { Pages } from "../atoms/page";
import { useState, useEffect} from "react";
import { fetchFeedbacksByUser } from "@/api/feedback";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  feedbackSchema,
  type FeedbackFormData,
} from "@/validateSchema/feedback";
import { toast } from "sonner";
import { submitFeedback } from "@/api/feedback";
import type { FeedbackData } from "@/types/feedback";
import { navbarFeedback } from "@/const/constNavbar";

const options = [
  { value: "Pelayanan", label: "Pelayanan" },
  { value: "Tempat", label: "Tempat" },
];
export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>("Dikirim");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<FeedbackData[]>(
    []
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      topic: "",
      message: "",
    },
  });
  const watchedMessage = watch("message");
  const onFormSubmit = async (data: FeedbackFormData) => {
    try {
      await submitFeedback(data);
      toast.success("Pesan berhasil dikirim");
      fetchFeedback();
      reset();
    } catch (error) {
      toast.error("Gagal mengirim pesan");
    }
  };
  const fetchFeedback = async () => {
    try {
      const data = await fetchFeedbacksByUser();
      setFeedbacks(data.feedbacks);
      const filteredData = data.feedbacks.filter(
        (feedback: FeedbackData) => feedback.status === "Dikirim"
      );
      setFilteredFeedbacks(filteredData);
    } catch (error) {
      toast.error("Gagal memuat feedback");
    }
  };
  const handleStatusChange = (status: string) => {
    setActiveStatus(status);

    const filtered = feedbacks.filter((feedback) => {
      return (
        feedback.status === status ||
        feedback.status.toLowerCase() === status.toLowerCase()
      );
    });
    setFilteredFeedbacks(filtered);
  };
  useEffect(() => {
    fetchFeedback();
  }, []);
  return (
    <Pages className="h-full flex flex-col gap-5 py-5">
      <div className="bg-white p-4 w-full sm:w-[40rem] md:w-[46rem] xl:w-[60rem] mx-auto flex-shrink-0 rounded-lg">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col gap-3"
        >
          <Text size="heading3" weight="semiBold">
            Sampaikan Saran dan Kritik Anda
          </Text>
          <SelectLabel
            children="Topik"
            labelSize="body"
            selectProps={{
              ...register("topic"),
              name: "topic",
              onChange: (e) => setValue("topic", e.target.value),
              getValue: (option) => option.value,
              getLabel: (option) => option.label,
            }}
            selectFormProps={{
              placeholder: "Pilih Topik",
              id: "topic",
              options: options,
              disabled: true,
              hidden: true,
              className: `${
                errors.topic ? "border-red-500" : ""
              } [&>option]:py-2 [&>option]:px-3`,
            }}
          />
          {errors.topic && (
            <Text size="caption" className="text-red-500 mt-1">
              {errors.topic.message}
            </Text>
          )}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="pesan"
              className="text-sm font-semibold text-primary"
            >
              Pesan
            </label>
            <textarea
              {...register("message")}
              id="message"
              name="message"
              rows={4}
              className={`w-full text-xs bg-input  text-secondary p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Tulis pesan Anda di sini... (minimal 10 karakter)"
            />
            <div className="flex justify-between items-center">
              <div>
                {errors.message && (
                  <Text size="caption" className="text-red-500">
                    {errors.message.message}
                  </Text>
                )}
              </div>
              <Text
                size="caption"
                className={`${
                  watchedMessage?.length > 500
                    ? "text-red-500"
                    : watchedMessage?.length > 450
                    ? "text-yellow-600"
                    : "text-gray-500"
                }`}
              >
                {watchedMessage?.length || 0}/500
              </Text>
            </div>
          </div>
          <Button
            type="submit"
            className=" hover:bg-amber-700 hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors py-3 w-full max-w-[20rem] self-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Mengirim...
              </div>
            ) : (
              "Kirim Feedback"
            )}
          </Button>
          <div className="">
            <Text
              size="custom"
              position="center"
              className="text-gray-500 text-xs"
            >
              Feedback Anda sangat berharga untuk meningkatkan layanan kami.
            </Text>
          </div>
        </form>
      </div>
      <div className="w-full sm:w-[40rem] md:w-[46rem] xl:w-[60rem] flex flex-col gap-3 mx-auto flex-1 min-h-0">
        <SecondNavbar
          navigasi={navbarFeedback}
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />
        <div className="flex flex-col gap-3 w-full sm:w-[40rem] md:w-[46rem] xl:w-[60rem] h-full overflow-y-auto scrollbar-hide">
          {filteredFeedbacks.length === 0 && (
            <div className="text-center w-full h-full flex justify-center items-center">
              <Text size="heading2" weight="semiBold">
                Tidak ada feedback yang ditemukan.
              </Text>
            </div>
          )}
          {filteredFeedbacks.map((feedback) => (
            <div
              className="bg-white p-4 w-full flex flex-col gap-2 rounded-lg"
              key={feedback.id}
            >
              <Text size="body" weight="semiBold">
                {feedback.topic}
              </Text>
              <Text size="body" color="secondary" className={`${feedback.status === "Dikirim" ? "text-primary" : feedback.status === "Selesai" ? "text-green-700" : feedback.status === "Dibaca" ? "text-indigo-700" : "text-blue-600"}`}>
               <span className="text-primary">Status : </span>  {feedback.status}
              </Text>
              <Text size="custom" color="secondary" className="text-sm">
                Detail
              </Text>
              <textarea
                value={feedback.message}
                readOnly
                className="bg-input rounded-lg p-2 text-secondary text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </Pages>
  );
}
