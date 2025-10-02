import type { Column } from "../atoms/table";
import type { LaporanReservasi } from "@/types/laporan";

export const columnLaporanReservasi = (): Column<LaporanReservasi>[] => [
  {
    id: "tanggal",
    label: "Tanggal",
    minWidth: 120,
    align: "center",
  },
  {
    id: "jumlahReservasi",
    label: "Jumlah Reservasi",
    minWidth: 170,
    align: "center",
  },
  {
    id: "jumlahDiterima",
    label: "Jumlah Diterima",
    minWidth: 170,
    align: "center",
  },
  {
    id: "jumlahDitolak",
    label: "Jumlah Ditolak",
    minWidth: 170,
    align: "center",
  },
  {
    id: "jumlahDibatalkan",
    label: "Jumlah Dibatalkan",
    minWidth: 170,
    align: "center",
  },
  {
    id: "jumlahHadir",
    label: "Jumlah Hadir",
    minWidth: 170,
    align: "center",
  },
  {
    id: "jumlahTidakHadir",
    label: "Jumlah Tidak Hadir",
    minWidth: 170,
    align: "center",
  },
];
