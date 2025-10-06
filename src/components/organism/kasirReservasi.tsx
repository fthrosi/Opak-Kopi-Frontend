import { Text } from "../atoms/text";
import CardInformation from "./cardInformation";
import ResNew from "../icons/resNew";
import ResNow from "../icons/resNow";
import { fetchAllReservations,fetchReservationById } from "@/api/reservation";
import { useEffect, useState, useMemo } from "react";
import type { Reservasi } from "@/types/reservasi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import SelectLabel from "../molecules/selectLabel";
import { statusReservasi } from "@/const/statusTransaksi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Input } from "../atoms/inputForm";
import SearchIcon from "../icons/search";
import ReusableTable from "../atoms/table";
import { reservasiColumns } from "./columnReservasi";
import { useUIStore } from "../store/useUIStore";
import { ModalConfirmation } from "./modalConfirmation";
import { updateStatusReservasi } from "@/api/reservation";
import { toast } from "sonner";
import Modal from "./modal";
import { Button } from "../atoms/button";
import { checkin } from "@/api/reservation";
import useSocketStore from "../store/socketStore";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function KasirReservasi() {
  const { socket } = useSocketStore();
  const open = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const isTerima = useUIStore(
    (state) => state.activeModal === "terimaReservasi"
  );
  const isTolak = useUIStore((state) => state.activeModal === "tolakReservasi");
  const isDetail = useUIStore(
    (state) => state.activeModal === "detailReservasi"
  );
  const isCheckin = useUIStore(
    (state) => state.activeModal === "checkinReservasi"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservations, setReservations] = useState<Reservasi[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<string>("");
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const [cancellation_reason, setCancellationReason] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [checkinCode, setCheckinCode] = useState<string>("");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservasi | null>(null);
  const [loading, setLoading] = useState(false);
  const handleFetchReservations = async () => {
    setLoading(true);
    try {
      const data = await fetchAllReservations();
      setReservations(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    let filtered = reservations;
    const formattedDate = dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD");
    filtered = filtered.filter((reservation) => {
      return reservation.reservation_time >= formattedDate;
    });
    if (activeStatus) {
      filtered = filtered.filter((reservation) => {
        const match =
          reservation.status.toLowerCase() === activeStatus.toLowerCase();
        return match;
      });
    }

    // ← ADD: Date filtering
    if (selectedDate) {
      const selectedDateString = selectedDate.format("YYYY-MM-DD");
      filtered = filtered.filter((res) => {
        const reservationDateString = res.reservation_time.split("T")[0];
        const match = reservationDateString === selectedDateString;
        return match;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (res) =>
          res.reservation_code.toLowerCase().includes(query) ||
          res.users?.name?.toLowerCase().includes(query) ||
          res.status.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [reservations, activeStatus, selectedDate, searchQuery]);
  const processedReservations = useMemo(() => {
    return filteredOrders.map((reservation) => {
      return {
        ...reservation,
        customer_name: reservation.users?.name || "N/A",
      };
    });
  }, [filteredOrders]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setActiveStatus(status);
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const resStats = useMemo(() => {
    const todayJakarta = dayjs().tz("Asia/Jakarta");
    const todayDateString = todayJakarta.format("YYYY-MM-DD");
    return {
      baru: reservations.filter((order) => order.status === "Dikirim").length,
      jadwal: reservations.filter((order) => {
        if (order.status !== "Diterima") return false;
        const reservationDateString = order.reservation_time.split("T")[0];
        return reservationDateString === todayDateString;
      }).length,
    };
  }, [reservations]);
  useEffect(() => {
    handleFetchReservations();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data: any) => {

      if (data.type === "NEW_RESERVATION") {
        const fetchNewReservation = async () => {
          try {
            const newReservation = await fetchReservationById(data.data.reservationId);
            setReservations((prevReservations) => [newReservation, ...prevReservations]);

          } catch (error) {
            toast.error("Error fetching new reservation: " + (error as Error).toString());
          }
        };

        fetchNewReservation();
      }

      if (data.type === "RESERVATION_STATUS_UPDATE") {
        // Update specific reservation in the list
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === data.data.reservationId
              ? { ...reservation, status: data.data.status }
              : reservation
          )
        );
      }
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  const handleConfirmation = async (cancellation_reason?: string) => {
    setIsSubmitting(true);
    let newStatus = "";
    if (accept) {
      newStatus = "Diterima";
    } else if (reject) {
      newStatus = "Ditolak";
    }
    try {
      await updateStatusReservasi(selectedReservation?.id as number, {
        status: newStatus,
        cancellation_reason,
      });
      handleFetchReservations();
      setSelectedReservation(null);
      setAccept(false);
      setReject(false);
      toast.success("Status reservasi berhasil diperbarui");
      setCancellationReason("");
      setIsSubmitting(false);
      close();
    } catch (error) {
      toast.error("Gagal memperbarui status reservasi");
      close();
      setSelectedReservation(null);
      setAccept(false);
      setReject(false);
      setIsSubmitting(false);
      setCancellationReason("");
    }
  };
  const handleCheckin = async (checkinCode: string) => {
    if (!checkinCode.trim()) {
      toast.error("Kode check-in tidak boleh kosong");
      return;
    }
    setIsSubmitting(true);
    try {
      await checkin(selectedReservation?.id as number, {
        checkinCode: checkinCode,
      });
      handleFetchReservations();
      setSelectedReservation(null);
      setCheckinCode("");
      toast.success("Check-in berhasil");
      setIsSubmitting(false);
      close();
    } catch (error: any) {
      toast.error(error);
      setIsSubmitting(false);
      close();
      setSelectedReservation(null);
      setCheckinCode("");
    }
  };
  const handlemodalDetail = (reservation: Reservasi) => {
    setSelectedReservation(reservation);
    open("detailReservasi");
  };
  const handleModalTerima = (reservation: Reservasi) => {
    setSelectedReservation(reservation);
    setAccept(true);
    setReject(false);
    open("terimaReservasi");
  };
  const handleModalTolak = (reservation: Reservasi) => {
    setSelectedReservation(reservation);
    setAccept(false);
    setReject(true);
    open("tolakReservasi");
  };
  const handleModalCheckin = (reservation: Reservasi) => {
    setSelectedReservation(reservation);
    open("checkinReservasi");
  };
  const handleClose = () => {
    close();
    setSelectedReservation(null);
    setAccept(false);
    setReject(false);
    setCancellationReason("");
  };
  const columns = reservasiColumns({
    onDetailClick: handlemodalDetail,
    onAcceptClick: handleModalTerima,
    onRejectClick: handleModalTolak,
    onCheckinClick: handleModalCheckin,
  });
  return (
    <div className="flex flex-col gap-5 h-full w-full relative">
      <div className="h-full">
        <div className="flex h-full flex-col gap-5">
          <Text size="heading1" weight="semiBold">
            Reservasi
          </Text>
          <div className="flex-shrink-0">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
              <CardInformation
                title="Reservasi Baru"
                count={resStats.baru.toString()}
                variant="white"
                titleClassName="md:text-[clamp(0.8rem,1.8vw,1.2rem)] lg:text-[clamp(0.8rem,1.4vw,1.4rem)] xl:text-[1.2rem]"
                children={<ResNew className="size-4 text-primary mr-2" />}
              />
              <CardInformation
                title="Jadwal Reservasi"
                count={resStats.jadwal.toString()}
                variant="secondary"
                titleClassName="md:text-[clamp(0.8rem,1.8vw,1.2rem)] lg:text-[clamp(0.8rem,1.4vw,1.4rem)] xl:text-[1.2rem] text-white"
                numberClassName="text-white"
                children={<ResNow className="size-4 text-primary mr-2" />}
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <SelectLabel
                children="Status"
                className="flex-1"
                selectFormProps={{
                  placeholder: "Pilih Status",
                  options: statusReservasi,
                  bgColor: "white",
                  borderColor: "white",
                }}
                selectProps={{
                  value: activeStatus,
                  getValue: (option) => option.value,
                  onChange: handleStatusChange,
                }}
              />
              <div className="flex-1 flex flex-col gap-3">
                <Text
                  size="custom"
                  className="text-[0.75rem] sm:text-[clamp(0.75rem,1.3vw,0.813rem)] lg:text-[clamp(0.813rem,1vw,0.875rem)]"
                >
                  Tanggal
                </Text>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    timezone="Asia/Jakarta"
                    value={selectedDate}
                    onChange={handleDateChange}
                    disablePast={true}
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: {
                          width: "100%",
                          borderColor: "green",
                          backgroundColor: "white",
                          "& .MuiSvgIcon-root": {
                            color: "#DE962C",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <Text
                  size="custom"
                  className="text-[0.75rem] sm:text-[clamp(0.75rem,1.3vw,0.813rem)] lg:text-[clamp(0.813rem,1vw,0.875rem)]"
                >
                  Cari
                </Text>
                <div className="flex w-full items-center gap-2 ">
                  <Input
                    placeholder="Cari Pesanan"
                    bgColor="white"
                    borderColor="white"
                    className="w-full "
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <div className="p-3 bg-white shadow-md rounded-md flex justify-center items-center hover:bg-gray-50">
                    <SearchIcon className="size-4 text-primary " />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 w-full">
            <ReusableTable
              columns={columns}
              data={processedReservations}
              loading={loading}
              emptyMessage="Tidak ada reservasi ditemukan"
              //   onRowClick={handleRowClick}
              getRowId={(row) => row.id}
              rowsPerPageOptions={[5, 10, 25]}
              defaultRowsPerPage={10}
              stickyHeader={true}
              maxHeight="100%"
            />
          </div>
        </div>
      </div>
      {isTerima && selectedReservation && (
        <ModalConfirmation
          message="Apakah Anda yakin ingin menerima reservasi ini?"
          onClose={() => close()}
          onConfirm={() => handleConfirmation()}
          title="Terima Reservasi"
        />
      )}
      {isTolak && selectedReservation && (
        <Modal
          position="center"
          paddingWrapper="default"
          size="full"
          padding="default"
          background="white"
          rounded="default"
          modalClassName="max-w-[33rem]"
          children={
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Text size="caption" weight="semiBold">
                  Detail
                </Text>
                <textarea
                  value={cancellation_reason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  maxLength={200}
                  disabled={isSubmitting}
                  placeholder="Masukkan detail penolakan"
                  className="w-full text-secondary h-24 p-2 border-1 border-primary text-sm bg-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
                <Text size="caption" className="text-gray-500 text-right">
                  {cancellation_reason.length}/300 karakter
                </Text>
              </div>
              <div className="flex justify-between w-full gap-2">
                <Button
                  onClick={handleClose}
                  className="bg-secondary text-sm flex-1"
                >
                  Batalkan
                </Button>
                <Button
                  onClick={() => handleConfirmation(cancellation_reason)}
                  className="bg-primary text-sm flex-1"
                  disabled={!cancellation_reason.trim() || isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim"}
                </Button>
              </div>
            </div>
          }
        />
      )}
      {isDetail && selectedReservation && (
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
                  {selectedReservation.reservation_code}
                </Text>
              </div>
              <div className="flex flex-col gap-2 px-4 border-b-1 border-primary pb-3">
                <Text size="body" textColor="secondary">
                  Pemesan
                </Text>
                <div className="flex flex-col gap-1">
                  <Text size="body">
                    Nama : {selectedReservation.users.name}
                  </Text>
                  <Text size="body">
                    Email : {selectedReservation.users.email}
                  </Text>
                  <Text size="body">
                    Telepon : {selectedReservation.users.phone}
                  </Text>
                </div>
              </div>
              <div
                className={`flex flex-col gap-2 px-4  ${
                  selectedReservation.status === "Ditolak"
                    ? "border-b-1 border-primary pb-3"
                    : ""
                }`}
              >
                <Text size="body" textColor="secondary">
                  Data Reservasi
                </Text>
                <div className="flex flex-col gap-1">
                  <Text size="body">
                    Tanggal :{" "}
                    {selectedReservation.reservation_time.split("T")[0]} ,{" "}
                    {selectedReservation.reservation_time
                      .split("T")[1]
                      .slice(0, 5)}
                  </Text>
                  <Text size="body">
                    Jumlah Orang : {selectedReservation.number_of_guest}
                  </Text>
                  <Text size="body">Status : {selectedReservation.status}</Text>
                </div>
              </div>
              {selectedReservation.status === "Ditolak" && (
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
      )}
      {isCheckin && selectedReservation && (
        <Modal
          position="center"
          paddingWrapper="default"
          size="full"
          padding="none"
          background="white"
          rounded="default"
          modalClassName="max-w-[33rem]"
          children={
            <div className="flex flex-col gap-3 py-5 px-4">
              <div className="flex flex-col gap-2 pb-2 border-b-1 border-primary">
                <Text size="body" textColor="secondary">
                  Nomor Reservasi
                </Text>
                <Text size="body" weight="semiBold">
                  {selectedReservation.reservation_code}
                </Text>
              </div>
              <div className="flex flex-col gap-2">
                <Text size="body" textColor="secondary">
                  Kode Checkin
                </Text>
                <Input
                  type="text"
                  id="checkin_code"
                  value={checkinCode}
                  onChange={(e) => setCheckinCode(e.target.value)}
                  placeholder="Masukkan Kode Checkin"
                />
              </div>
              <div className="flex justify-between w-full gap-2">
                <Button
                  onClick={handleClose}
                  className="bg-secondary text-sm flex-1"
                >
                  Batalkan
                </Button>
                <Button
                  onClick={() => handleCheckin(checkinCode)}
                  className="bg-primary text-sm flex-1"
                  disabled={!checkinCode.trim() || isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim"}
                </Button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
