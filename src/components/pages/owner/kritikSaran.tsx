import InformationsCard from "@/components/organism/informationsCard";
import SecondNavbar from "@/components/molecules/secondNavbar";
import { useState, useEffect,useMemo } from "react";
import { Text } from "@/components/atoms/text";
import { navbarFeedback } from "@/const/constNavbar";
import { fetchAllFeedbacks, updateFeedbackStatus } from "@/api/feedback";
import { type FeedbackData } from "@/types/feedback";
import { Button } from "@/components/atoms/button";
import MessageIcon from "@/components/icons/message";
import CheckIcon from "@/components/icons/check";
import BellIcon from "@/components/icons/bell";
import Modal from "@/components/organism/modal";
import { useUIStore } from "@/components/store/useUIStore";
import { CentangIcon } from "@/components/icons/centang";
import { JamIcon } from "@/components/icons/jam";
import { toast } from "sonner";

export default function KritikSaranOwnerPage() {
  const [activeStatus, setActiveStatus] = useState<string>("Dikirim");
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<FeedbackData[]>(
    []
  );
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(
    null
  );
  const open = useUIStore((state) => state.open);
    const close = useUIStore((state) => state.close);
  const isDetail = useUIStore(
    (state) => state.activeModal === "detailFeedback"
  );

  const getAllFeedbacks = async () => {
    try {
      const data = await fetchAllFeedbacks();
      console.log(data);
      setFeedbacks(data.feedbacks);
      const filteredData = data.feedbacks.filter(
        (feedback: FeedbackData) => feedback.status === "Dikirim"
      );
      setFilteredFeedbacks(filteredData);
    } catch (error) {
      console.error("Error fetching all feedbacks:", error);
    }
  };
  const feedbackStats = useMemo(() => {
    return {
      total: feedbacks?.length,
      new: feedbacks?.filter((feedback) => feedback.status === "Dikirim")
        .length,
      complete: feedbacks?.filter((feedback) => feedback.status === "Selesai").length,
    };
  }, [feedbacks]);
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
  
  const handleUpdateStatus = async (feedback?: FeedbackData) => {
  const targetFeedback = feedback || selectedFeedback; // ← FALLBACK ke selectedFeedback
  if (!targetFeedback) return;
  
  let newStatus = "";
  if(targetFeedback.status === "Dikirim") {
    newStatus = "Dibaca";
  }
  else if(targetFeedback.status === "Dibaca") {
    newStatus = "Diproses";
  }
  else if(targetFeedback.status === "Diproses") {
    newStatus = "Selesai";
  }
  if(targetFeedback.status === "Selesai") return; 
  try {
    await updateFeedbackStatus(targetFeedback.id, newStatus);
    if (newStatus !== "Dibaca") {
      toast.success("Status berhasil diupdate");
      close();
    }
    getAllFeedbacks()
  } catch (error) {
    console.error("Error updating status:", error);
  }
}
  const handleDetail = (feedback: FeedbackData) => {
  setSelectedFeedback(feedback);
  open("detailFeedback");
  
  if(feedback.status === "Dikirim"){
    handleUpdateStatus(feedback); // ← PASS feedback langsung
  }
};
  useEffect(() => {
    getAllFeedbacks();
  }, []);
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken min-h-full relative">
      <div className="flex flex-col gap-5 flex-1">
        <div className="flex-shrink-0">
          <Text size="heading2" weight="semiBold">
            Kritik & Saran
          </Text>
        </div>

        <div className="flex-shrink-0">
          <InformationsCard
            items={[
              {
                title: "Total Masukan",
                count: feedbackStats.total
                  ? feedbackStats.total.toString()
                  : "0",
                variant: "white",
                titleClassName: "",
                icon: <MessageIcon className="size-4 text-primary mr-2" />,
              },
              {
                title: "Masukan Terbaru",
                count: feedbackStats.new
                  ? feedbackStats.new.toString()
                  : "0",
                variant: "secondary",
                titleClassName: "text-white",
                numberClassName: "text-white",
                icon: <BellIcon className="size-4 text-white mr-2" />,
              },
              {
                title: "Masukan Selesai",
                count: feedbackStats?.complete
                  ? feedbackStats.complete.toString()
                  : "0",
                variant: "primary",
                titleClassName: "text-secondary",
                numberClassName: "text-secondary",
                icon: <CheckIcon className="size-4 text-secondary mr-2" />,
              },
            ]}
          />
        </div>

        <div className="flex-shrink-0">
          <SecondNavbar
            className="sm:w-full md:w-full xl:w-full "
            navigasi={navbarFeedback}
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        </div>

        <div className="flex-1 flex flex-col gap-5">
          {filteredFeedbacks.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Text size="body" className="text-gray-500">
                Tidak ada kritik atau saran untuk status ini.
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
              <Text size="body">
                <span className="text-secondary">Dikirim Oleh : </span>
                {feedback.user.name}
              </Text>
              <Text
                size="body"
                className={`${
                  feedback.status === "Dikirim"
                    ? "text-primary"
                    : feedback.status === "Dibaca"
                    ? "text-cyan-400"
                    : feedback.status === "Diproses"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
              >
                <span className="text-secondary">Status : </span>
                {feedback.status}
              </Text>
              <Button
                onClick={() => handleDetail(feedback)}
                size="custom"
                className="bg-secondary py-1 px-1 w-[5rem] text-xs"
              >
                Detail
              </Button>
            </div>
          ))}
        </div>
      </div>
      {isDetail && (
        <Modal
          position="center"
          paddingWrapper="default"
          size="full"
          background="white"
          padding="default"
          rounded="default"
          modalClassName="max-w-[30rem] max-h-[40rem] overflow-y-auto pt-12"
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center border-b-1 border-primary pb-2">
              <Text size="body">{selectedFeedback?.user.name}</Text>
              <div
                className={`${
                  selectedFeedback?.status === "Dikirim"
                    ? "bg-yellow-500"
                    : selectedFeedback?.status === "Dibaca"
                    ? "bg-cyan-400"
                    : selectedFeedback?.status === "Diproses"
                    ? "bg-blue-500"
                    : "bg-green-500"
                } p-2 rounded-full flex items-center`}
              >
                {selectedFeedback?.status === "Dikirim" ? (
                  <MessageIcon className="size-4 text-white" />
                ) : selectedFeedback?.status === "Dibaca" ? (
                  <JamIcon className="size-5 text-cyan-600" />
                ) : selectedFeedback?.status === "Diproses" ? (
                  <JamIcon className="size-5 text-blue-700" />
                ) : (
                  <CentangIcon className="size-5 text-green-700" />
                )}
                <Text size="caption" className="text-white ml-2">
                  {selectedFeedback?.status}
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="body" weight="semiBold" textColor="secondary">
                Subjek
              </Text>
              <Text size="body">{selectedFeedback?.topic}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <Text size="body" weight="semiBold" textColor="secondary">
                  Detail
                </Text>
                <textarea
                  value={selectedFeedback?.message || ""}
                  readOnly={true}
                  className="w-full text-secondary h-24 p-2 border-1 border-primary text-sm bg-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              <Button className={`${selectedFeedback?.status === "Dikirim" ? "bg-primary" : selectedFeedback?.status === "Dibaca" ? "bg-cyan-400" : selectedFeedback?.status === "Diproses" ? "bg-blue-500" : "bg-green-500"} py-1 px-1 w-full text-sm mt-2 text-white`} onClick={() => handleUpdateStatus(selectedFeedback || undefined)}>
                {selectedFeedback?.status === "Dikirim" ? "Proses" : selectedFeedback?.status === "Dibaca" ? "Proses" : selectedFeedback?.status === "Diproses" ? "Selesai" : "Selesai"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
