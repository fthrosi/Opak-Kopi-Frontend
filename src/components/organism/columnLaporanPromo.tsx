import type { Column } from "../atoms/table";
import type { LaporanPromo } from "@/types/laporan";
import { formatPeriode } from "@/const/formaterDateTime";
import { formatRupiah } from "@/const/idrCurrency";

export const columnLaporanPromo = (): Column<LaporanPromo>[] => [
  {
    id: "namaPromo",
    label: "Nama Promo",
    minWidth: 120,
  },
  {
    id: "periode",
    label: "Periode",
    minWidth: 170,
    format: (periode) => {
      return periode ? formatPeriode(periode) : "-";
    },
  },
  {
    id: "jumlahDigunakan",
    label: "Jumlah Diklaim",
    minWidth: 170,
    align: "center",
  },
  {
    id: "totalDiskon",
    label: "Total Nilai Diskon",
    minWidth: 170,
    format: (diskon) => {
      return diskon ? formatRupiah({ value: diskon }) : "-";
    },
  },
];
