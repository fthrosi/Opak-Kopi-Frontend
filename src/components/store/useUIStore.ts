import {create} from "zustand";

type UIKey = "sidebar" | "dropdown";
export type modalKey = "cart" | "detailProduct" | "detailPromo";
interface UIState {
  activeStates: Record<UIKey, boolean>;
  toggle: (key: UIKey) => void;

  activeModal : modalKey | null;
  open: (key: modalKey) => void;
  close: () => void;

  scrollY: number
  setScrollY: (y: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeStates: {
    sidebar: false,
    dropdown: false,
  },
  activeModal: null,
  open: (key: modalKey) => set(() => ({ activeModal: key })),
  close: () => set(() => ({ activeModal: null })),
  toggle: (key: UIKey) => set((state) => ({
      activeStates: {
      ...state.activeStates,
      [key]: !state.activeStates[key],
      },
  })),
  scrollY: 0,
  setScrollY: (y: number) => set(() => ({ scrollY: y })),
}))