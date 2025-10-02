import { Text } from "@/components/atoms/text";
import SearchComponent from "@/components/organism/componentSearch";
import { statusOrder } from "@/const/statusTransaksi";
import { useState, useEffect, useMemo } from "react";
import type { Dayjs } from "dayjs";
import { getOrderRange } from "@/api/orders";
import InformationsCard from "@/components/organism/informationsCard";
import { MenuIcon } from "@/components/icons/menu";
import SelesaiIcon from "@/components/icons/selesai";
import DitolakIcon from "@/components/icons/ditolak";
import ReusableTable from "@/components/atoms/table";
import { columnPesananOwner } from "@/components/organism/columnPesananOwner";
import type { Order } from "@/types/order";
import { useUIStore } from "@/components/store/useUIStore";
import { toast } from "sonner";
import { ModalPesananOwner } from "@/components/organism/modalPesananOwner";

export default function PesananOwnerPage() {
  const open = useUIStore((state) => state.open);
  const isDetail = useUIStore((state) => state.activeModal === "detailPesananOwner");
  const [activeStatus, setActiveStatus] = useState<string>("");
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setActiveStatus(status);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredOrders = useMemo(() => {
    let filtered = orderData;

    if (activeStatus) {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === activeStatus.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.order_code?.toLowerCase().includes(query) ||
          order.customer_name.toLowerCase().includes(query) ||
          order.status?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [orderData, activeStatus, searchQuery]);

  const fetchOrders = async () => {
    try {
      if ((startDate && !endDate) || (!startDate && endDate)) {
        toast.error("Tanggal mulai dan tanggal selesai harus dipilih bersama");
        return;
      }
      const data = await getOrderRange(
        startDate?.toISOString() || undefined,
        endDate?.toISOString() || undefined
      );
      setOrderData(data.data);
      setStartDate(null);
      setEndDate(null);
      setActiveStatus("");
      setSearchQuery("");
    } catch (error) {
      toast.error("Gagal mengambil data pesanan");
    }
  };
  const orderStats = useMemo(() => {
    return {
      total: orderData?.length,
      completed: orderData?.filter((order) => order.status === "Selesai")
        .length,
      rejected: orderData?.filter((order) => order.status === "Ditolak").length,
    };
  }, [orderData]);
  useEffect(() => {
    fetchOrders();
  }, []);
  const handlemodalDetail = (order: Order) => {
    setSelectedOrder(order);
    open("detailPesananOwner");
  };
  const columns = columnPesananOwner({
    onDetailClick: handlemodalDetail,
  });
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken h-full relative">
      <div className="flex flex-col gap-5 h-full">
        <Text size="heading2" weight="semiBold">
          Riwayat pesanan
        </Text>
        <SearchComponent
          statusReservasi={statusOrder}
          activeStatus={activeStatus}
          onStatusChange={(e) => handleStatusChange(e)}
          searchQuery={searchQuery}
          onSearchChange={(e) => handleSearchChange(e)}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => setStartDate(date)}
          onEndDateChange={(date) => setEndDate(date)}
          onClick={fetchOrders}
        />
        <InformationsCard
          items={[
            {
              title: "Total Pesanan",
              count: orderStats.total ? orderStats.total.toString() : "0",
              variant: "white",
              titleClassName: "",
              icon: <MenuIcon className="size-4 text-primary mr-2" />,
            },
            {
              title: "Pesanan Selesai",
              count: orderStats?.completed
                ? orderStats.completed.toString()
                : "0",
              variant: "secondary",
              titleClassName: "text-white",
              numberClassName: "text-white",
              icon: <SelesaiIcon className="size-4 text-white mr-2" />,
            },
            {
              title: "Pesanan Ditolak",
              count: orderStats?.rejected
                ? orderStats.rejected.toString()
                : "0",
              variant: "primary",
              titleClassName: "text-secondary",
              numberClassName: "text-secondary",
              icon: <DitolakIcon className="size-4 text-secondary mr-2" />,
            },
          ]}
        />
        <ReusableTable
          columns={columns}
          data={filteredOrders}
          emptyMessage="Tidak ada pesanan"
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={10}
          maxHeight="100%"
        />
      </div>
      {isDetail && (
        <ModalPesananOwner
          order={selectedOrder}
        />
      )}
    </section>
  );
}
