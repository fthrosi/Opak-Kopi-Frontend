import { create } from "zustand";

type UIKey = "sidebar";
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
  | "logout";
export type dropdownKey = "profile";
interface UIState {
  activeStates: Record<UIKey, boolean>;
  toggle: (key: UIKey) => void;

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
  activeStates: {
    sidebar: false,
  },
  activeDropdown: null,
  openDropdown: (key: dropdownKey) => set(() => ({ activeDropdown: key })),
  closeDropdown: () => set(() => ({ activeDropdown: null })),

  activeModal: null,
  open: (key: modalKey) => set(() => ({ activeModal: key })),
  close: () => set(() => ({ activeModal: null })),
  toggle: (key: UIKey) =>
    set((state) => ({
      activeStates: {
        ...state.activeStates,
        [key]: !state.activeStates[key],
      },
    })),
  scrollY: 0,
  setScrollY: (y: number) => set(() => ({ scrollY: y })),
}));
