import { Pages } from "../atoms/page";
import { Text } from "../atoms/text";
import { getOrdersByUser } from "@/api/orders";
import { useEffect, useState } from "react";
import Img from "../atoms/img";
import type { Order } from "@/types/order";
import { formatRupiah } from "@/const/idrCurrency";
import { useUIStore } from "../store/useUIStore";
import { Button } from "../atoms/button";
import ModalHistoryOrder from "./modalHistoryOrder";
import { ModalRating } from "./modalRating";
import type { Rating } from "@/types/rating";
import { submitRating } from "@/api/rating";
import { toast } from "sonner";
import useSocketStore from "../store/socketStore";
export default function HistoryOrder() {
  const {socket} = useSocketStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const isModalRatingOpen = useUIStore(
    (state) => state.activeModal === "rating"
  );
  const isModalDetailOpen = useUIStore(
    (state) => state.activeModal === "ordersDetail"
  );
  const openModal = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const fetchOrders = async () => {
    try {
      const orders = await getOrdersByUser();
      setOrders(orders.data);
    } catch (error) {
      toast.error("Gagal memuat history pesanan");
    }
  };
  const handleSubmitRating = async (ratings: Rating[]) => {
    try {
      await submitRating(ratings);
      toast.success("Rating berhasil dikirim!");
      setSelectedOrder(null);
      await fetchOrders();
      close();
    } catch (error) {
      toast.error("Gagal mengirim rating");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    if (!socket) return;
    
    const handleNotification = (data: any) => {
      
      if (data.type === 'ORDER_STATUS_UPDATE') {
        // Update specific order status in list
        setOrders((prevOrders) => 
          prevOrders.map((order) => 
            order.id === data.data.orderId
              ? { ...order, status: data.data.status }
              : order
          )
        );
      }
    };
    socket.on('notification', handleNotification);
    return () => {
      socket.off('notification', handleNotification);
    };
  }, [socket]);
  return (
    <Pages className={`relative flex flex-col gap-3 items-center ${orders.length === 0 ? "justify-center" : ""} py-5 flex-1`}>
      {orders.length === 0 && (
        <div className="text-center w-full h-full flex justify-center items-center">
          <Text size="heading2" weight="semiBold">
            Tidak ada history pesanan yang ditemukan.
          </Text>
        </div>
      )}
      {orders.map((order) => (
        <div
          className="bg-white p-4 rounded-lg w-full sm:w-[40rem] md:w-[46rem] xl:w-[60rem]"
          key={order.id}
          onClick={() => {
            openModal("ordersDetail");
            setSelectedOrder(order);
          }}
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
            {order.order_items.slice(0, 2).map((item) => (
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
                    <Text
                      size="caption"
                      weight="semiBold"
                      textColor="secondary"
                    >
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
                  {formatRupiah({ value: order.promo_value })}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text size="body" textColor="secondary">
                  Potongan Poin
                </Text>
                <Text textColor="secondary">
                  {formatRupiah({ value: order.point_value_used || 0 })}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text size="body" textColor="primary" weight="semiBold">
                  Total Harga
                </Text>
                <Text textColor="primary" weight="semiBold" size="body">
                  {formatRupiah({ value: order.total_price })}
                </Text>
              </div>
              {order.status === "Selesai" && order.is_rated === false && (
                <Button
                  size="custom"
                  className="text-xs px-2 py-2 w-[10rem] bg-primary text-white self-end"
                  onClick={(event) => {
                    event.stopPropagation();
                    openModal("rating");
                    setSelectedOrder(order);
                  }}
                >
                  Beri Rating
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
      {isModalDetailOpen && <ModalHistoryOrder order={selectedOrder} />}
      {isModalRatingOpen && (
        <ModalRating
          order={selectedOrder}
          onSubmit={handleSubmitRating}
          onClose={() => {
            setSelectedOrder(null);
            close();
          }}
        />
      )}
    </Pages>
  );
}
