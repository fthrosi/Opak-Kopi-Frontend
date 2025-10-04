import { Pages } from "../atoms/page";
import SecondNavbar from "../molecules/secondNavbar";
import { navbarHistoryReservasi } from "@/const/constNavbar";
import { fetchByUser } from "@/api/reservation";
import { useEffect, useState } from "react";
import type { Reservasi } from "@/types/reservasi";
import CardHistoryReservasi from "./cardHistoryReservasi";
import { useUIStore } from "../store/useUIStore";
import { ModalDetailReservasi } from "./modalDetailReservasi";
import { ModalConfirmation } from "./modalConfirmation";
import { updateReservationStatus } from "@/api/reservation";
import { toast } from "sonner";
import { Text } from "../atoms/text";
import useSocketStore from "../store/socketStore";
export default function HistoryReservasi() {
  const { socket } = useSocketStore();
  const [reservations, setReservations] = useState<Reservasi[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservasi[]>(
    []
  );
  const [activeStatus, setActiveStatus] = useState<string>("Dikirim");
  const [selectedOrder, setSelectedOrder] = useState<Reservasi | null>(null);
  const openModal = useUIStore((state) => state.open);
  const isopen = useUIStore((state) => state.activeModal === "reservasiDetail");
  const isModalConfirmation = useUIStore(
    (state) => state.activeModal === "cancelReservasi"
  );
  const close = useUIStore((state) => state.close);
  const fetchData = async () => {
    try {
      const data = await fetchByUser();
      setReservations(data);
      const filteredData = data.filter(
        (reservation: Reservasi) =>
          reservation.status === "Dikirim" ||
          reservation.status.toLowerCase() === "dikirim" ||
          reservation.status === "waiting"
      );
      setFilteredReservations(filteredData);
    } catch (error) {
      toast.error("Gagal memuat history reservasi");
    }
  };
  const handleCancelReservation = async () => {
    try {
      await updateReservationStatus(selectedOrder?.id as number, "Dibatalkan");
      fetchData();
      toast.success("Reservasi berhasil dibatalkan");
      close();
    } catch (error) {
      toast.error("Gagal membatalkan reservasi");
      close();
    }
  };
  const handleStatusChange = (status: string) => {
    setActiveStatus(status);

    const filtered = reservations.filter((reservation) => {
      return (
        reservation.status === status ||
        reservation.status.toLowerCase() === status.toLowerCase()
      );
    });
    setFilteredReservations(filtered);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!socket) {
    return;
  }
    
    const handleNotification = (data: any) => {
      
      if (data.type === 'RESERVATION_STATUS_UPDATE') {
        // Update specific reservation status in list
        setReservations((prevReservations) => 
          prevReservations.map((reservation) => 
            reservation.id === data.data.reservationId
              ? { ...reservation, status: data.data.status }
              : reservation
          )
        );
      }
    };
    socket.on('notification', handleNotification);
    return () => {
      socket.off('notification', handleNotification);
    };
  }, [socket]);
  return (
    <Pages className="relative py-5 flex flex-col items-center gap-5 h-full">
      <SecondNavbar
        navigasi={navbarHistoryReservasi}
        activeStatus={activeStatus}
        onStatusChange={handleStatusChange}
      />
      <div className="flex flex-col items-center w-full gap-7 h-full overflow-y-auto scrollbar-hide">
        {filteredReservations.length === 0 && (
          <div className="text-center w-full h-full flex justify-center items-center">
            <Text size="heading2" weight="semiBold">Tidak ada reservasi yang ditemukan.</Text>
          </div>
        )}
        {filteredReservations.map((order) => (
          <CardHistoryReservasi
            key={order.id}
            order={order}
            openModal={() => openModal("reservasiDetail")}
            setSelectedOrder={setSelectedOrder}
          />
        ))}
      </div>
      {isopen && selectedOrder && (
        <ModalDetailReservasi
          order={selectedOrder}
          onOpen={() => openModal("cancelReservasi")}
        />
      )}
      {isModalConfirmation && (
        <ModalConfirmation
          title="Batalkan Reservasi"
          message="Apakah Anda yakin ingin membatalkan reservasi ini?"
          onClose={close}
          onConfirm={() => {
            handleCancelReservation();
          }}
        />
      )}
    </Pages>
  );
}
