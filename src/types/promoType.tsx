type menu = {
    id: number;
    name: string;
}
type promoMenu = {
    menu: menu;
}
type countClaim = {
    orders : number;
}
export type promoType = {
    amount_value?: number;
    description: string;
    id: number;
    end_date: string;
    img_url: string;
    minimum_purchase?: number;
    name: string;
    percent_value?: number;
    _count: countClaim;
    promo_code: string;
    promo_type: "amount" | "percent";
    start_date: string;
    status: string;
    promo_menus?: promoMenu[];
};