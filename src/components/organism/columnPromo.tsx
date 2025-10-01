import type { promoType } from "@/types/promoType";
import type { Column } from "@/components/atoms/table";

export const columnPromoOwner = (handlers: {
  onEditClick: (promo: promoType) => void;
  onHapusClick: (promo: promoType) => void;
  onStatusClick: (promo: promoType) => void;
}): Column<promoType>[] => [
  {
    id: "img_url",
    label: "Foto",
    minWidth: 120,
    format: (value) => (
      <img
        src={value}
        alt="Menu"
        className="w-20 object-cover rounded-sm"
      />
    ),
  },
  {
    id: "name",
    label: "Nama Menu",
    minWidth: 170,
  },
  {
    id: "promo_type",
    label: "Tipe Promo",
    minWidth: 120,
    format: (value) => (
      <span
        style={{
          textTransform: "capitalize",
        }}
      >
        {value === "amount" ? "Potongan Harga" : "Diskon Persen"}
      </span>
    ),
  },
  {
    id: "periode",
    label: "Periode Berlaku",
    minWidth: 170,
  },
  {
    id: "_count.orders",
    label: "Jumlah Klaim",
    minWidth: 150,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 120,
    format: (value) => (
      <span
        style={{
          color: getStatusColor(value),
          textTransform: "capitalize",
        }}
      >
        {value}
      </span>
    ),
  },
  {
    id: "actions",
    label: "Aksi",
    minWidth: 300,
    align: "center",
    renderCell: (row) => (
      <div className="flex gap-2 justify-center items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlers.onEditClick?.(row);
          }}
          className="px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-xs font-medium"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlers.onStatusClick?.(row);
          }}
          className={`px-3 py-1.5 ${
            row.status === "Aktif"
              ? "bg-[#009C1D] hover:bg-[#009C1D]/90"
              : "bg-secondary hover:bg-secondary/90 "
          }  text-white rounded-md transition-colors text-xs font-medium`}
        >
          {row.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlers.onHapusClick?.(row);
          }}
          className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs font-medium"
        >
          Hapus
        </button>
      </div>
    ),
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "aktif":
      return "#f59e0b";
    case "diproses":
      return "#10b981";
    case "selesai":
      return "#6366f1";
    case "tidak aktif":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};
