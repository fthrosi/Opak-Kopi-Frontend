import type { NavigasiProfile } from "@/types/navigasi"

export const navigationData = [
    {
        id: 1,
        title: "Beranda",
        path: "/"
    },
    {
        id: 2,
        title: "Menu",
        path: "/menu"
    },
    {
        id: 4,
        title: "Kontak",
        path: "/kontak"
    }
]

export const navigationPelangganLogin =[
    {
        id: 1,
        title: "Menu",
        path: "/menulogin"
    },
    {
        id: 2,
        title: "Reservasi",
        path: "/reservasi"
    },
    {
        id: 3,
        title: "Promo",
        path: "/promo"
    },
    {
        id: 4,
        title: "Favorit Saya",
        path: "/favorit"
    }
]

export const profileDropdownData: NavigasiProfile[] = [
    {
        id: 1,
        title: "Profile",
        path: "/profile",
        action: "navigate"
    },
    {
        id: 2,
        title: "History Order",
        path: "/history-order",
        action: "navigate"
    },
    {
        id: 3,
        title: "History Reservasi",
        path: "/history-reservasi",
        action: "navigate"
    },
    {
        id: 4,
        title: "History Poin",
        path: "/history-poin",
        action: "navigate"
    },
    {
        id: 5,
        title: "Kritik Dan Saran",
        path: "/feedback",
        action: "navigate"
    },
    {
        id: 6,
        title: "Logout",
        action: "logout"
    }
]

export const navbarHistoryReservasi = [
    {
        id: 1,
        title: "Dikirim",
    },
    {
        id: 2,
        title: "Diterima",
    },
    {
        id: 3,
        title: "Ditolak",
    },
    {
        id: 4,
        title: "Dibatalkan",
    },
    {
        id: 5,
        title: "Selesai",
    }
]

export const navbarPoin = [
    {
        id: 1,
        title: "Pembelanjaan",
    },
    {
        id: 2,
        title: "Pendapatan",
    }
]

export const navbarFeedback = [
    {
        id: 1,
        title: "Dikirim",
    },
    {
        id: 2,
        title: "Dibaca",
    },
    {
        id: 3,
        title: "Diproses",
    },
    {
        id: 4,
        title: "Selesai",
    }
]