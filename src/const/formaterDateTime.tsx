import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    let processedString = dateString;
    if (!dateString.endsWith('Z')) {
        processedString = dateString + 'Z';
    }
    
    
    const date = new Date(processedString);
    
    if (isNaN(date.getTime())) {
        return dateString;
    }
    
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
    
};

export const formatPeriode = (dateString: string) => {
   const [awal, akhir] = dateString.split(" - ");

  const d1 = dayjs(awal);
  const d2 = dayjs(akhir);

  // kalau tahun sama
  if (d1.year() === d2.year()) {
    // kalau bulan sama
    if (d1.month() === d2.month()) {
      return `${d1.format("D")} - ${d2.format("D MMMM YYYY")}`;
    }
    return `${d1.format("D MMMM")} - ${d2.format("D MMMM YYYY")}`;
  }

  // kalau beda tahun
  return `${d1.format("D MMMM YYYY")} - ${d2.format("D MMMM YYYY")}`;
}