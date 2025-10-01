import type { MenuProps } from "@/types/menu";
import type { Column } from "@/components/atoms/table";
import { formatRupiah } from "@/const/idrCurrency";

export const columnMenuOwner = (handlers: {
  onEditClick: (menu: MenuProps) => void;
  onHapusClick: (menu: MenuProps) => void;
}): Column<MenuProps>[] => [
  {
    id: "image_url",
    label: "Foto",
    minWidth: 120,
    format: (value) => (
      <img src={value} alt="Menu" className="w-20 h-20 object-cover rounded-sm" />
    ),
  },
  {
    id: "name",
    label: "Nama Menu",
    minWidth: 170,
  },
  {
    id: "current_price",
    label: "Harga Jual",
    minWidth: 120,
    format: (value) => {
      return formatRupiah({ value: value });
    },
  },
  {
    id: "current_cogs",
    label: "Harga Pokok",
    minWidth: 170,
    format: (value) => {
      return formatRupiah({ value: value });
    },
  },
  {
    id: "profit",
    label: "Profit",
    minWidth: 170,
    format: (value) => {
      return formatRupiah({ value: value });
    },
  },
  {
    id: "category.name",
    label: "Kategori",
    minWidth: 150,
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
    minWidth: 200,
    align: "center",
    renderCell: (row) => (
      <div className="flex gap-2 justify-center items-center flex-wrap">
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
    case "tersedia":
      return "#f59e0b";
    case "diproses":
      return "#10b981";
    case "selesai":
      return "#6366f1";
    case "habis":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};
