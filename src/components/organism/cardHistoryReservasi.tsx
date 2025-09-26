import { Text } from "../atoms/text";
import type { Reservasi } from "@/types/reservasi";
import { formatDateTime } from "@/const/formaterDateTime";
type cardHistoryReservasiProps = {
  order: Reservasi;
  openModal: (modalName: string) => void;
  setSelectedOrder: (order: Reservasi) => void;
};

export default function CardHistoryReservasi({
  order,
  openModal,
  setSelectedOrder,
}: cardHistoryReservasiProps) {
  return (
    <div
      className="bg-white hover:cursor-pointer p-4 rounded-lg w-full sm:w-[40rem] md:w-[46rem] xl:w-[60rem]"
      onClick={() => {
        openModal("reservasiDetail");
        setSelectedOrder(order);
      }}
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex justify-between items-center py-1 border-b-1 border-primary">
          <Text size="caption" color="secondary">
            Nomor Pesanan : {order?.reservation_code}
          </Text>
          <Text size="caption" color="secondary">
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
      </div>
    </div>
  );
}
