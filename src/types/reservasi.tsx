type userReservasi = {
    id: number;
    name: string;
}
export type Reservasi = {
    cancellation_reason: string | null;
    created_at: string;
    id: number;
    reservation_code: string;
    reservation_time: string;
    status: string;
    updated_at: string;
    users: userReservasi;
    checkin_code: string;
}