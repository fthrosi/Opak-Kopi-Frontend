import { Text } from "../atoms/text";
import Modal from "./modal";
import Img from "../atoms/img";
import { formatRupiah } from "@/const/idrCurrency";
import type { Order } from "@/types/order";
import { Button } from "../atoms/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import { useEffect } from "react";

type Props = {
  order: Order | null;
};

export default function ModalHistoryOrder({ order }: Props) {
  const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
  const createdAt = dayjs(order?.created_at);
  const nowString = dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
  const timeNow = nowString + "Z";
  const timeNowDayjs = dayjs(timeNow);
  const diffMinutes = timeNowDayjs.diff(createdAt, "minute");
  const isAvailablePayment = diffMinutes <= 10;
  const navigate = useNavigate();
  const handleOpenPayment = (payment_token: string) => {
    if (payment_token) {
      (window as any).snap.pay(payment_token, {
        onSuccess: function () {
          toast.success("Pembayaran berhasil!");
          navigate("/history-order");
        },
        onError: function () {
          toast.error("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: function () {
          toast.info("Anda menutup popup tanpa menyelesaikan pembayaran");
        },
      });
    }
  };
  useEffect(() => {
    if (!document.querySelector("#midtrans-script")) {
      const script = document.createElement("script");
      script.id = "midtrans-script";
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
      document.body.appendChild(script);
    }
  }, []);
  console.log(isAvailablePayment);
  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      background="white"
      padding="default"
      rounded="default"
      modalClassName="max-w-lg pt-10 max-h-[50rem] overflow-y-auto"
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex justify-between items-center py-1 border-b-1 border-primary">
          <Text size="caption" color="secondary">
            Nomor Pesanan : {order?.order_code}
          </Text>
          <Text size="caption" color="secondary">
            {order?.status}
          </Text>
        </div>
        {order?.order_items.map((item) => (
          <div
            className="w-full justify-between flex items-center gap-2 py-2 border-b-1 border-primary"
            key={item.id}
          >
            <div className="flex gap-3 items-center">
              <div className="size-20 md:size-25 lg:size-30">
                <Img
                  src={item?.menu?.image_url || "/image/produk1.png"}
                  alt={item.name_menu}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <Text size="caption" weight="semiBold" textColor="secondary">
                  {item.name_menu}
                </Text>
                <Text size="caption" textColor="secondary">
                  X{item.quantity}
                </Text>
              </div>
            </div>
            <Text size="caption" weight="semiBold" textColor="secondary">
              {formatRupiah({ value: item.subtotal })}
            </Text>
          </div>
        ))}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between">
            <Text size="body" textColor="secondary">
              Potongan Promo
            </Text>
            <Text textColor="secondary">
              {formatRupiah({ value: order?.promo_value || 0 })}
            </Text>
          </div>
          <div className="flex justify-between">
            <Text size="body" textColor="secondary">
              Potongan Poin
            </Text>
            <Text textColor="secondary">
              {formatRupiah({ value: order?.point_value_used || 0 })}
            </Text>
          </div>
          <div className="flex justify-between">
            <Text size="body" textColor="primary" weight="semiBold">
              Total Harga
            </Text>
            <Text textColor="primary" weight="semiBold" size="body">
              {formatRupiah({ value: order?.total_price || 0 })}
            </Text>
          </div>
          {order?.status === "Menunggu Pembayaran" &&
            order?.payment_token &&
            isAvailablePayment && (
              <Button
                size="custom"
                className="text-xs px-2 py-2 w-[10rem] bg-primary text-white self-end"
                onClick={() => handleOpenPayment(order.payment_token!)}
              >
                Bayar
              </Button>
            )}
        </div>
      </div>
    </Modal>
  );
}
