import type { MenuProps } from "@/types/menu";
import { useState, useEffect } from "react";
import { useCartStore } from "@/components/store/cart";
import MenuFilterBar from "@/components/organism/menuFilterBar";
import GridMenu from "@/components/organism/gridMenu";
import Cart from "@/components/organism/cart";
import CartIcon from "@/components/icons/cart";
import { useUIStore } from "@/components/store/useUIStore";
import Modal from "@/components/organism/modal";
import CardProduk from "@/components/molecules/cardProduk";
import Star from "@/components/icons/star";
import { Text } from "@/components/atoms/text";
import { formatRupiah } from "@/const/idrCurrency";
import { useMenu } from "@/components/store/useMenu";

export default function TambahPesanan() {
  const {
    listMenu,
    isLoading,
    isRatingsLoading,
    fetchMenuData,
    getMenuRating,
  } = useMenu();
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

  const handleAddToCartAndClose = () => {
    addToCart(selectedProduct!);
    close();
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <div className="relative flex flex-row justify-between w-full bg-broken h-full px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 pt-7">
      <div className="relative flex flex-col gap-6 w-full lg:mr-3 h-full overflow-hidden">
        <div className="flex-shrink-0">
          <MenuFilterBar onFilter={setFilteredMenu} menuList={listMenu} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          {isLoading || isRatingsLoading ? (
            <div className="flex justify-center items-center h-full">
              <Text size="heading2" className="text-pretty">
                Loading menu...
              </Text>
            </div>
          ) : listMenu.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <Text size="heading1" className="text-pretty">
                Menu tidak tersedia
              </Text>
            </div>
          ) : (
            <div className="min-h-0 max-auto lg:m-0">
              <GridMenu
                filteredMenu={filteredMenu.length ? filteredMenu : listMenu}
                addToCart={addToCart}
                isCustomer={false}
                layout="kasir"
                onProductClick={(product) => {
                  setSelectedProduct(product);
                  open("detailProduct");
                }}
                getMenuRating={getMenuRating}
              />
            </div>
          )}
        </div>
        <div
          className="absolute p-2 sm:p-4 rounded-full bg-white bottom-4 z-10 right-3  shadow-2xl shadow-black lg:hidden"
          onClick={() => open("cart")}
        >
          <CartIcon className="size-5 sm:size-7 text-primary " />
        </div>
      </div>
      <div className="lg:w-[22rem] 2xl:w-[28.3rem] hidden lg:block h-full">
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
      {isDetailProductOpen && selectedProduct && (
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
                  <>
                    {getMenuRating(selectedProduct.id).averageRating > 0 && (
                      <div className="flex items-center">
                        <Star className="size-[clamp(0.5rem,2.3vw,0.75rem)] 2xl:size-4 text-amber-300 mr-1" />
                        <Text className="text-[clamp(0.55rem,2.4vw,0.8rem)] 2xl:text-base">
                          {getMenuRating(selectedProduct.id).averageRating}{" "}
                        </Text>
                        <Text className="text-[clamp(0.45rem,2.1vw,0.7rem)] 2xl:text-sm ml-1 opacity-60">
                          ({getMenuRating(selectedProduct.id).totalReviews})
                        </Text>
                      </div>
                    )}
                  </>
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
    </div>
  );
}
