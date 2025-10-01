import type { Reservasi } from "@/types/reservasi";
import type { Column } from "@/components/atoms/table";

export const columnReservasiOwner = (handlers: {
  onDetailClick: (reservasi: Reservasi) => void;
}): Column<Reservasi>[] => [
  {
    id: "reservation_code", 
    label: "Kode Reservasi",
    minWidth: 150,
  },
  {
    id: "reservation_time",
    label: "Tanggal Reservasi",
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
    id: "users.name",
    label: "Nama Customer",
    minWidth: 170,
  },
//   {
//     id: "cashier_name",
//     label: "Nama Kasir",
//     minWidth: 170,
//     format: (value) => {
//       return value || "-";
//     },
//   },
  {
    id: "number_of_guest",
    label: "Jumlah Orang",
    minWidth: 150,
    format: (jumlah) => {
      return jumlah ? jumlah.toString() : "-";
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
        className="px-3 py-1.5 bg-secondary  text-white rounded-md hover:bg-[#7d4820] transition-colors text-sm font-medium"
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
    case "diterima":
      return "#10b981";
    case "selesai":
      return "#6366f1";
    case "ditolak":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};
