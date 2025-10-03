import ReusableTable from "../atoms/table";
import { fetchLaporanPenjualan } from "@/api/reports";
import { useState, useEffect } from "react";
import InformationsCard from "./informationsCard";
import { formatRupiah } from "@/const/idrCurrency";
import type {
  LaporanPenjualan,
  SumaryPenjualan,
} from "@/types/laporan";
import { columnLaporranPenjualan } from "./columnLaporanPenjualan";

interface LaporanPenjualanProps {
    startDate?: string;
    endDate?: string;
    shouldFetch?: boolean;
}

export default function LaporanPenjualan({startDate, endDate, shouldFetch=true}: LaporanPenjualanProps) {
  const [data, setData] = useState<LaporanPenjualan[] | null>([]);
  const [sumary, setSummary] = useState<SumaryPenjualan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLaporanPenjualan = async () => {
    setIsLoading(true);
    try {
      const laporanData = await fetchLaporanPenjualan(startDate, endDate);
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
        getLaporanPenjualan();
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
    <div className="flex flex-col gap-6 min-h-0 overflow-y-auto">
      <InformationsCard
        className="xs:grid-cols-2 xl:grid-cols-6"
        items={[
          {
            title: "Total Transaksi",
            count: sumary ? sumary.totalTransaksi.toString() : "0",
            variant: "white",
            titleClassName: "xl:text-[0.9rem] 2xl:text-[0.9rem]",
            numberClassName:
              "xl:text-[1.5rem] 2xl:text-[1.7rem] text-secondary/80",
            icon: <></>,
          },
          {
            title: "Pendapatan Kotor",
            count: formatRupiah({
              value: sumary ? sumary.totalPendapatanKotor : 0,
            }),
            variant: "white",
            titleClassName: "xl:text-[0.9rem] 2xl:text-[0.9rem]",
            numberClassName:
              "xl:text-[1.5rem] 2xl:text-[1.7rem] text-secondary/80",
            icon: <></>,
          },
          {
            title: "Total Diskon Promo",
            count: formatRupiah({
              value: sumary ? sumary.totalDiskonPromo : 0,
            }),
            variant: "white",
            titleClassName: "xl:text-[0.9rem] 2xl:text-[0.9rem]",
            numberClassName:
              "xl:text-[1.5rem] 2xl:text-[1.7rem] text-secondary/80",
            icon: <></>,
          },
          {
            title: "Total Nilai Poin",
            count: formatRupiah({ value: sumary ? sumary.totalNilaiPoin : 0 }),
            variant: "white",
            titleClassName: "xl:text-[0.9rem] 2xl:text-[0.9rem]",
            numberClassName:
              "xl:text-[1.5rem] 2xl:text-[1.7rem] text-secondary/80",
            icon: <></>,
          },
          {
            title: "Total HPP",
            count: formatRupiah({ value: sumary ? sumary.totalHPP : 0 }),
            variant: "white",
            titleClassName: "xl:text-[0.9rem] 2xl:text-[0.9rem]",
            numberClassName:
              "xl:text-[1.5rem] 2xl:text-[1.7rem] text-secondary/80",
            icon: <></>,
          },
          {
            title: "Pendapatan Bersih",
            count: formatRupiah({
              value: sumary ? sumary.totalPendapatanBersih : 0,
            }),
            variant: "secondary",
            titleClassName: "xl:text-[0.9rem] 2xl:text-[0.9rem] text-white",
            numberClassName: "xl:text-[1.5rem] 2xl:text-[1.7rem] text-white",
            icon: <></>,
          },
        ]}
      />
      <ReusableTable
        columns={columnLaporranPenjualan()}
        data={data || []}
        emptyMessage="Tidak ada Laporan Penjualan"
        getRowId={(row) => row.tanggal}
        rowsPerPageOptions={[5, 10, 25]}
        defaultRowsPerPage={10}
        maxHeight="100%"
      />
    </div>
  );
}
