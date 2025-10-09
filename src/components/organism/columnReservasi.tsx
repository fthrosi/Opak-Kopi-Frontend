// reservasiColumns.ts
import type { Reservasi } from "@/types/reservasi";
import type { Column } from "@/components/atoms/table";

export const reservasiColumns = (handlers: {
  onDetailClick: (reservation: Reservasi) => void;
  onAcceptClick?: (reservation: Reservasi) => void;
  onRejectClick?: (reservation: Reservasi) => void;
  onCheckinClick?: (reservation: Reservasi) => void;
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

      return `${hours}:${minutes} ${day}/${month}/${year}`;
    },
  },
  {
    id: "customer_name", // ← FIX: Change to 'users' instead of 'users.name'
    label: "Nama Customer",
    minWidth: 170,
    format: (value) => {
      return value || "N/A";
    },
  },

  {
    id: "number_of_guest",
    label: "Jumlah Orang",
    minWidth: 120,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 120,
    align: "center",
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
    id: "detail",
    label: "Detail",
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
  },
  {
    id: "actions",
    label: "Aksi",
    minWidth: 200,
    align: "center",
    renderCell: (row) => (
      <div className="flex gap-2 justify-center items-center flex-wrap">
        {row.status === "Dikirim" && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlers.onAcceptClick?.(row);
              }}
              className="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-xs font-medium"
            >
              Terima
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlers.onRejectClick?.(row);
              }}
              className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs font-medium"
            >
              Tolak
            </button>
          </>
        )}
        {row.status === "Diterima" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlers.onCheckinClick?.(row);
            }}
            className="px-3 py-1.5 bg-[#DE962C] text-white rounded-md hover:bg-[#C77D2D] transition-colors text-xs font-medium"
          >
            Checkin
          </button>
        )}
        {(row.status === "Selesai" || row.status === "Ditolak") && (
          <span className="text-gray-400 text-xs italic">-</span>
        )}
      </div>
    ),
  }
];

// Helper function
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "dikirim":
      return "#f59e0b";
    case "diterima":
      return "#10b981";
    case "selesai":
      return "#155dfc";
    case "ditolak":
      return "#ef4444";
    case "dibatalkan":
      return "#f97316";
    case "tidak hadir":
      return "#432dd7";
    default:
      return "#6b7280";
  }
};
