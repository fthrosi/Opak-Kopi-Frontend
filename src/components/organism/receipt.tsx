import type { Order } from "@/types/order";
import { formatDateTime } from "@/const/formaterDateTime";
import { formatRupiah } from "@/const/idrCurrency";

type ReceiptProps = {
  order: Order;
  className?: string;
};

export const Receipt = ({ order, className = "" }: ReceiptProps) => {
  const totalSubTotal = order.order_items.reduce((total, item) => {
    return total + item.subtotal;
  }, 0);

  return (
    <div className={`receipt-container ${className}`}>
      <div className="receipt-content bg-white p-6 max-w-sm mx-auto">
        {/* ← HEADER */}
        <div className="text-center mb-4 border-b pb-4">
          <h2 className="text-xl font-bold mb-2">OPAK KOPI</h2>
          <p className="text-sm text-gray-600 mb-1">Jl. Opak Raya, Jirak, Bokoharjo</p>
          <p className="text-sm text-gray-600">Telp: 0812-2646-5007</p>
        </div>

        {/* ← ORDER INFO */}
        <div className="mb-4 text-sm space-y-1">
          <div className="flex justify-between">
            <span>Order:</span>
            <span className="font-medium">{order.order_code}</span>
          </div>
          <div className="flex justify-between">
            <span>Tanggal:</span>
            <span>{formatDateTime(order.created_at)}</span>
          </div>
          <div className="flex justify-between">
            <span>Kasir:</span>
            <span>{order.cashier_name || "Admin"}</span>
          </div>
          <div className="flex justify-between">
            <span>Customer:</span>
            <span>{order.customer_name}</span>
          </div>
          <div className="flex justify-between">
            <span>Meja:</span>
            <span>
              {order.table.number.toString().length === 1
                ? `0${order.table.number}`
                : order.table.number}
            </span>
          </div>
        </div>

        {/* ← ITEMS */}
        <div className="border-t border-b py-3 mb-4">
          <p className="font-semibold mb-2 text-sm">ITEMS:</p>
          {order.order_items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <div className="flex-1 pr-2">
                <div className="font-medium">{item.quantity}x {item.name_menu}</div>
                <div className="text-gray-600 text-xs">
                  @{formatRupiah({ value: item.price_at_transaction })}
                </div>
              </div>
              <div className="text-right font-medium">
                {formatRupiah({ value: item.price_at_transaction * item.quantity })}
              </div>
            </div>
          ))}
        </div>

        {/* ← TOTALS */}
        <div className="text-sm space-y-1 mb-4">
          <div className="flex justify-between">
            <span>Sub Total:</span>
            <span>{formatRupiah({ value: totalSubTotal })}</span>
          </div>
          {order.point_value_used > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Penggunaan Poin:</span>
              <span>-{formatRupiah({ value: order.point_value_used })}</span>
            </div>
          )}
          {order.promo_value > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Potongan Promo:</span>
              <span>-{formatRupiah({ value: order.promo_value })}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
            <span>TOTAL:</span>
            <span>{formatRupiah({ value: order.total_price })}</span>
          </div>
        </div>

        {/* ← PAYMENT INFO */}
        <div className="text-sm space-y-1 mb-4">
          <div className="flex justify-between">
            <span>Pembayaran:</span>
            <span className="capitalize font-medium">{order.payment_method}</span>
          </div>
          <div className="flex justify-between">
            <span>Poin Didapat:</span>
            <span className="font-medium">
              {order.point_history?.filter(poin => poin.type === "Pendapatan").reduce((total, poin) => total + poin.amount, 0) || 0} Poin
            </span>
          </div>
        </div>

        {/* ← FOOTER */}
        <div className="text-center text-xs text-gray-600 border-t pt-3">
          <div className="mb-1">Terima kasih atas kunjungan Anda!</div>
          <div className="mb-2">Selamat menikmati pesanan Anda</div>
          <div className="text-xs">{formatDateTime(order.updated_at)}</div>
        </div>
      </div>
    </div>
  );
};