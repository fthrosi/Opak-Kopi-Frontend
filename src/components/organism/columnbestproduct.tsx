import type { Column } from "../atoms/table";
import type {menu } from "@/types/dashboard";
import { formatRupiah } from "@/const/idrCurrency";


export const columnBestProduct = (): Column<menu>[] => [
  {
    id: "img_url",
    label: "Gambar Produk",
    minWidth: 120,
    format: (value) => (
      <img src={value} alt="Menu" className="w-20 h-20 object-cover rounded-sm" />
    ),
  },
  {
    id: "name",
    label: "Nama Produk",
    minWidth: 170,
  },
  {
    id: "totalSold",
    label: "Jumlah Terjual",
    minWidth: 170,
    align: "center",
  },
  {
    id: "totalRevenue",
    label: "Jumlah Pendapatan",
    minWidth: 170,
    format: (jumlah) => {
      return jumlah ? formatRupiah({ value: jumlah }) : "-";
    },
  },
];
