import type { NavigasiProfile } from "@/types/navigasi";
import { ReservasiIcon } from "@/components/icons/reservasi";
import { PesananIcon } from "@/components/icons/pesanan";
import { MenuIcon } from "@/components/icons/menu";

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
    path: "/profile",
    action: "navigate",
  },
  {
    id: 2,
    title: "Logout",
    action: "logout",
  }
]
