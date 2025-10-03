export type DashhboardSumary = {
    totalCustomers: number;
    totalMenus: number;
    totalOrders: number;
}

export type MountlyIncome = {
    month: string;
    revenue: number;
}



export type menu ={
    id: number;
    img_url: string;
    name: string;
    total_sold: number;
}

export type topMenu = {
    categoryId: number;
    categoryName: string;
    topMenus: menu[];
}