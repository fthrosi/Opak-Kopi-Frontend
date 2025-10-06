import Modal from "./modal";
import { Button } from "../atoms/button";
import type { Order } from "@/types/order";
import { Text } from "../atoms/text";
import { JamIcon } from "../icons/jam";
import { formatDateTime } from "@/const/formaterDateTime";
import { SendokGarpuIcon } from "../icons/sendokGarpu";
import { formatRupiah } from "@/const/idrCurrency";
import BaruIcon from "../icons/baru";
import ProsesIcon from "../icons/proses";
import DitolakIcon from "../icons/ditolak";
import { CentangIcon } from "../icons/centang";
import { useMemo, useState } from "react";
type modalPesananBaruProps = {
  order: Order | null;
  onUpdateStatus?: () => void;
  onReject?: () => void;
  onPrintReceipt?: (order: Order) => void;
};

export const ModalPesananBaru = ({
  order,
  onUpdateStatus,
  onReject,
  onPrintReceipt,
}: modalPesananBaruProps) => {
  const totalSubTotal = useMemo(() => {
    return order?.order_items.reduce((total, item) => {
      return total + item.subtotal;
    }, 0);
  }, [order?.order_items]);
  useState<string>("");
  const handlePrintReceipt = () => {
    if (!order) return;
    onPrintReceipt?.(order);
  };
  console.log(order);
  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      background="white"
      padding="default"
      rounded="default"
      modalClassName="max-w-sm pt-10 min-h-[25rem] flex flex-col"
    >
      <div className="flex flex-col gap-2 border-b-1 border-primary pb-3">
        <div className="flex justify-between items-center">
          <Text size="caption" textColor="secondary" className="capitalize">
            {order?.customer_name}
          </Text>
          <Text size="caption">{order?.order_code}</Text>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <JamIcon className="size-4 text-primary" />
              <Text size="caption">
                {formatDateTime(order?.created_at || "")}
              </Text>
            </div>
            <div className="flex items-center gap-1">
              <SendokGarpuIcon className="size-4 text-primary" />
              <Text size="caption">
                Meja{" "}
                {order?.table.number.toString().length === 1
                  ? `0${order?.table.number}`
                  : order?.table.number}
              </Text>
            </div>
          </div>
          <div className="">
            <div
              className={`p-2 flex justify-center items-center gap-2 w-[8rem] xl:w-[9rem] ${
                order?.status === "Dikirim"
                  ? "bg-primary/40"
                  : order?.status === "Diproses"
                  ? "bg-secondary/40"
                  : order?.status === "Selesai"
                  ? "bg-green-100"
                  : "bg-red-100"
              } rounded-lg `}
            >
              {order?.status === "Dikirim" ? (
                <BaruIcon className="size-4 text-primary" />
              ) : order?.status === "Diproses" ? (
                <ProsesIcon className="size-4 text-secondary" />
              ) : order?.status === "Selesai" ? (
                <CentangIcon className="size-4 text-green-500" />
              ) : (
                <DitolakIcon className="size-4 text-red-500" />
              )}
              <Text
                size="caption"
                className={`${
                  order?.status === "Dikirim"
                    ? "text-primary"
                    : order?.status === "Diproses"
                    ? "text-secondary"
                    : order?.status === "Selesai"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {order?.status === "Dikirim"
                  ? "Orderan Baru"
                  : order?.status === "Diproses"
                  ? "Diproses"
                  : order?.status === "Selesai"
                  ? "Selesai"
                  : "Ditolak"}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col justify-between flex-1 ${
          order?.status === "Diproses" || order?.status === "Selesai"
            ? "gap-3"
            : ""
        }`}
      >
        <div
          className={`flex  flex-col justify-between pt-2 ${
            order?.status === "Diproses" || order?.status === "Selesai"
              ? "min-h-[10rem] border-b-1 border-primary pb-3"
              : "h-full"
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Text size="caption">Pesanan</Text>
            </div>
            {order?.order_items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-1">
                  <Text size="caption">{item.quantity}x</Text>
                  <Text size="caption">{item.name_menu}</Text>
                </div>
                {order.status !== "Dikirim" && (
                  <Text size="caption" className="text-secondary">
                    {formatRupiah({
                      value: item.price_at_transaction * item.quantity,
                    })}
                  </Text>
                )}
              </div>
            ))}
          </div>
        </div>
        {order?.status === "Dikirim" && (
          <div className="flex flex-col gap-2">
            <div className="flex-col gap-1">
              <Text size="caption" className="mb-1">
                Catatan :
              </Text>
              <textarea
                name="catatan"
                id="catatan"
                className="bg-input border-1 border-input text-sm text-secondary w-full min-h-[5rem] p-2 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                readOnly={true}
                value={order?.note || "Tidak ada catatan"}
              ></textarea>
            </div>
            <div className="flex w-full justify-between gap-2">
              <Button
                className="bg-secondary text-xs sm:text-base flex-1"
                onClick={onReject}
              >
                Tolak Pesanan
              </Button>
              <Button
                className="bg-primary text-xs sm:text-base flex-1"
                onClick={onUpdateStatus}
              >
                Terima Pesanan
              </Button>
            </div>
          </div>
        )}
        {order?.status === "Diproses" && (
          <div className=" flex flex-col gap-2">
            <div className="flex flex-col gap-2 border-b-1 border-primary pb-3">
              <div className="flex justify-between">
                <Text size="caption" textColor="secondary">
                  Sub Total
                </Text>
                <Text size="caption" className="text-secondary">
                  {formatRupiah({
                    value: totalSubTotal || 0,
                  })}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text size="caption" textColor="secondary">
                  Penggunaan Poin
                </Text>
                <Text size="caption" className="text-secondary">
                  {formatRupiah({
                    value: order.point_value_used || 0,
                  })}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text size="caption" textColor="secondary">
                  Potongan Promo
                </Text>
                <Text size="caption" className="text-secondary">
                  {formatRupiah({
                    value: order.promo_value,
                  })}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text size="body">Total</Text>
                <Text size="body" className="text-primary">
                  {formatRupiah({
                    value: order.total_price,
                  })}
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <Text size="caption" textColor="secondary">
                  Metode Pembayaran
                </Text>
                <Text size="caption" className="text-secondary">
                  {order.payment_method}
                </Text>
              </div>
              <div className="flex justify-between gap-2">
                <Button
                className="w-full bg-secondary flex-1"
                onClick={handlePrintReceipt}
              >
                Cetak Struk
              </Button>
                <Button
                  className="w-full bg-green-600 flex-1"
                  onClick={onUpdateStatus}
                >
                  Selesai
                </Button>
              </div>
            </div>
          </div>
        )}
        {order?.status === "Selesai" && (
          <div className=" flex flex-col gap-2">
            <div className="flex flex-col gap-2 border-b-1 border-primary pb-3">
              <div className="flex justify-between">
                <Text size="caption" textColor="secondary">
                  Sub Total
                </Text>
                <Text size="caption" className="text-secondary">
                  {formatRupiah({
                    value: totalSubTotal || 0,
                  })}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text size="caption" textColor="secondary">
                  Penggunaan Poin
                </Text>
                <Text size="caption" className="text-secondary">
                  {formatRupiah({
                    value: order.point_value_used || 0,
                  })}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text size="caption" textColor="secondary">
                  Potongan Promo
                </Text>
                <Text size="caption" className="text-secondary">
                  {formatRupiah({
                    value: order.promo_value,
                  })}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text size="body">Total</Text>
                <Text size="body" className="text-primary">
                  {formatRupiah({
                    value: order.total_price,
                  })}
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Text size="caption" textColor="secondary">
                    Metode Pembayaran
                  </Text>
                  <Text size="caption" className="text-secondary capitalize">
                    {order.payment_method}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text size="caption" textColor="secondary">
                    Poin Didapat
                  </Text>
                  <Text size="caption" className="text-secondary">
                    {order.point_history
                      ?.filter((point) => point.type === "Pendapatan")
                      .reduce((total, point) => total + point.amount, 0) ||
                      0}{" "}
                    Poin
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text size="caption" textColor="secondary">
                    Waktu Selesai
                  </Text>
                  <Text size="caption" className="text-secondary">
                    {formatDateTime(order.updated_at)}
                  </Text>
                </div>
              </div>
              <Button
                className="w-full bg-secondary"
                onClick={handlePrintReceipt}
              >
                Cetak Struk
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
