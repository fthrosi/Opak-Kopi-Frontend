import type { NavigasiProfile } from "@/types/navigasi";
import { ReservasiIcon } from "@/components/icons/reservasi";
import { PesananIcon } from "@/components/icons/pesanan";
import { MenuIcon } from "@/components/icons/menu";
import { DashboardIcon } from "@/components/icons/dashboard";
import { KategoriIcon } from "@/components/icons/kategori";
import VoucherIcon from "@/components/icons/voucher";
import { LaporanIcon } from "@/components/icons/laporan";
import { UserIcon } from "@/components/icons/user";
import { KritikSaranIcon } from "@/components/icons/kritikSaran";

export const navigationData = [
  {
    id: 1,
    title: "Beranda",
    path: "/",
  },
  {
    id: 2,
    title: "Menu",
    path: "/menu",
  },
  {
    id: 4,
    title: "Kontak",
    path: "/kontak",
  },
];

export const navigationPelangganLogin = [
  {
    id: 1,
    title: "Menu",
    path: "/menulogin",
  },
  {
    id: 2,
    title: "Reservasi",
    path: "/reservasi",
  },
  {
    id: 3,
    title: "Promo",
    path: "/promo",
  },
  {
    id: 4,
    title: "Favorit Saya",
    path: "/favorit",
  },
];

export const profileDropdownData: NavigasiProfile[] = [
  {
    id: 1,
    title: "Profile",
    path: "/profile",
    action: "navigate",
  },
  {
    id: 2,
    title: "History Order",
    path: "/history-order",
    action: "navigate",
  },
  {
    id: 3,
    title: "History Reservasi",
    path: "/history-reservasi",
    action: "navigate",
  },
  {
    id: 4,
    title: "History Poin",
    path: "/history-poin",
    action: "navigate",
  },
  {
    id: 5,
    title: "Kritik Dan Saran",
    path: "/feedback",
    action: "navigate",
  },
  {
    id: 6,
    title: "Logout",
    action: "logout",
  },
];

export const navbarHistoryReservasi = [
  {
    id: 1,
    title: "Dikirim",
    label: "Dikirim",
  },
  {
    id: 2,
    title: "Diterima",
    label: "Diterima",
  },
  {
    id: 3,
    title: "Ditolak",
    label: "Ditolak",
  },
  {
    id: 4,
    title: "Dibatalkan",
    label: "Dibatalkan",
  },
  {
    id: 5,
    title: "Selesai",
    label: "Selesai",
  },
];

export const navbarPoin = [
  {
    id: 1,
    title: "Pembelanjaan",
    label: "Pembelanjaan",
  },
  {
    id: 2,
    title: "Pendapatan",
    label: "Pendapatan",
  },
];

export const navbarFeedback = [
  {
    id: 1,
    title: "Dikirim",
    label: "Dikirim",
  },
  {
    id: 2,
    title: "Dibaca",
    label: "Dibaca",
  },
  {
    id: 3,
    title: "Diproses",
    label: "Diproses",
  },
  {
    id: 4,
    title: "Selesai",
    label: "Selesai",
  },
];

export const navbarKasir  = [
  {
    id: 1,
    title: "Menu",
    path: "/kasir/menu",
    icon: <MenuIcon className="w-full h-full" />,
  },
  {
    id: 2,
    title: "Pesanan",
    path: "/kasir/pesanan",
    icon: <PesananIcon className="w-full h-full" />,
  },
  {
    id: 3,
    title: "Reservasi",
    path: "/kasir/reservasi",
    icon: <ReservasiIcon className="w-full h-full" />,
  },
];

export const navbarOwner = [
  {
    id: 1,
    title: "Dashboard",
    path: "/owner/dashboard",
    icon: <DashboardIcon className="w-full h-full" />,
  },{
    id: 2,
    title: "Pesanan",
    path: "/owner/pesanan",
    icon: <PesananIcon className="w-full h-full" />,
  },
  {
    id: 3,
    title: "Reservasi",
    path: "/owner/reservasi",
    icon: <ReservasiIcon className="w-full h-full" />,
  },{
    id: 4,
    title: "Menu",
    path: "/owner/menu",
    icon: <MenuIcon className="w-full h-full" />,
  },{
    id: 5,
    title: "Promo",
    path: "/owner/promo",
    icon: <VoucherIcon className="w-full h-full" />,
  },{
    id: 6,
    title: "Kategori",
    path: "/owner/kategori",
    icon: <KategoriIcon className="w-full h-full" />,
  },{
    id: 7,
    title: "Kritik & Saran",
    path: "/owner/kritik-saran",
    icon: <KritikSaranIcon className="w-full h-full" />,
  },{
    id: 8,
    title: "Pengguna",
    path: "/owner/pengguna",
    icon: <UserIcon className="w-full h-full" />,
  },{
    id: 9,
    title: "Laporan",
    path: "/owner/laporan",
    icon: <LaporanIcon className="w-full h-full" />,
  }
]

export const secNavPesanan = [
  { id: 1, title: "Dikirim", label: "Baru" },
  { id: 2, title: "Diproses", label: "Diproses" },
  { id: 3, title: "Selesai", label: "Selesai" },
  { id: 4, title: "Ditolak", label: "Ditolak" },
];

export const navbarStaf : NavigasiProfile[] = [
  {
    id: 1,
    title: "Profile",
    path: "/kasir/profile",
    action: "navigate",
  },
  {
    id: 2,
    title: "Logout",
    action: "logout",
  }
]
