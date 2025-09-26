import SecondNavbar from "../molecules/secondNavbar";
import { Pages } from "../atoms/page";
import { navbarPoin } from "@/const/constNavbar";
import { useState } from "react";
import { getHistoryPoint } from "@/api/orders";
import { useEffect } from "react";
import type { HistoryPoint } from "@/types/historyPoint";
import { Text } from "../atoms/text";
import PoinIcon from "../icons/poin";
export default function HistoryPoin() {
  const [activeStatus, setActiveStatus] = useState<string>("Pembelanjaan");
  const [filteredPoin, setFilteredPoin] = useState<HistoryPoint[]>([]);
  const [pointHistory, setPointHistory] = useState<HistoryPoint[]>([]);
  const fetchHistoryPoint = async () => {
    try {
      const data = await getHistoryPoint();
      setPointHistory(data.data);
      const filteredData = data.data.filter(
        (poin: HistoryPoint) =>
          poin.type === "Pembelanjaan"
      );
      setFilteredPoin(filteredData);
    } catch (error) {
      console.error("Error fetching point history:", error);
    }
  };
  const handleStatusChange = (type: string) => {
    setActiveStatus(type);

    const filtered = pointHistory.filter((poin) => {
      return (
        poin.type === type ||
        poin.type.toLowerCase() === type.toLowerCase()
      );
    });
    setFilteredPoin(filtered);
  };
  useEffect(() => {
    fetchHistoryPoint();
  }, []);
  return (
    <Pages className="flex flex-col gap-3 items-center py-5 h-full">
      <SecondNavbar
        navigasi={navbarPoin}
        activeStatus={activeStatus}
        onStatusChange={handleStatusChange}
      />
      <div className="flex flex-col items-center w-full gap-7 h-full overflow-y-auto scrollbar-hide">
        {filteredPoin.length === 0 && (
          <div className="text-center w-full h-full flex justify-center items-center">
            <Text size="heading2" weight="semiBold">Tidak ada history poin yang ditemukan.</Text>
          </div>
        )}
        {filteredPoin.map((order) => (
          <div className={`bg-white p-4 rounded-lg w-full sm:w-[40rem] md:w-[46rem] xl:w-[60rem] flex justify-between items-center`} key={order.id}>
            <div className="flex gap-2 items-center">
              <div className="size-10 xs:size-13 sm:size-15">
                <PoinIcon className={`w-full h-full text-primary ${order.type === "Pembelanjaan" ? "text-secondary" : "text-primary"}`} />
              </div>
              <div className="flex flex-col">
                <Text size="body" className={`${order.type === "Pembelanjaan" ? "text-secondary" : "text-primary"}`}>{order.type}</Text>
                <Text size="caption" className={`${order.type === "Pembelanjaan" ? "text-secondary" : "text-primary"}`}>{order.type === "Pembelanjaan" ? "Kamu Menggunakan " : "Kamu Mendapatkan "} {order.amount} Poin</Text>
              </div>
            </div>
            <div>
              <Text size="body" color="secondary" weight="semiBold" className={`${order.type === "Pembelanjaan" ? "text-secondary" : "text-primary"}`}>{order.type === "Pembelanjaan" ? "- " : "+ "}{order.amount}</Text>
            </div>
          </div>
        ))}
      </div>
    </Pages>
  );
}
