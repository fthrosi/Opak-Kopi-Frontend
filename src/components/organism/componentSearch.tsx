import { Text } from "../atoms/text";
import SelectLabel from "../molecules/selectLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Input } from "../atoms/inputForm";
import { Dayjs } from "dayjs";
import React from "react";

type searchComponentProps = {
  statusReservasi: { id: number; name: string; value: string }[];
  activeStatus?: string;
  onStatusChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  onStartDateChange?: (date: Dayjs | null) => void;
  onEndDateChange?: (date: Dayjs | null) => void;
  searchQuery?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  isDateDisabled?: boolean;
  isdisableFuture?: boolean;
};

export default function SearchComponent({
  statusReservasi,
  activeStatus,
  onStatusChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  searchQuery,
  onSearchChange,
  onClick,
  isDateDisabled = false,
  isdisableFuture = true,
}: searchComponentProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      {/* Status */}
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
          onChange: onStatusChange,
        }}
      />
      {/* Search */}
      <div className="flex-1 flex flex-col gap-3">
        <Text size="custom" className="text-sm">
          Cari
        </Text>
        <div className="flex w-full items-center gap-2 ">
          <Input
            placeholder="Cari Pesanan"
            bgColor="white"
            borderColor="white"
            className="w-full"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
      </div>
      {/* Date Range (2 pickers) */}
      {!isDateDisabled && (
        <div className="flex flex-col sm:flex-row flex-1 gap-3 sm:gap-1 items-end">
          <div className="w-full sm:flex-1 flex flex-col gap-3">
            <Text size="custom" className="text-sm">
              Tanggal Mulai
            </Text>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                timezone="Asia/Jakarta"
                value={startDate}
                onChange={onStartDateChange}
                disableFuture={isdisableFuture}
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
            </LocalizationProvider>
          </div>
          <div className="w-full sm:flex-1 flex flex-col gap-3">
            <Text size="custom" className="text-sm">
              Tanggal Selesai
            </Text>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                timezone="Asia/Jakarta"
                value={endDate}
                onChange={onEndDateChange}
                disableFuture={isdisableFuture}
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
            </LocalizationProvider>
          </div>
          <div
            onClick={onClick}
            className="p-3 hover:cursor-pointer bg-white shadow-md rounded-md flex justify-center items-center hover:bg-gray-50"
          >
            <Text size="custom" className="text-sm">
              Kirim
            </Text>
          </div>
        </div>
      )}
    </div>
  );
}
