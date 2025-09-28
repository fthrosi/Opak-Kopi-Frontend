import { Text } from "../atoms/text";
import BaruIcon from "../icons/baru";
import ProsesIcon from "../icons/proses";
import DitolakIcon from "../icons/ditolak";
import { CentangIcon } from "../icons/centang";
import { JamIcon } from "../icons/jam";
import { SendokGarpuIcon } from "../icons/sendokGarpu";
import type { Order } from "@/types/order";
import { formatDateTime } from "@/const/formaterDateTime";
import { formatRupiah } from "@/const/idrCurrency";

type CardPesananKasirProps = {
  order: Order;
  onclick?: () => void;
};

export default function CardPesananKasir({ order, onclick }: CardPesananKasirProps) {
  return (
    <div onClick={onclick} className="flex flex-col hover:cursor-pointer hover:bg-gray-50 bg-white h-[17rem] xl:h-[20rem] w-[16rem] sm:w-[19rem] md:w-[15rem] lg:w-[16rem] 2xl:w-[clamp(16rem,17.5vw,17rem)] p-3 rounded-lg">
      <div className="flex flex-col gap-2 border-b-1 border-primary pb-3">
        <div className="flex justify-between items-center">
          <Text size="caption" textColor="secondary" className="capitalize">
            {order.customer_name}
          </Text>
          <Text size="caption">{order.order_code}</Text>
        </div>
        <div className="flex items-center gap-1">
          <JamIcon className="size-4 text-primary" />
          <Text size="caption">{formatDateTime(order.created_at)}</Text>
        </div>
        <div className="flex items-center gap-1">
          <SendokGarpuIcon className="size-4 text-primary" />
          <Text size="caption">
            Meja{" "}
            {order.table.number.toString().length === 1
              ? `0${order.table.number}`
              : order.table.number}
          </Text>
        </div>
      </div>
      <div className="flex h-full flex-col justify-between pt-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Text size="caption">Pesanan</Text>
          </div>
          {order.order_items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex gap-1">
                <Text size="caption">{item.quantity}x</Text>
                <Text size="caption">{item.name_menu}</Text>
              </div>
              <Text size="caption" className="text-secondary">
                {formatRupiah({
                  value: item.price_at_transaction * item.quantity,
                })}
              </Text>
            </div>
          ))}
          {order.order_items.length > 2 && (
            <div className="flex justify-between items-center">
              <Text size="caption">
                + {order.order_items.length - 2} item lainnya
              </Text>
            </div>
          )}
        </div>
        <div className="">
          <div
            className={`p-2 flex justify-center items-center gap-2 w-[8rem] xl:w-[9rem] ${
              order.status === "Dikirim"
                ? "bg-primary/40"
                : order.status === "Diproses"
                ? "bg-secondary/40"
                : order.status === "Selesai"
                ? "bg-green-100"
                : "bg-red-100"
            } rounded-lg `}
          >
            {order.status === "Dikirim" ? (
              <BaruIcon className="size-4 text-primary" />
            ) : order.status === "Diproses" ? (
              <ProsesIcon className="size-4 text-secondary" />
            ) : order.status === "Selesai" ? (
              <CentangIcon className="size-4 text-green-500" />
            ) : (
              <DitolakIcon className="size-4 text-red-500" />
            )}
            <Text
              size="caption"
              className={`${
                order.status === "Dikirim"
                  ? "text-primary"
                  : order.status === "Diproses"
                  ? "text-secondary"
                  : order.status === "Selesai"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {order.status === "Dikirim"
                ? "Orderan Baru"
                : order.status === "Diproses"
                ? "Diproses"
                : order.status === "Selesai"
                ? "Selesai"
                : "Ditolak"}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
