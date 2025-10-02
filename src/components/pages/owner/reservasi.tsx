import { Text } from "@/components/atoms/text";
import SearchComponent from "@/components/organism/componentSearch";
import { statusReservasi } from "@/const/statusTransaksi";
import { useState, useEffect, useMemo } from "react";
import type { Dayjs } from "dayjs";
import { getReservationRange } from "@/api/reservation";
import InformationsCard from "@/components/organism/informationsCard";
import { MenuIcon } from "@/components/icons/menu";
import SelesaiIcon from "@/components/icons/selesai";
import DitolakIcon from "@/components/icons/ditolak";
import ReusableTable from "@/components/atoms/table";
import { columnReservasiOwner } from "@/components/organism/columReservasiOwner";
import type { Reservasi } from "@/types/reservasi";
import { useUIStore } from "@/components/store/useUIStore";
import { toast } from "sonner";
import ModalReservasi from "@/components/organism/modalReservasi";

export default function ReservasiOwnerPage() {
  const open = useUIStore((state) => state.open);
  const isDetail = useUIStore(
    (state) => state.activeModal === "detailReservasiOwner"
  );
  const [activeStatus, setActiveStatus] = useState<string>("");
  const [reservasiData, setReservasiData] = useState<Reservasi[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedReservasi, setSelectedReservasi] = useState<Reservasi | null>(
    null
  );
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setActiveStatus(status);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredReservasi = useMemo(() => {
    let filtered = reservasiData;

    if (activeStatus) {
      filtered = filtered.filter(
        (reservasi) =>
          reservasi.status.toLowerCase() === activeStatus.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (reservasi) =>
          reservasi.reservation_code?.toLowerCase().includes(query) ||
          reservasi.users.name?.toLowerCase().includes(query) ||
          reservasi.status?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [reservasiData, activeStatus, searchQuery]);

  const fetchReservasi = async () => {
    try {
      if ((startDate && !endDate) || (!startDate && endDate)) {
        toast.error("Tanggal mulai dan tanggal selesai harus dipilih bersama");
        return;
      }
      const data = await getReservationRange(
        startDate?.toISOString() || undefined,
        endDate?.toISOString() || undefined
      );
      setReservasiData(data.data);
      setStartDate(null);
      setEndDate(null);
      setActiveStatus("");
      setSearchQuery("");
    } catch (error) {
      toast.error("Gagal memuat reservasi");
    }
  };
  const reservasiStats = useMemo(() => {
    return {
      total: reservasiData?.length,
      completed: reservasiData?.filter(
        (reservasi) => reservasi.status === "Selesai"
      ).length,
      rejected: reservasiData?.filter(
        (reservasi) => reservasi.status === "Ditolak"
      ).length,
    };
  }, [reservasiData]);
  useEffect(() => {
    fetchReservasi();
  }, []);
  const handlemodalDetail = (reservasi: Reservasi) => {
    setSelectedReservasi(reservasi);
    open("detailReservasiOwner");
  };
  const columns = columnReservasiOwner({
    onDetailClick: handlemodalDetail,
  });
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken h-full relative">
      <div className="flex flex-col gap-5 h-full">
        <Text size="heading2" weight="semiBold">
          Riwayat Reservasi
        </Text>
        <SearchComponent
          statusReservasi={statusReservasi}
          activeStatus={activeStatus}
          onStatusChange={(e) => handleStatusChange(e)}
          searchQuery={searchQuery}
          onSearchChange={(e) => handleSearchChange(e)}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => setStartDate(date)}
          onEndDateChange={(date) => setEndDate(date)}
          onClick={fetchReservasi}
          isdisableFuture={false}
        />
        <InformationsCard
          items={[
            {
              title: "Total Reservasi",
              count: reservasiStats.total
                ? reservasiStats.total.toString()
                : "0",
              variant: "white",
              titleClassName: "",
              icon: <MenuIcon className="size-4 text-primary mr-2" />,
            },
            {
              title: "Reservasi Selesai",
              count: reservasiStats?.completed
                ? reservasiStats.completed.toString()
                : "0",
              variant: "secondary",
              titleClassName: "text-white",
              numberClassName: "text-white",
              icon: <SelesaiIcon className="size-4 text-white mr-2" />,
            },
            {
              title: "Reservasi Ditolak",
              count: reservasiStats?.rejected
                ? reservasiStats.rejected.toString()
                : "0",
              variant: "primary",
              titleClassName: "text-secondary",
              numberClassName: "text-secondary",
              icon: <DitolakIcon className="size-4 text-secondary mr-2" />,
            },
          ]}
        />
        <ReusableTable
          columns={columns}
          data={filteredReservasi}
          emptyMessage="Tidak ada reservasi"
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={10}
          maxHeight="100%"
        />
      </div>
      {isDetail && <ModalReservasi selectedReservation={selectedReservasi} />}
    </section>
  );
}
