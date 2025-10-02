import ReusableTable from "../atoms/table";
import {fetchLaporanPromo } from "@/api/reports";
import { useState, useEffect } from "react";
import InformationsCard from "./informationsCard";
import type { LaporanPromo,SumaryPromo } from "@/types/laporan";
import { formatRupiah } from "@/const/idrCurrency";
import { columnLaporanPromo } from "./columnLaporanPromo";

interface LaporanPromoProps {
    startDate?: string;
    endDate?: string;
    shouldFetch?: boolean;
}

export default function LaporanPromo({startDate, endDate, shouldFetch=true}: LaporanPromoProps) {
  const [data, setData] = useState<LaporanPromo[] | null>([]);
  const [sumary, setSummary] = useState<SumaryPromo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLaporanMenu = async () => {
    setIsLoading(true);
    try {
      const laporanData = await fetchLaporanPromo(startDate, endDate);
      console.log(laporanData.data);
      setData(laporanData.data.reportRows);
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
            title: "Penggunaan Terbanyak",
            count: `${sumary?  sumary.nama : ""} ( ${sumary? sumary.terpakaiPalingBanyak : 0}x )`,
            variant: "white",
            titleClassName: " md:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[1.8rem]",
            numberClassName:
              "text-[1rem] xs:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.7rem] 2xl:text-[2.2rem] xs:text-center text-secondary/80",
            icon: <></>,
          },
          {
            title: "Diskon Terbesar",
            count: `${sumary?  sumary.namaPromo : ""} ( ${sumary? formatRupiah({value:sumary.totalDiskon}) : 0} )`,
            variant: "white",
            titleClassName: "md:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[1.8rem]",
            numberClassName:
              "text-[1rem] xs:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.7rem] 2xl:text-[2.2rem] xs:text-center text-secondary/80",
            icon: <></>,
          }
        ]}
      />
      <ReusableTable
        columns={columnLaporanPromo()}
        data={data || []}
        emptyMessage="Tidak ada Laporan Promo"
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 25]}
        defaultRowsPerPage={10}
        maxHeight="100%"
      />
    </div>
  );
}
