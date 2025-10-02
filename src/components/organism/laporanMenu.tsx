import ReusableTable from "../atoms/table";
import { fetchLaporanMenu } from "@/api/reports";
import { useState, useEffect } from "react";
import InformationsCard from "./informationsCard";
import { formatRupiah } from "@/const/idrCurrency";
import type { LaporanMenu,SumaryMenu } from "@/types/laporan";
import { columnLaporanMenu } from "./columnLaporanMenu";

interface LaporanMenuProps {
    startDate?: string;
    endDate?: string;
    shouldFetch?: boolean;
}

export default function LaporanMenu({startDate, endDate, shouldFetch=true}: LaporanMenuProps) {
  const [data, setData] = useState<LaporanMenu[] | null>([]);
  const [sumary, setSummary] = useState<SumaryMenu | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLaporanMenu = async () => {
    setIsLoading(true);
    try {
      const laporanData = await fetchLaporanMenu(startDate, endDate);
      setData(laporanData.data.rows);
      setSummary(laporanData.data.summary);
    } catch (error) {
        setData([]);
        setSummary(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (shouldFetch){
        getLaporanMenu();
    }
  }, [startDate, endDate, shouldFetch]);
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="animate-pulse bg-gray-200 h-32 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-64 rounded"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 h-full">
      <InformationsCard
        className="xs:grid-cols-2 sm:grid-cols-2"
        items={[
          {
            title: "Menu Terprofit",
            count: `${sumary?.nama || "Nama Menu"} (${formatRupiah({
              value: sumary ? sumary.ProfitPalingBesar : 0,
            })})`,
            variant: "white",
            titleClassName: " md:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[1.8rem]",
            numberClassName:
              "text-[1rem] xs:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.7rem] 2xl:text-[2.2rem] xs:text-center text-secondary/80",
            icon: <></>,
          },
          {
            title: "Menu Terlaris",
            count: `${sumary?.namaMenu || "Nama Menu"} (${sumary ? sumary.terjualTerbanyak : 0})`,
            variant: "white",
            titleClassName: "md:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[1.8rem]",
            numberClassName:
              "text-[1rem] xs:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.7rem] 2xl:text-[2.2rem] xs:text-center text-secondary/80",
            icon: <></>,
          },
        ]}
      />
      <ReusableTable
        columns={columnLaporanMenu()}
        data={data || []}
        emptyMessage="Tidak ada Laporan Menu"
        getRowId={(row) => row.namaMenu}
        rowsPerPageOptions={[5, 10, 25]}
        defaultRowsPerPage={10}
        maxHeight="100%"
      />
    </div>
  );
}
