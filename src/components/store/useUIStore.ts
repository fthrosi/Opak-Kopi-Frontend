import { create } from "zustand";
export type modalKey =
  | "cart"
  | "detailProduct"
  | "detailPromo"
  | "profilePicture"
  | "editUser"
  | "editEmail"
  | "editPassword"
  | "rating"
  | "ordersDetail"
  | "reservasiDetail"
  | "cancelReservasi"
  | "logout"
  | "detailPesanan"
  | "RejectOrder"
  | "printReceipt"
  | "detailReservasi"
  | "terimaReservasi"
  | "tolakReservasi"
  | "checkinReservasi"
  | "detailPesananOwner"
  | "detailReservasiOwner"
  | "editMenu"
  | "hapusMenu"
  | "tambahMenu"
  | "editPromo"
  | "statusPromo"
  | "hapusPromo"
  | "tambahPromo";
export type dropdownKey = "profile";
export type sidebarKey = "sidebarCustomer" | "sidebarStaf";
interface UIState {
  activeSidebar: sidebarKey | null;
  openSidebar: (key: sidebarKey) => void;
  closeSidebar: () => void;

  activeModal: modalKey | null;
  open: (key: modalKey) => void;
  close: () => void;

  activeDropdown: dropdownKey | null;
  openDropdown: (key: dropdownKey) => void;
  closeDropdown: () => void;

  scrollY: number;
  setScrollY: (y: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSidebar: null,
  openSidebar: (key: sidebarKey) => set(() => ({ activeSidebar: key })),
  closeSidebar: () => set(() => ({ activeSidebar: null })),

  activeDropdown: null,
  openDropdown: (key: dropdownKey) => set(() => ({ activeDropdown: key })),
  closeDropdown: () => set(() => ({ activeDropdown: null })),

  activeModal: null,
  open: (key: modalKey) => set(() => ({ activeModal: key })),
  close: () => set(() => ({ activeModal: null })),

  scrollY: 0,
  setScrollY: (y: number) => set(() => ({ scrollY: y })),
}));
