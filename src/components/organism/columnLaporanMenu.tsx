import type { Column } from "../atoms/table";
import type { LaporanMenu } from "@/types/laporan";
import { formatRupiah } from "@/const/idrCurrency";

export const columnLaporanMenu = (): Column<LaporanMenu>[] => [
{
    id: "namaMenu",
    label: "Nama Menu",
    minWidth: 120,
},
{
    id: "kategori",
    label: "Kategori",
    minWidth: 170,
},
{
    id: "jumlahTerjual",
    label: "Jumlah Terjual",
    minWidth: 170,
    align: "center",
},
{
    id: "pendapatanKotor",
    label: "Total Pendapatan Kotor",
    minWidth: 170,
    format: (pendapatan) => {
      return pendapatan ? formatRupiah({value : pendapatan}) : "-";
    },
},
{
    id: "hpp",
    label: "Total HPP",
    minWidth: 170,
    format: (hpp) => {
      return hpp ? formatRupiah({value : hpp}) : "-";
    },
},
{
    id: "profitKotor",
    label: "Total Profit Kotor",
    minWidth: 170,
    format: (pendapatan) => {
      return pendapatan ? formatRupiah({value : pendapatan}) : "-";
    },
}

]