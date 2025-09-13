import {create} from "zustand";

type UIKey = "sidebar" | "modal" | "dropdown";
interface UIState {
  activeStates: Record<UIKey, boolean>;
  open: (key: UIKey) => void;
  close: (key: UIKey) => void;
  toggle: (key: UIKey) => void;
  scrollY: number
  setScrollY: (y: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeStates: {
    sidebar: false,
    modal: false,
    dropdown: false,
  },
  open: (key: UIKey) => set((state) => ({
    activeStates: {
      ...state.activeStates,
      [key]: true,
    },
  })),
  close: (key: UIKey) => set((state) => ({
    activeStates: {
      ...state.activeStates,
      [key]: false,
    },
  })),
  toggle: (key: UIKey) => set((state) => ({
      activeStates: {
      ...state.activeStates,
      [key]: !state.activeStates[key],
      },
  })),
  scrollY: 0,
  setScrollY: (y: number) => set(() => ({ scrollY: y })),
}))