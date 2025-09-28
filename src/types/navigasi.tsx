export type SecondNavigasi = {
  id: number;
  title: string;
  label: string;
};
export type NavigasiProfile = {
  id: number;
  title: string;
  path?: string;
  action?: "logout" | "navigate";
};

export type NavigasiKasir = {
  id: number;
  title: string;
  path: string;
  icon: React.ReactNode;
}
