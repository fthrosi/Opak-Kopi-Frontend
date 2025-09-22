// import { menuMakanan } from "@/const/menu";

import type { MenuProps } from "@/types/menu";
import { Pages } from "../atoms/page";
import { useState,useEffect } from "react";
import { useCartStore } from "../store/cart";
import MenuFilterBar from "./menuFilterBar";
import GridMenu from "./gridMenu";
import Cart from "./cart";
import CartIcon from "../icons/cart";
import { useUIStore } from "../store/useUIStore";
import CloseIcon from "@/components/atoms/icons/close";
import { fetchMenu } from "@/api/menu";

export default function MenuCatalog() {
  const [listMenu, setListMenu] = useState<MenuProps[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<MenuProps[]>([]);
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const isModalOpen = useUIStore((state) => state.activeStates.modal);
  const toggleModal = useUIStore((state) => state.toggle);

  const fetchData = async () => {
      const data = await fetchMenu();
      setListMenu(data.data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    console.log(listMenu);
  return (
    <Pages className="relativeflex flex-row justify-between bg-broken h-full">
      <div className="relative flex flex-col gap-6 w-full lg:mr-3">
        <MenuFilterBar onFilter={setFilteredMenu} menuList={listMenu} />
        <div className="h-full mx-auto md:m-0 overflow-y-auto scrollbar-hide">
          <GridMenu
            filteredMenu={filteredMenu.length ? filteredMenu : listMenu}
            addToCart={addToCart}
          />
        </div>
        <div
          className="absolute p-2 sm:p-4 rounded-full bg-white bottom-4 z-10 right-3  shadow-2xl shadow-black lg:hidden"
          onClick={() => toggleModal("modal")}
        >
          <CartIcon className="size-5 sm:size-7 text-primary " />
        </div>
        
      </div>
      <div className="w-[28.3rem] hidden lg:block">
        <Cart
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </div>
      {isModalOpen && (
          <div className="transition-transform duration-300 ease-in-out  absolute flex items-center justify-center z-20 h-full bg-black/30 left-0 w-full">
            <div className="relative bg-white w-[19rem] xs:w-[25rem] p-2 rounded-lg h-[45rem]">
              <CloseIcon className=" text-primary absolute top-2 right-2" onClick={() => toggleModal("modal")} />
              <Cart
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            </div>
          </div>
        )}
    </Pages>
  );
}
