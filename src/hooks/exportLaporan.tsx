import { useState } from "react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { formatRupiah } from "@/const/idrCurrency";
import { formatPeriode } from "@/const/formaterDateTime";

// ← IMPORT API LAPORAN (YANG BENAR-BENAR DIPAKAI)
import {
  fetchLaporanPenjualan,
  fetchLaporanMenu,
  fetchLaporanReservasi,
  fetchLaporanPromo,
} from "@/api/reports";

interface ExportDates {
  startDate?: string;
  endDate?: string;
  isValid: boolean;
}

interface ColumnMapping {
  header: string;
  dataKey: string;
}

// ← INTERFACE UNTUK MAPPING SUMMARY
interface SummaryMapping {
  key: string; // Key dari API response
  label: string; // Label untuk display
  format?: boolean; // Apakah perlu format khusus
  isSpecial?: boolean; // Untuk format khusus
  specialFormat?: (summary: any) => string; // Format khusus untuk promo
}

export const useExportLaporan = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔧 HELPER: GET EXPORT INFO
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const getExportInfo = (validatedDates: ExportDates) => {
    let dateRangeText = "";
    let filenameDate = "";
    let periodText = "";

    if (
      validatedDates.isValid &&
      validatedDates.startDate &&
      validatedDates.endDate
    ) {
      const startFormatted = dayjs(validatedDates.startDate).format(
        "DD MMM YYYY"
      );
      const endFormatted = dayjs(validatedDates.endDate).format("DD MMM YYYY");
      dateRangeText = ` (${startFormatted} - ${endFormatted})`;
      periodText = `Periode: ${startFormatted} s/d ${endFormatted}`;
      filenameDate = `_${validatedDates.startDate}_to_${validatedDates.endDate}`;
    } else {
      const monthName = dayjs().format("MMMM YYYY");
      dateRangeText = ` (${monthName})`;
      periodText = `Periode: ${monthName}`;
      filenameDate = `_${dayjs().format("YYYY-MM")}`;
    }

    return { dateRangeText, filenameDate, periodText };
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔧 HELPER: FORMAT SUMMARY VALUE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const formatSummaryValue = (
    value: any,
    format: boolean = false,
    key: string = ""
  ): string => {
    if (value === undefined || value === null) {
      return "-";
    }
    if (key.toLowerCase().includes("tingkat")) {
      return `${value}%`;
    }
    if (typeof value === "number") {
      if (format || value > 10000) {
        return formatRupiah({ value });
      }
      return value.toLocaleString("id-ID");
    }

    return String(value);
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📄 EXPORT TO PDF - IMPROVED VERSION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const exportToPDF = async (
    laporanActive: string,
    validatedDates: ExportDates
  ) => {
    try {
      setIsExporting(true);

      const { dateRangeText, filenameDate } = getExportInfo(validatedDates);

      let rows: any[],
        summary: any,
        filename: string,
        title: string,
        columns: ColumnMapping[];

      // ← DEFINISI MAPPING SUMMARY UNTUK SETIAP JENIS LAPORAN
      let summaryMappings: SummaryMapping[] = [];

      // ← FETCH DATA & SETUP COLUMNS
      switch (laporanActive) {
        case "penjualan":
          console.log("Fetching penjualan data"); // DEBUG
          const penjualanData = await fetchLaporanPenjualan(
            validatedDates.startDate,
            validatedDates.endDate
          );
          console.log("Penjualan data:", penjualanData); // DEBUG

          rows = penjualanData.data.rows;
          summary = penjualanData.data.summary;
          filename = `Laporan_Penjualan${filenameDate}.pdf`;
          title = "LAPORAN PENJUALAN";

          // ← COLUMN MAPPINGS UNTUK TABEL PENJUALAN
          columns = [
            { header: "Tanggal", dataKey: "tanggal" },
            { header: "Jumlah Transaksi", dataKey: "jumlahTransaksi" },
            { header: "Pendapatan Kotor", dataKey: "pendapatanKotor" },
            { header: "Total Diskon", dataKey: "diskonPromo" },
            { header: "Total Nilai Poin", dataKey: "nilaiPoin" },
            { header: "Total HPP", dataKey: "hpp" },
            { header: "Pendapatan Bersih", dataKey: "pendapatanBersih" },
          ];

          // ← SUMMARY MAPPINGS UNTUK LAPORAN PENJUALAN
          summaryMappings = [
            { key: "totalTransaksi", label: "Total Transaksi" },
            {
              key: "totalPendapatanKotor",
              label: "Total Pendapatan Kotor",
              format: true,
            },
            {
              key: "totalDiskonPromo",
              label: "Total Diskon Promo",
              format: true,
            },
            { key: "totalNilaiPoin", label: "Total Nilai Poin", format: true },
            { key: "totalHPP", label: "Total HPP", format: true },
            {
              key: "totalPendapatanBersih",
              label: "Total Pendapatan Bersih",
              format: true,
            },
          ];
          break;

        case "menu":
          console.log("Fetching menu data"); // DEBUG
          const menuData = await fetchLaporanMenu(
            validatedDates.startDate,
            validatedDates.endDate
          );
          console.log("Menu data:", menuData); // DEBUG

          rows = menuData.data.rows;
          summary = menuData.data.summary;
          filename = `Laporan_Menu${filenameDate}.pdf`;
          title = "LAPORAN MENU";

          // ← COLUMN MAPPINGS UNTUK TABEL MENU
          columns = [
            { header: "Nama Menu", dataKey: "namaMenu" },
            { header: "Kategori", dataKey: "kategori" },
            { header: "Jumlah Terjual", dataKey: "jumlahTerjual" },
            { header: "Total Pendapatan Kotor", dataKey: "pendapatanKotor" },
            { header: "Total HPP", dataKey: "hpp" },
            { header: "Total Profit Kotor", dataKey: "profitKotor" },
          ];

          // ← SUMMARY MAPPINGS UNTUK LAPORAN MENU
          summaryMappings = [
            {
              key: "menuTerlaris",
              label: "Menu Terlaris",
              isSpecial: true,
              specialFormat: (sum) =>
                `${sum.namaMenu} (${sum.terjualTerbanyak} Porsi)`,
            },
            {
              key: "menuTerprofit",
              label: "Menu Terprofit",
              isSpecial: true,
              specialFormat: (sum) =>
                `${sum.nama} (${formatRupiah({
                  value: sum.ProfitPalingBesar,
                })})`,
            },
          ];
          break;

        case "reservasi":
          console.log("Fetching reservasi data"); // DEBUG
          const reservasiData = await fetchLaporanReservasi(
            validatedDates.startDate,
            validatedDates.endDate
          );
          console.log("Reservasi data:", reservasiData); // DEBUG

          rows = reservasiData.data.rows;
          summary = reservasiData.data.summary;
          filename = `Laporan_Reservasi${filenameDate}.pdf`;
          title = "LAPORAN RESERVASI";

          // ← COLUMN MAPPINGS UNTUK TABEL RESERVASI
          columns = [
            { header: "Tanggal", dataKey: "tanggal" },
            { header: "Jumlah Reservasi", dataKey: "jumlahReservasi" },
            { header: "Diterima", dataKey: "jumlahhDiterima" },
            { header: "Ditolak", dataKey: "jumlahDitolak" },
            { header: "Dibatalkan", dataKey: "jumlahDibatalkan" },
            { header: "Hadir", dataKey: "jumlahHadir" },
            { header: "Tidak Hadir", dataKey: "jumlahTidakHadir" },
          ];

          // ← SUMMARY MAPPINGS UNTUK LAPORAN RESERVASI
          summaryMappings = [
            { key: "totalReservasi", label: "Total Reservasi" },
            {
              key: "tingkatKehadiran",
              label: "Tingkat Kehadiran",
              format: true,
            },
            {
              key: "tingkatTidakHadir",
              label: "Tingkat Tidak Hadir",
              format: true,
            },
          ];
          break;

        case "promo":
          console.log("Fetching promo data"); // DEBUG
          const promoData = await fetchLaporanPromo(
            validatedDates.startDate,
            validatedDates.endDate
          );
          console.log("Promo data:", promoData); // DEBUG

          rows = promoData.data.rows;
          summary = promoData.data.summary;
          filename = `Laporan_Promo${filenameDate}.pdf`;
          title = "LAPORAN PROMO";

          // ← COLUMN MAPPINGS UNTUK TABEL PROMO
          columns = [
            { header: "Nama Promo", dataKey: "namaPromo" },
            { header: "Periode", dataKey: "periode" },
            { header: "Jumlah Diklaim", dataKey: "jumlahDigunakan" },
            { header: "Total Nilai Diskon", dataKey: "totalDiskon" },
          ];

          // ← SPECIAL MAPPING UNTUK PROMO (DENGAN FORMAT KHUSUS)
          summaryMappings = [
            {
              key: "terpakaiBanyak",
              label: "Terpakai Paling Banyak",
              isSpecial: true,
              specialFormat: (sum) =>
                `${sum.namaPromo} (${sum.terpakaiPalingBanyak} x)`,
            },
            {
              key: "diskonPalingBesar",
              label: "Diskon Paling Besar",
              isSpecial: true,
              specialFormat: (sum) =>
                `${sum.nama} (${formatRupiah({ value: sum.totalDiskon })})`,
            },
          ];
          break;

        default:
          toast.error("Jenis laporan tidak dikenali");
          return;
      }

      if (!rows || rows.length === 0) {
        toast.error("Tidak ada data untuk diexport");
        return;
      }

      console.log("Creating PDF with rows:", rows.length); // DEBUG
      console.log("Summary:", summary); // DEBUG

      // ═══════════════════════════════════════════════════════════════
      // 📄 CREATE PDF WITH BEAUTIFUL LAYOUT
      // ═══════════════════════════════════════════════════════════════
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // ─────────────────────────────────────────────────────────────
      // 1️⃣ ADD HEADER
      // ─────────────────────────────────────────────────────────────
      const pageWidth = doc.internal.pageSize.width;

      // Title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("KAFE OPAK KOPI", pageWidth / 2, 15, { align: "center" });

      // Report name
      doc.setFontSize(14);
      doc.text(title + dateRangeText, pageWidth / 2, 22, { align: "center" });

      // Date generated
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Digenerate pada: ${dayjs().format("DD MMMM YYYY, HH:mm")}`,
        pageWidth / 2,
        29,
        { align: "center" }
      );

      // ─────────────────────────────────────────────────────────────
      // 2️⃣ ADD SUMMARY BOX - SINGLE COLUMN LAYOUT WITH EXPLICIT MAPPING
      // ─────────────────────────────────────────────────────────────
      let yPos = 40;

      if (summary && Object.keys(summary).length > 0) {
        // Draw summary box
        const margin = 15;
        const summaryWidth = pageWidth - margin * 2;

        // Calculate box height based on number of summary items
        const lineHeight = 7;
        const boxHeight = summaryMappings.length * lineHeight + 20;

        // Draw box outline
        doc.setDrawColor(222, 150, 44); // Primary color
        doc.setFillColor(255, 248, 235); // Light orange background
        doc.roundedRect(margin, yPos, summaryWidth, boxHeight, 3, 3, "FD");

        // Summary title
        yPos += 8;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(222, 150, 44);
        doc.text("RINGKASAN", margin + 5, yPos);

        // Summary content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        yPos += 8;

        // Display all summary items dengan mapping yang sudah ditentukan
        summaryMappings.forEach((mapping, index) => {
          const rowYPos = yPos + index * lineHeight;

          // Label
          doc.setFont("helvetica", "bold");
          doc.text(`${mapping.label}:`, margin + 5, rowYPos);

          // Value with special handling for promo
          doc.setFont("helvetica", "normal");

          let displayValue = "-";
          if (mapping.isSpecial && mapping.specialFormat) {
            // Untuk kasus khusus promo
            displayValue = mapping.specialFormat(summary);
          } else {
            // Untuk kasus normal
            const value = summary[mapping.key];
            displayValue = formatSummaryValue(value, mapping.format,mapping.key);
          }

          doc.text(displayValue, margin + 70, rowYPos);
        });

        // Update position after summary box + add space
        yPos += summaryMappings.length * lineHeight + 15;
      }

      // ─────────────────────────────────────────────────────────────
      // 3️⃣ ADD DATA TABLE
      // ─────────────────────────────────────────────────────────────
      autoTable(doc, {
        startY: yPos,
        head: [columns.map((col) => col.header)],
        body: rows.map((row: any) => {
          // Map each row based on column definitions
          return columns.map((col) => {
            let value = row[col.dataKey];

            // Format currency values
            if (
              (typeof value === "number" &&
                col.dataKey.includes("pendapatan")) ||
              col.dataKey.includes("diskon") ||
              col.dataKey.includes("harga") ||
              col.dataKey.includes("hpp") ||
              col.dataKey.includes("nilai") ||
              col.dataKey.includes("profit")
            ) {
              return formatRupiah({ value });
            }
            if (col.dataKey === "periode") {
              return formatPeriode(value);
            }

            return value || "-";
          });
        }),
        headStyles: {
          fillColor: [222, 150, 44],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
        },
        styles: {
          font: "helvetica",
          fontSize: 9,
          cellPadding: 3,
          lineWidth: 0.1,
        },
        margin: { top: 10 },
      });

      // ─────────────────────────────────────────────────────────────
      // 4️⃣ ADD FOOTER
      // ─────────────────────────────────────────────────────────────
      const totalPages = doc.getNumberOfPages();

      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        const footerY = doc.internal.pageSize.height - 10;

        // Page numbers
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Halaman ${i} dari ${totalPages}`, pageWidth - 20, footerY);

        // Kafe name at bottom
        doc.text("© Kafe Opak Kopi", 15, footerY);
      }

      // ─────────────────────────────────────────────────────────────
      // 5️⃣ SAVE PDF
      // ─────────────────────────────────────────────────────────────
      doc.save(filename);

      console.log("PDF exported successfully:", filename); // DEBUG
      toast.success(`✅ Laporan ${laporanActive} berhasil diexport ke PDF`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("❌ Gagal mengexport laporan PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    showExportMenu,
    setShowExportMenu,
    exportToPDF,
  };
};
