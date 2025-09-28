type point = {
    id: number,
    type: string,
    amount: number,
}
type customer = {
    id: number,
    name: string,
}
type menu = {
    id: number,
    name: string,
    image_url: string,    
}
export type order_item = {
    cogs_at_transaction: number,
    id: number,
    menu: menu,
    name_menu: string,
    price_at_transaction: number,
    quantity: number,
    subtotal: number,
}
type table = {
    id: number,
    number: number,
}
export type Order = {
    cancellation_reason: string,
    cashier: string,
    cashier_id: number,
    cashier_name: string,
    created_at: string,
    customer: customer,
    customer_id: number,
    customer_name: string,
    id: number,
    note: string,
    order_code: string,
    order_items: order_item[],
    point_value_used: number,
    promo : string,
    promo_id: number,
    promo_value: number,
    status: string,
    table: table,
    table_id: number,
    total_price: number,
    updated_at: string,
    is_rated: boolean,
    payment_method: string,
    history_point: point[],
}