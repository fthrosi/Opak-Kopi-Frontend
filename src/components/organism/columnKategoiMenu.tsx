import type {kategoriMenu} from "@/types/kategoriMenu";
import type { Column } from "@/components/atoms/table";

export const columnKategoriMenuOwner = (handlers: {
  onEditClick: (kategoriMenu: kategoriMenu) => void;
  onHapusClick: (kategoriMenu: kategoriMenu) => void;
}): Column<kategoriMenu>[] => [
  {
    id: "id",
    label: "ID",
    minWidth: 120,
  },
  {
    id: "name",
    label: "Nama Kategori",
    minWidth: 170,
  },
  {
    id: "_count.menus",
    label: "Jumlah Menu",
    align: "center",
    minWidth: 120,
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
