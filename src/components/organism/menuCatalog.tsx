import type { MenuProps } from "@/types/menu";
import { Pages } from "../atoms/page";
import { useState, useEffect } from "react";
import { useCartStore } from "../store/cart";
import MenuFilterBar from "./menuFilterBar";
import GridMenu from "./gridMenu";
import Cart from "./cart";
import CartIcon from "../icons/cart";
import { useUIStore } from "../store/useUIStore";
import { fetchMenu } from "@/api/menu";
import Modal from "./modal";
import CardProduk from "../molecules/cardProduk";
import Star from "../icons/star";
import { Text } from "../atoms/text";
import { formatRupiah } from "@/const/idrCurrency";
import {
  addFavoriteMenu,
  removeFavoriteMenu,
  getFavoriteMenus,
} from "@/api/favoriteMenu";

export default function MenuCatalog() {
  const [listMenu, setListMenu] = useState<MenuProps[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<MenuProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MenuProps | null>(
    null
  );
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const isModalOpen = useUIStore((state) => state.activeModal === "cart");
  const isDetailProductOpen = useUIStore(
    (state) => state.activeModal === "detailProduct"
  );
  const open = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const handleAddToCartAndClose = () => {
    addToCart(selectedProduct!);
    close();
  };
  const fetchFavoriteMenu = async () => {
    const res = await getFavoriteMenus();
    const ids = res.map((fav: any) => fav.menu_id);
    setFavoriteIds(ids);
  };
  const fetchData = async () => {
    const data = await fetchMenu();
    console.log(data.data);
    setListMenu(data.data);
  };
  useEffect(() => {
    fetchData();
    fetchFavoriteMenu();
  }, []);
  const handleFavoriteClick = (product: MenuProps) => {
    let updatedFavorites;
    if (favoriteIds.includes(product.id)) {
      removeFavoriteMenu(product.id);
      updatedFavorites = favoriteIds.filter((id) => id !== product.id);
    } else {
      addFavoriteMenu(product.id);
      updatedFavorites = [...favoriteIds, product.id];
    }
    setFavoriteIds(updatedFavorites);
  };
  return (
    <Pages className="relativeflex flex-row justify-between bg-broken h-full">
      <div className="relative flex flex-col gap-6 w-full lg:mr-3">
        <MenuFilterBar onFilter={setFilteredMenu} menuList={listMenu} />
        {listMenu.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Text size="heading1" className="text-pretty">
              Menu tidak tersedia
            </Text>
          </div>
        ) : (
          <div className="h-full mx-auto md:m-0 overflow-y-auto scrollbar-hide">
            <GridMenu
              filteredMenu={filteredMenu.length ? filteredMenu : listMenu}
              addToCart={addToCart}
              onProductClick={(product) => {
                setSelectedProduct(product);
                open("detailProduct");
              }}
              onFavoriteClick={handleFavoriteClick}
              favoriteIds={favoriteIds}
            />
          </div>
        )}
        <div
          className="absolute p-2 sm:p-4 rounded-full bg-white bottom-4 z-10 right-3  shadow-2xl shadow-black lg:hidden"
          onClick={() => open("cart")}
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
        <Modal
          isModalActive={isModalOpen}
          size="cart"
          position="center"
          background="white"
          rounded="default"
          padding="default"
          className="lg:hidden"
          children={
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
      )}
      {isDetailProductOpen && (
        <Modal
          isModalActive={isDetailProductOpen}
          size="full"
          position="center"
          background="white"
          rounded="default"
          padding="default"
          className="px-3"
          modalClassName="max-w-[20rem]"
          children={
            <CardProduk
              imageSrc={selectedProduct?.image_url || ""}
              onFavoriteClick={() => handleFavoriteClick(selectedProduct!)}
              isFavorite={favoriteIds.includes(selectedProduct?.id!)}
              layout="custom"
              contentClassName="flex flex-col justify-between pt-2 px-1"
              className="hover:shadow-none"
              favoriteClassName="left-1"
              titleProps={{
                className:
                  "flex-row justify-between items-center text-[clamp(1.125rem,3.8vw,1.25rem)]",
                title: selectedProduct?.name || "",
                titleWeight: "semiBold",
                titleColor: "secondary",
                children: (
                  <div className="flex items-center">
                    <Star className="size-[0.60rem] 2xl:size-4 text-amber-300 mr-1" />
                    <Text className="text-[0.7rem] 2xl:text-[1.1rem]">
                      {selectedProduct?.rating ?? 0}
                    </Text>
                  </div>
                ),
              }}
              buttonProps={{
                buttonVariant: "default",
                button: true,
                children: "Masukan Keranjang",
                buttonClassName: "py-[0.4rem] text-[0.8rem] ",
              }}
              textProps={{
                text: formatRupiah({
                  value: Number(selectedProduct?.current_price),
                }),
                textAs: "p",
                textColor: "secondary",
                textSize: "body",
              }}
              buttonTextProps={{
                className:
                  "gap-[clamp(0.25rem,2.3vw,0.75rem)] sm:gap-[0.65rem] lg:gap-[clamp(0.4rem,1vw,0.8rem)] 2xl:gap-4",
              }}
              descriptionProps={{
                children: selectedProduct?.description || "",
                size: "caption",
                textColor: "primary",
                position: "justify",
                className: "opacity-60",
              }}
              onButtonClick={handleAddToCartAndClose}
            />
          }
        />
      )}
    </Pages>
  );
}
