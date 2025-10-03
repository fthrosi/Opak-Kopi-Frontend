import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Text } from "@/components/atoms/text";
import SelectLabel from "@/components/molecules/selectLabel";
import LaporanPenjualan from "@/components/organism/laporanPenjualan";
import LaporanMenu from "@/components/organism/laporanMenu";
import LaporanReservasi from "@/components/organism/laporanReservasi";
import LaporanPromo from "@/components/organism/laporanPromo";
import type { Dayjs } from "dayjs";
import { toast } from "sonner";
import { useExportLaporan } from "@/hooks/exportLaporan";
import ExportButton from "@/components/organism/exportButton";

export default function LaporanOwnerPage() {
  const [laporanActive, setLaporanActive] = useState("penjualan");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [validatedDates, setValidatedDates] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
    isValid: boolean;
  }>({ startDate: undefined, endDate: undefined, isValid: false });

  const {
    isExporting,
    exportToPDF,
  } = useExportLaporan();

  const validateDates = (): boolean => {
    if (!startDate || !endDate) {
      toast.error("Pilih tanggal mulai dan tanggal selesai");
      return false;
    }

    if (startDate.isAfter(endDate)) {
      toast.error("Tanggal mulai tidak boleh lebih dari tanggal selesai");
      return false;
    }

    if (endDate.isBefore(startDate)) {
      toast.error("Tanggal selesai tidak boleh kurang dari tanggal mulai");
      return false;
    }

    return true;
  };

  const handleSubmitFilter = () => {
    if (!validateDates()) return;
    // ← SET VALIDATED DATES HANYA SETELAH VALIDASI BERHASIL
    setValidatedDates({
      startDate: startDate?.format("YYYY-MM-DD"),
      endDate: endDate?.format("YYYY-MM-DD"),
      isValid: true,
    });
  };

  const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);

    // ← RESET VALIDATED DATES JUGA
    setValidatedDates({
      startDate: undefined,
      endDate: undefined,
      isValid: false,
    });
  };

  const optionLaporan = [
    {
      id: 1,
      name: "Laporan Penjualan",
      value: "penjualan",
    },
    {
      id: 2,
      name: "Laporan Kinerja Menu",
      value: "menu",
    },
    {
      id: 3,
      name: "Laporan Reservasi",
      value: "reservasi",
    },
    {
      id: 4,
      name: "Laporan Kinerja Promo",
      value: "promo",
    },
  ];
  const handleLaporanChange = (value: string) => {
    handleResetFilter();
    setLaporanActive(value);
  };
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken h-full relative">
      <div className="flex flex-col gap-5 h-full">
        <div className="flex-shrink-0 flex justify-between items-center">
          <Text size="heading2" weight="semiBold">
            Laporan Kafe Opak Kopi
          </Text>
          <ExportButton
            isExporting={isExporting}
            onExport={() => exportToPDF(laporanActive, validatedDates)}
          />
        </div>
        <div className="flex-shrink-0 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
          <SelectLabel
            children="Jenis Laporan"
            className="md:w-1/3"
            selectFormProps={{
              id: "laporan",
              options: optionLaporan,
              hidden: true,
              disabled: true,
              bgColor: "white",
              borderColor: "white",
            }}
            selectProps={{
              getValue(option) {
                return option.value.toString();
              },
              value: laporanActive,
              onChange: (e) => handleLaporanChange(e.target.value),
            }}
          />
          <div className="flex flex-col  md:flex-row flex-1 gap-2 items-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="w-full sm:flex-1 flex flex-col gap-3">
                <Text size="custom" className="text-sm">
                  Tanggal Mulai
                </Text>
                <DatePicker
                  format="DD/MM/YYYY"
                  timezone="Asia/Jakarta"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  disableFuture={true}
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: {
                        width: "100%",
                        backgroundColor: "white",
                        "& .MuiSvgIcon-root": {
                          color: "#DE962C",
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className="w-full sm:flex-1 flex flex-col gap-3">
                <Text size="custom" className="text-sm">
                  Tanggal Selesai
                </Text>
                <DatePicker
                  format="DD/MM/YYYY"
                  timezone="Asia/Jakarta"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  disableFuture={true}
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: {
                        width: "100%",
                        backgroundColor: "white",
                        "& .MuiSvgIcon-root": {
                          color: "#DE962C",
                        },
                      },
                    },
                  }}
                />
              </div>
            </LocalizationProvider>
            <div
              onClick={handleSubmitFilter}
              className="p-3 hover:cursor-pointer bg-white shadow-md rounded-md flex justify-center items-center hover:bg-gray-50"
            >
              <Text size="custom" className="text-sm">
                Kirim
              </Text>
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          {laporanActive === "penjualan" && (
            <LaporanPenjualan
              startDate={
                validatedDates.isValid ? validatedDates.startDate : undefined
              }
              endDate={
                validatedDates.isValid ? validatedDates.endDate : undefined
              }
              shouldFetch={true}
            />
          )}
          {laporanActive === "menu" && (
            <LaporanMenu
              startDate={
                validatedDates.isValid ? validatedDates.startDate : undefined
              }
              endDate={
                validatedDates.isValid ? validatedDates.endDate : undefined
              }
              shouldFetch={true}
            />
          )}
          {laporanActive === "reservasi" && (
            <LaporanReservasi
              startDate={
                validatedDates.isValid ? validatedDates.startDate : undefined
              }
              endDate={
                validatedDates.isValid ? validatedDates.endDate : undefined
              }
              shouldFetch={true}
            />
          )}
          {laporanActive === "promo" && (
            <LaporanPromo
              startDate={
                validatedDates.isValid ? validatedDates.startDate : undefined
              }
              endDate={
                validatedDates.isValid ? validatedDates.endDate : undefined
              }
              shouldFetch={true}
            />
          )}
        </div>
      </div>
    </section>
  );
}
