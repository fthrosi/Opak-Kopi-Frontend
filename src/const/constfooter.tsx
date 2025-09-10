

const data = [
    {
        id:1,
        Title: "Halaman",
        navigation: [
            { id:1, title: "Beranda", path: "/" },
            { id:2, title: "Menu", path: "/menu" },
            { id:3, title: "Kontak", path: "/kontak" },
        ]
    },
    {
        id:2,
        Title: "Ikuti",
        navigation: [
            {id:1, title: "Instagram", path: "https://www.instagram.com" },
            {id:2, title: "Facebook", path: "https://www.facebook.com" },
            {id:3, title: "Twitter", path: "https://www.twitter.com" },
        ]
    },
]

const Kontak = [
    {
        id: 1,
        icon: "/image/location.png",
        name: "Jl. Opak Raya, Jirak, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta"
    },
    {
        id: 2,
        icon: "/image/telephone.png",
        name: "+62 81345678912"
    },
    {
        id: 3,
        icon: "/image/mail.png",
        name: "opakkopi@gmail.com"
    }
    
]
export { data, Kontak };