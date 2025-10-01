import Modal from "./modal";
import { Text } from "../atoms/text";
import type { Reservasi } from "@/types/reservasi";

type modalReservasiProps = {
  selectedReservation: Reservasi | null;
};

export default function ModalReservasi({
  selectedReservation,
}: modalReservasiProps) {
  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      padding="none"
      background="white"
      rounded="default"
      modalClassName="max-w-[33rem]"
      children={
        <div className="flex flex-col gap-3 py-5">
          <div className="flex flex-col gap-2 px-4 pb-2 border-b-1 border-primary">
            <Text size="body" textColor="secondary">
              Nomor Reservasi
            </Text>
            <Text size="body" weight="semiBold">
              {selectedReservation?.reservation_code}
            </Text>
          </div>
          <div className="flex flex-col gap-2 px-4 border-b-1 border-primary pb-3">
            <Text size="body" textColor="secondary">
              Pemesan
            </Text>
            <div className="flex flex-col gap-1">
              <Text size="body">Nama : {selectedReservation?.users.name}</Text>
              <Text size="body">
                Email : {selectedReservation?.users.email}
              </Text>
              <Text size="body">
                Telepon : {selectedReservation?.users.phone}
              </Text>
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 px-4  ${
              selectedReservation?.status === "Ditolak"
                ? "border-b-1 border-primary pb-3"
                : ""
            }`}
          >
            <Text size="body" textColor="secondary">
              Data Reservasi
            </Text>
            <div className="flex flex-col gap-1">
              <Text size="body">
                Tanggal : {selectedReservation?.reservation_time.split("T")[0]}{" "}
                ,{" "}
                {selectedReservation?.reservation_time
                  .split("T")[1]
                  .slice(0, 5)}
              </Text>
              <Text size="body">
                Jumlah Orang : {selectedReservation?.number_of_guest}
              </Text>
              <Text
                size="body"
                className={`${
                  selectedReservation?.status === "Ditolak"
                    ? "text-red-500"
                    : selectedReservation?.status === "Diterima"
                    ? "text-green-500"
                    : selectedReservation?.status === "Dibatalkan"
                    ? "text-gray-600"
                    : selectedReservation?.status === "Dikirim"
                    ? "text-primary"
                    : "text-blue-800"
                }`}
              >
                <span className="text-primary">
                    Status :
                </span>{" "}
                {selectedReservation?.status}
              </Text>
            </div>
          </div>
          {selectedReservation?.status === "Ditolak" && (
            <div className="flex flex-col  gap-2 px-4">
              <Text size="body" textColor="secondary">
                Alasan Penolakan
              </Text>
              <textarea
                value={selectedReservation.cancellation_reason || ""}
                readOnly={true}
                className="w-full text-secondary h-24 p-2 border-1 border-primary text-sm bg-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
          )}
        </div>
      }
    />
  );
}
