type role = {
  name: string;
};
export type User = {
  userId: string;
  email: string;
  name: string;
  phone: string;
  img: string;
  poin: number;
  role: role;
  status: string;
};

export type updateEmail = {
  email: string;
  password: string;
};

export type updatePassword = {
  currentPassword: string;
  newPassword: string;
};

export type buttonProfile = {
    id: number;
    title: string;
    field: string;
    background: string;
};

export type UserOwner = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: role;
  status: string;
};

export type UserCustomer = {
  id: string;
  email: string;
  name: string;
  created_at: string;
  total_orders: number | null;
  total_transactions: number | null;
  last_order_date: string | null;
  status: string;
}