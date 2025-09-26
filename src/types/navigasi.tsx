export type SecondNavigasi = {
  id: number;
  title: string;
};
export type NavigasiProfile = {
  id: number;
  title: string;
  path?: string;
  action?: "logout" | "navigate";
};
