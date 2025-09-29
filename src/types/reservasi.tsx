

type users = {
    id: number;
    name: string;
    email: string;
    phone: string;
}
export type Reservasi = {
    cancellation_reason: string | null;
    created_at: string;
    id: number;
    reservation_code: string;
    reservation_time: string;
    number_of_guest: number;
    status: string;
    updated_at: string;
    users: users;
    checkin_code: string;
}