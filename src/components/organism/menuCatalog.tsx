import { menuMakanan } from "@/const/menu";
import { Pages } from "../atoms/page";
import { useState } from "react";
import { useCartStore } from "../store/cart";
import MenuFilterBar from "./menuFilterBar";
import GridMenu from "./gridMenu";
import Cart from "./cart";
export default function MenuCatalog() {
  const [filteredMenu, setFilteredMenu] = useState<typeof menuMakanan>([]);
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <Pages className="flex flex-row justify-between bg-broken h-full">
      <div className="flex flex-col gap-6 w-full lg:mr-3">
        <MenuFilterBar onFilter={setFilteredMenu}/>
        <div className="h-full mx-auto md:m-0 overflow-y-auto scrollbar-hide">
          <GridMenu filteredMenu={filteredMenu.length ? filteredMenu : menuMakanan} addToCart={addToCart} />
        </div>
      </div>
      <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} />
    </Pages>
  );
}
