export type LaporanPenjualan = {
    diskonPromo: number;
    hpp: number;
    jumlahTransaksi: number;
    nilaiPoin: number;
    pendapatanBersih: number;
    pendapatanKotor: number;
    tanggal: string;
}

export type SumaryPenjualan = {
    totalDiskonPromo: number;
    totalHPP: number;
    totalNilaiPoin: number;
    totalPendapatanBersih: number;
    totalPendapatanKotor: number;
    totalTransaksi: number;
}

export type LaporanMenu = {
    hpp: number;
    jumlahTerjual: number;
    namaMenu: string;
    pendapatanKotor: number;
    kategori: string;
    profitKotor: number;
}

export type SumaryMenu = {
    ProfitPalingBesar: number;
    nama : string;
    terjualTerbanyak: number;
    namaMenu : string;
}

export type LaporanReservasi = {
    jumlahDibatalkan: number;
    jumlahDiterima: number;
    jumlahDitolak: number;
    jumlahHadir: number;
    jumlahReservasi: number;
    jumlahTidakHadir: number;
    tanggal: string;
}
export type SumaryReservasi = {
    tingkatKehadiran: number;
    tingkatTidakHadir: number;
    totalReservasi: number;
}

export type LaporanPromo = {
    id:number;
    jumlahDigunakan: number;
    namaPromo: string;
    periode: string;
    totalDiskon: number;
}

export type SumaryPromo = {
    nama: string;
    terpakaiPalingBanyak: number;
    namaPromo: string;
    totalDiskon: number;

}