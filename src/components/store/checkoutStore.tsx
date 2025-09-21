import { create } from "zustand";

type CheckoutState = {
  finalTotal: number;
  id_promo?: number;
    point_use?: number;
  setFinalTotal: (value: number) => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  finalTotal: 0,
  id_promo: undefined,
    point_use: 0,
  setFinalTotal: (value: number) => set({ finalTotal: value }),
}));