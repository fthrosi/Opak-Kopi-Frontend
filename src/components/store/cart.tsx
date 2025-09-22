import { create } from "zustand";
import { persist } from "zustand/middleware";
export type CartItem = {
    id: number;
    name: string;
    current_price: number;
    qty: number;
    image_url: string;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>{
        console.log("addToCart called with:", item);
        set((state) => {
          const exist = state.cart.find((i) => i.id === item.id);
          if (exist) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { cart: [...state.cart, { ...item, qty: 1 }] };
        });
      },
      removeFromCart: (id) =>
        set((state) => {
          const exist = state.cart.find((i) => i.id === id);
          if (!exist) return { cart: state.cart };
          if (exist.qty === 1) {
            return { cart: state.cart.filter((i) => i.id !== id) };
          }
          return {
            cart: state.cart.map((i) =>
              i.id === id ? { ...i, qty: i.qty - 1 } : i
            ),
          };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);