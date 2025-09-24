import { create } from "zustand";

type CheckoutState = {
  finalTotal: number;
  id_promo?: number;
    point_use?: number;
    validPromo?: boolean;
    validPoin?: boolean;
  setFinalTotal: (value: number) => void;
  setIdPromo: (id_promo?: number) => void;
  setPointUse: (point_use: number) => void;
  setValidPromo: (validPromo: boolean) => void;
  setValidPoin: (validPoin: boolean) => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  finalTotal: 0,
  id_promo: undefined,
    point_use: 0,
    validPromo: true,
    validPoin: true,
  setFinalTotal: (value: number) => set({ finalTotal: value }),
  setIdPromo: (id_promo?: number) => set({ id_promo : id_promo }),
  setPointUse: (point_use: number) => set({ point_use : point_use }),
  setValidPromo: (validPromo: boolean) => set({ validPromo : validPromo }),
  setValidPoin: (validPoin: boolean) => set({ validPoin : validPoin }),
}));