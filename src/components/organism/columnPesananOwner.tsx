import type { Order } from "@/types/order";
import type { Column } from "@/components/atoms/table";
import { formatRupiah } from "@/const/idrCurrency";

export const columnPesananOwner = (handlers: {
  onDetailClick: (order: Order) => void;
}): Column<Order>[] => [
  {
    id: "order_code", 
    label: "Kode Pesanan",
    minWidth: 150,
  },
  {
    id: "created_at",
    label: "Tanggal Pesanan",
    minWidth: 120,
    format: (value) => {
      const date = new Date(value);
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const day = date.getUTCDate().toString().padStart(2, "0");
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const year = date.getUTCFullYear();

      return `${hours}:${minutes}, ${day}/${month}/${year}`;
    },
  },
  {
    id: "customer_name",
    label: "Nama Customer",
    minWidth: 170,
  },
  {
    id: "cashier_name",
    label: "Nama Kasir",
    minWidth: 170,
    format: (value) => {
      return value || "-";
    },
  },
  {
    id: "total_price",
    label: "Total Harga",
    minWidth: 150,
    format: (harga) => {
      return harga ? formatRupiah({value : harga}) : "-";
    },
  },
  {
    id: "status",
    label: "Status",
    minWidth: 120,
    format: (value) => (
      <span
        style={{
          color: getStatusColor(value),
        }}
      >
        {value}
      </span>
    ),
  },
  {
    id: "actions",
    label: "Aksi",
    minWidth: 100,
    align: "center",
    renderCell: (row) => (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlers.onDetailClick(row);
        }}
        className="px-3 py-1.5 bg-[#9B5A26] text-white rounded-md hover:bg-[#7d4820] transition-colors text-sm font-medium"
      >
        Detail
      </button>
    ),
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "dikirim":
      return "#f59e0b";
    case "diproses":
      return "#10b981";
    case "selesai":
      return "#6366f1";
    case "ditolak":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};
