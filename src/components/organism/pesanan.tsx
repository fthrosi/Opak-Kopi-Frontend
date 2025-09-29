import ButtonText from "../molecules/buttonText";
import AddIcon from "../icons/add";
import { MenuIcon } from "../icons/menu";
import ProsesIcon from "../icons/proses";
import SelesaiIcon from "../icons/selesai";
import DitolakIcon from "../icons/ditolak";
import CardInformation from "./cardInformation";
import { getDailyOrders } from "@/api/orders";
import { useEffect, useMemo, useState } from "react";
import { secNavPesanan } from "@/const/constNavbar";
import SecondNavbar from "../molecules/secondNavbar";
import { Input } from "../atoms/inputForm";
import SearchIcon from "../icons/search";
import type { Order } from "@/types/order";
import CardPesananKasir from "./cardPesananKasir";
import { ModalPesananBaru } from "./modalPesananBaru";
import { useUIStore } from "../store/useUIStore";
import { updateOrderStatus } from "@/api/orders";
import { ModalReject } from "./modalReject";
import { toast } from "sonner";
import { Receipt } from "./receipt";
import { Button } from "../atoms/button";

export default function Pesanan() {
  const open = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const activeModal = useUIStore(
    (state) => state.activeModal === "detailPesanan"
  );
  const isRejectOrderModal = useUIStore(
    (state) => state.activeModal === "RejectOrder"
  );
  const isPrint = useUIStore((state) => state.activeModal === "printReceipt");
  const handleClickCard = (order: Order) => {
    open("detailPesanan");
    setSelectedOrder(order);
  };
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>("Dikirim");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchDailyOrders = async () => {
    try {
      setLoading(true);
      const data = await getDailyOrders();
      setOrders(data.data || []);
    } finally {
      setLoading(false);
    }
  };
  const filteredOrders = useMemo(() => {
    let filtered = orders;

    filtered = filtered.filter(
      (order) => order.status.toLowerCase() === activeStatus.toLowerCase()
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.order_code.toLowerCase().includes(query) ||
          order.customer_name?.toLowerCase().includes(query) ||
          order.status.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [orders, activeStatus, searchQuery]);

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const orderStats = useMemo(() => {
    return {
      baru: orders.filter((order) => order.status === "Dikirim").length,
      diproses: orders.filter((order) => order.status === "Diproses").length,
      selesai: orders.filter((order) => order.status === "Selesai").length,
      ditolak: orders.filter((order) => order.status === "Ditolak").length,
    };
  }, [orders]);
  const handleUpdateStatus = async (
    selectedOrder: Order,
    payment_method?: string
  ) => {
    try {
      let newStatus = "";
      if (selectedOrder.status === "Dikirim") {
        newStatus = "Diproses";
      } else if (selectedOrder.status === "Diproses") {
        newStatus = "Selesai";
      }
      await updateOrderStatus(selectedOrder.id, {
        status: newStatus,
        payment_method: payment_method,
      });
      toast.success("Status order berhasil diperbarui");
      setSelectedOrder(null);
      await fetchDailyOrders();
      close();
    } catch (error) {
      toast.error("Gagal memperbarui status order");
    }
  };
  const handleTolakOrder = async (selectedOrder: Order, reason: string) => {
    try {
      await updateOrderStatus(selectedOrder.id, {
        status: "Ditolak",
        cancellation_reason: reason,
      });
      toast.success("Pesanan berhasil ditolak");
      setSelectedOrder(null);
      await fetchDailyOrders();
      close();
    } catch (error) {
      toast.error("Gagal menolak pesanan");
    }
  };
  const handlePrintReceipt = (order: Order) => {
    setSelectedOrder(order);
    open("printReceipt");
  };
  useEffect(() => {
    fetchDailyOrders();
  }, []);
  return (
    <div className="flex flex-col gap-5 h-full relative">
      <div className="lg:flex-shrink-0">
        <ButtonText
          text="Pesanan"
          buttonClassName="bg-white"
          buttonAsChild={true}
          textSize="heading1"
          textWeight="semiBold"
          className="w-full justify-between items-center"
          position="row"
          button={true}
          children={
            <a href="/kasir/tambah-pesanan" className="flex gap-1 text-primary hover:text-white text-[0.7rem] hover:cursor-pointer">
              <AddIcon className="size-3 text-primary hover:text-white" />
              Tambah Pesanan
            </a>
          }
        />
      </div>
      <div className="lg:flex-shrink-0">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2">
          <CardInformation
            title="Pesanan Baru"
            count={orderStats.baru.toString()}
            variant="white"
            titleClassName="md:text-[clamp(0.8rem,1.8vw,1.2rem)] lg:text-[clamp(0.8rem,1.4vw,1.4rem)] xl:text-[1.2rem] "
            children={<MenuIcon className="size-4 text-primary mr-2" />}
          />
          <CardInformation
            title="Pesanan Diproses"
            count={orderStats.diproses.toString()}
            variant="input"
            titleClassName="md:text-[clamp(0.8rem,1.8vw,1.2rem)] lg:text-[clamp(0.8rem,1.4vw,1.4rem)] xl:text-[1.2rem] text-secondary"
            numberClassName="text-secondary"
            children={<ProsesIcon className="size-5 text-secondary mr-2" />}
          />
          <CardInformation
            title="Pesanan Selesai"
            count={orderStats.selesai.toString()}
            variant="secondary"
            titleClassName="md:text-[clamp(0.8rem,1.8vw,1.2rem)] lg:text-[clamp(0.8rem,1.4vw,1.4rem)] xl:text-[1.2rem] text-white"
            numberClassName="text-white"
            children={<SelesaiIcon className="size-4 text-white mr-2" />}
          />
          <CardInformation
            title="Pesanan Ditolak"
            count={orderStats.ditolak.toString()}
            variant="primary"
            titleClassName="md:text-[clamp(0.8rem,1.8vw,1.2rem)] lg:text-[clamp(0.8rem,1.4vw,1.4rem)] xl:text-[1.2rem] text-secondary"
            numberClassName="text-secondary"
            children={<DitolakIcon className="size-4 text-secondary mr-2" />}
          />
        </div>
      </div>
      <div className="lg:flex-shrink-0">
        <div className="flex flex-col-reverse lg:flex-row xl:items-center gap-3">
          <div className="">
            <SecondNavbar
              className="sm:w-full md:w-full lg:w-[26rem] xl:w-[35rem] 2xl:w-[45rem]"
              navigasi={secNavPesanan}
              activeStatus={activeStatus}
              onStatusChange={handleStatusChange}
            />
          </div>
          <div className="flex justify-end w-full">
            <div className="flex w-full items-center justify-end gap-2">
              <Input
                placeholder="Cari Pesanan"
                bgColor="white"
                borderColor="white"
                className="w-full sm:w-[20rem]"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="p-3 bg-white shadow-md rounded-md flex justify-center items-center hover:bg-gray-50">
                <SearchIcon className="size-4 text-primary " />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex p-2 overflow-y-auto scrollbar-hide">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-center text-primary">Memuat pesanan...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 gap-y-7 w-full justify-items-center lg:justify-items-start">
            {filteredOrders.map((order) => (
              <CardPesananKasir
                order={order}
                key={order.id}
                onclick={() => handleClickCard(order)}
              />
            ))}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-center text-primary text-[1.5rem]">
              Tidak ada pesanan ditemukan.
            </p>
          </div>
        )}
      </div>
      {activeModal && (
        <ModalPesananBaru
          order={selectedOrder}
          onUpdateStatus={() => handleUpdateStatus(selectedOrder!)}
          onReject={() => open("RejectOrder")}
          onPayment={(method: string) =>
            handleUpdateStatus(selectedOrder!, method)
          }
          onPrintReceipt={handlePrintReceipt}
        />
      )}
      {isRejectOrderModal && (
        <ModalReject
          onclose={() => close()}
          onSubmit={(reason: string) =>
            handleTolakOrder(selectedOrder!, reason)
          }
        />
      )}
      {isPrint && selectedOrder && (
        <div className="fixed inset-0 z-50 print-hidden">
          {" "}
          {/* ← TAMBAH print-hidden class */}
          <div className="fixed inset-0 bg-black/50" onClick={() => close()}>
            <div className="flex items-center justify-center min-h-screen p-4">
              <div
                className="bg-white rounded-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()} // ← TAMBAH ini biar modal gak close
              >
                <Receipt order={selectedOrder} />
                <div className="p-4 border-t flex gap-2 print-hidden">
                  {" "}
                  {/* ← TAMBAH print-hidden ke buttons */}
                  <Button
                    className="flex-1 bg-secondary text-white"
                    onClick={() => close()}
                  >
                    Tutup
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-white"
                    onClick={() => window.print()}
                  >
                    Cetak
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
