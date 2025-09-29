
export type User = {
  userId: string;
  email: string;
  name: string;
  phone: string;
  img: string;
  poin: number;
  role: string;
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