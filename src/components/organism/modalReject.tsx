import Modal from "./modal";
import SelectLabel from "../molecules/selectLabel";
import { Text } from "../atoms/text";
import { Button } from "../atoms/button";
import { toast } from "sonner";
import { useState } from "react";

type ModalRejectProps = {
  onclose: () => void;
  onSubmit: (reason: string) => Promise<void>;
};
const reasons = [
  {
    id: "Stok Habis",
    name: "Stok Habis",
  },
  {
    id: "Masalah Teknis",
    name: "Masalah Teknis",
  },
];
export const ModalReject = ({ onclose, onSubmit }: ModalRejectProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReason(e.target.value);
  };
  const handleSubmit = async () => {
    if (!selectedReason) {
      toast.error("Silakan pilih alasan penolakan");
      return;
    }
    if (!detail.trim()) {
      toast.error("Silakan masukkan detail penolakan");
      return;
    }
    const reasonWithDetail = `${selectedReason} : ${detail.trim()}`;
    setIsSubmitting(true);
    try {
      await onSubmit(reasonWithDetail);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      background="white"
      padding="default"
      rounded="default"
      modalClassName="max-w-sm px-4 pt-10 min-h-[20rem] flex flex-col"
    >
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-4">
          <SelectLabel
            children="Alasan Penolakan"
            selectFormProps={{
              options: reasons,
              placeholder: "Pilih Alasan",
              hidden: true,
              disabled: true,
            }}
            selectProps={{
              value: selectedReason,
              onChange: handleReasonChange,
            }}
          />
          <div className="flex flex-col gap-2">
            <Text size="caption" weight="semiBold">
              Detail
            </Text>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              maxLength={200}
              disabled={isSubmitting}
              placeholder="Masukkan detail penolakan"
              className="w-full text-secondary h-24 p-2 border-1 border-primary text-sm bg-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            <Text size="caption" className="text-gray-500 text-right">
              {detail.length}/300 karakter
            </Text>
          </div>
        </div>
        <div className="flex justify-between w-full gap-2">
          <Button onClick={onclose} className="bg-secondary text-sm flex-1">
            Batalkan
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary text-sm flex-1"
            disabled={!selectedReason.trim() || !detail.trim() || isSubmitting}
          >
            {isSubmitting ? "Mengirim..." : "Kirim"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
