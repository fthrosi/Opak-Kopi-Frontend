import type { Column } from "../atoms/table";
import type { LaporanPenjualan } from "@/types/laporan";
import { formatRupiah } from "@/const/idrCurrency";

export const columnLaporranPenjualan = (): Column<LaporanPenjualan>[] => [
{
    id: "tanggal",
    label: "Tanggal",
    minWidth: 120,
    format: (value) => value.split("T")[0],
},
{
    id: "jumlahTransaksi",
    label: "Jumlah Transaksi",
    minWidth: 170,
    align: "center",
},
{
    id: "pendapatanKotor",
    label: "Pendapatan Kotor",
    minWidth: 170,
    format: (pendapatan) => {
      return pendapatan ? formatRupiah({value : pendapatan}) : "-";
    },
},
{
    id: "diskonPromo",
    label: "Diskon Promo",
    minWidth: 170,
    format: (diskon) => {
      return diskon ? formatRupiah({value : diskon}) : "-";
    },
},
{
    id: "nilaiPoin",
    label: "Nilai Poin",
    minWidth: 170,
    format: (poin) => {
      return poin ? formatRupiah({value : poin}) : "-";
    },
},
{
    id: "hpp",
    label: "HPP",
    minWidth: 170,
    format: (hpp) => {
      return hpp ? formatRupiah({value : hpp}) : "-";
    },
},
{
    id: "pendapatanBersih",
    label: "Pendapatan Bersih",
    minWidth: 170,
    format: (pendapatan) => {
      return pendapatan ? formatRupiah({value : pendapatan}) : "-";
    },
}

]