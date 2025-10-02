import ReusableTable from "../atoms/table";
import {fetchLaporanReservasi } from "@/api/reports";
import { useState, useEffect } from "react";
import InformationsCard from "./informationsCard";
import type { LaporanReservasi,SumaryReservasi } from "@/types/laporan";
import { columnLaporanReservasi } from "./columLaporanReservasi";

interface LaporanReservasiProps {
    startDate?: string;
    endDate?: string;
    shouldFetch?: boolean;
}

export default function LaporanReservasi({startDate, endDate, shouldFetch=true}: LaporanReservasiProps) {
  const [data, setData] = useState<LaporanReservasi[] | null>([]);
  const [sumary, setSummary] = useState<SumaryReservasi | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLaporanReservasi = async () => {
    setIsLoading(true);
    try {
      const laporanData = await fetchLaporanReservasi(startDate, endDate);
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
        getLaporanReservasi();
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
        className="xs:grid-cols-2 sm:grid-cols-3"
        items={[
          {
            title: "Total Reservasi",
            count: sumary ? sumary.totalReservasi.toString() : "0",
            variant: "white",
            titleClassName: " md:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[1.8rem]",
            numberClassName:
              "text-[1rem] xs:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.7rem] 2xl:text-[2.2rem] xs:text-center text-secondary/80",
            icon: <></>,
          },
          {
            title: "Tingkat Kehadiran",
            count: sumary ? `${sumary.tingkatKehadiran.toFixed(2)}%` : "0%",
            variant: "white",
            titleClassName: "md:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[1.8rem]",
            numberClassName:
              "text-[1rem] xs:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.7rem] 2xl:text-[2.2rem] xs:text-center text-secondary/80",
            icon: <></>,
          },
          {
            title: "Tingkat Tidak Hadir",
            count: sumary ? `${sumary.tingkatTidakHadir.toFixed(2)}%` : "0%",
            variant: "white",
            titleClassName: "md:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[1.8rem]",
            numberClassName:
              "text-[1rem] xs:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.7rem] 2xl:text-[2.2rem] xs:text-center text-secondary/80",
            icon: <></>,
          },
        ]}
      />
      <ReusableTable
        columns={columnLaporanReservasi()}
        data={data || []}
        emptyMessage="Tidak ada Laporan Reservasi"
        getRowId={(row) => row.tanggal}
        rowsPerPageOptions={[5, 10, 25]}
        defaultRowsPerPage={10}
        maxHeight="100%"
      />
    </div>
  );
}
