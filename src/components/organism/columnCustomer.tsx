import type { Column } from "@/components/atoms/table";
import type { UserCustomer } from "@/types/user";
import { formatRupiah } from "@/const/idrCurrency";

export const columnCustomerOwner = (handlers: {
  onBlokirClick: (user: UserCustomer) => void;
}): Column<UserCustomer>[] => [
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
    id: "created_at",
    label: "Tanggal Bergabung",
    minWidth: 120,
    format: (value) => value.split("T")[0],
  },
  {
    id: "total_orders",
    label: "jumlah Pesanan",
    align: "center",
    minWidth: 120,
  },
  {
    id: "total_transactions",
    label: "Total Transaksi",
    align: "center",
    minWidth: 120,
    format: (value) => {
      return formatRupiah({ value: value });
    },
  },
  {
    id: "last_order_date",
    label: "Terakhir Pesanan",
    align: "center",
    minWidth: 120,
    format: (value) => (value ? value.split("T")[0] : "-"),
  },
  {
    id: "actions",
    label: "Aksi",
    minWidth: 200,
    align: "center",
    renderCell: (row) => (
      <div className="flex gap-2 justify-center items-center flex-wrap">
        {/* <button
            onClick={(e) => {
              e.stopPropagation();
              handlers.onBlokirClick?.(row);
            }}
            className="px-3 py-1.5  text-white rounded-md hover: transition-colors text-xs font-medium"
          >
            Blokir
          </button> */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlers.onBlokirClick?.(row);
          }}
          className={`px-3 py-1.5  ${
            row.status === "Aktif"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-600 hover:bg-green-600/90"
          } text-white rounded-md  transition-colors text-xs font-medium`}
        >
          {row.status === "Aktif" ? "Blokir" : "Aktifkan"}
        </button>
      </div>
    ),
  },
];
