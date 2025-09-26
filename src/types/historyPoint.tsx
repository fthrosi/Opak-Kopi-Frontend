export type HistoryPoint = {
  id: number;
  order_id: number;
  type: "Pembelanjaan" | "Penukaran";
  created_at: string;
  amount?: number;
  user_id: number;
};
