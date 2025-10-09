import Modal from "./modal";
import type { Reservasi } from "@/types/reservasi";
import { Text } from "../atoms/text";
import { formatDateTime } from "@/const/formaterDateTime";
import { Button } from "../atoms/button";

type ModalDetailReservasiProps = {
  order: Reservasi;
  onOpen: () => void;
};

export const ModalDetailReservasi = ({
  order,
  onOpen,
}: ModalDetailReservasiProps) => {
  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      background="white"
      padding="default"
      rounded="default"
      modalClassName="max-w-[40rem] pt-8"
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex justify-between items-center py-1 border-b-1 border-primary">
          <Text size="caption" color="secondary">
            Nomor Pesanan : {order?.reservation_code}
          </Text>
          <Text size="caption" className={`${order?.status === "Dikirim" ? "text-primary" : order?.status === "Diterima" ? "text-green-700" : order?.status === "Ditolak" ? "text-red-500" : order?.status === "Dibatalkan" ? "text-orange-500": order?.status === "Tidak Hadir" ? "text-indigo-700" : "text-blue-600"}`}>
            {order?.status}
          </Text>
        </div>
        <div className="flex justify-between pt-3">
          <Text size="body" textColor="secondary">
            Tanggal Pemesanan
          </Text>
          <Text size="body" textColor="secondary">
            {formatDateTime(order?.created_at)}
          </Text>
        </div>
        <div className="flex justify-between pt-3">
          <Text size="body" textColor="secondary">
            Tanggal Reservasi
          </Text>
          <Text size="body" textColor="secondary">
            {formatDateTime(order?.reservation_time)}
          </Text>
        </div>
        <div className="flex justify-between pt-3">
          <Text size="body" textColor="secondary">
            Nama Pelanggan
          </Text>
          <Text size="body" textColor="secondary">
            {order?.users?.name}
          </Text>
        </div>
        <div className="flex justify-between pt-3">
          <Text size="body" textColor="secondary">
            Kode Checkin
          </Text>
          <Text size="body" textColor="secondary">
            {order?.status === "Diterima" ? order?.checkin_code || "-" : "-"}
          </Text>
        </div>
        <Text size="caption" textColor="secondary" className="pt-3">
          NB : Kamu belum check-in, ya! Jangan lupa mampir ke kasir dulu.Biar
          reservasimu aman, datang maksimal 10 menit setelah jam yang
          ditentukan, ya~
        </Text>
        {order?.status === "Ditolak" && (
          <div className="flex flex-col gap-1 ">
            <Text size="caption" className="mb-1">
              Alasan Ditolak
            </Text>
            <textarea
              name="catatan"
              id="catatan"
              className="bg-input border-1 border-input text-sm text-secondary w-full min-h-[5rem] p-2 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
              readOnly={true}
              value={order?.cancellation_reason || "Tidak ada alasan"}
            ></textarea>
          </div>
        )}
        {(order?.status === "Diterima" ||
          (order?.status === "Dikirim" )) && (
            <Button className="bg-red-600 hover:bg-red-500 hover:cursor-pointer mt-6 max-w-[10rem] self-end" onClick={onOpen}>
              Batalkan Reservasi
            </Button>
          )}
      </div>
    </Modal>
  );
};
