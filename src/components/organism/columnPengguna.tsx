import type { Column } from "@/components/atoms/table";
import type { UserOwner } from "@/types/user";

export const columnPenggunaOwner = (handlers: {
  onStatusClick: (kategoriMenu: UserOwner) => void;
  onHapusClick: (kategoriMenu: UserOwner) => void;
}): Column<UserOwner>[] => [
  {
    id: "name",
    label: "Nama",
    minWidth: 120,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
  },
  {
    id: "role.name",
    label: "Peran",
    align: "center",
    minWidth: 120,
  },
  {
    id: "status",
    label: "Status",
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
            handlers.onStatusClick?.(row);
          }}
          className={`px-3 py-1.5  ${
            row.status === "Aktif"
              ? "bg-secondary hover:bg-secondary/90"
              : "bg-green-600 hover:bg-green-600/90"
          } text-white rounded-md  transition-colors text-xs font-medium`}
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
