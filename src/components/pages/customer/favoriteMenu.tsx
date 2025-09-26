import SectionPage from "@/components/atoms/sectionPage";
import { useState, useEffect } from "react";
import GridMenu from "@/components/organism/gridMenu";
import { getFavoriteMenus, removeFavoriteMenu } from "@/api/favoriteMenu";
import MenuFilterBar from "@/components/organism/menuFilterBar";
import type { MenuProps } from "@/types/menu";
import { Text } from "@/components/atoms/text";
import { useCartStore } from "@/components/store/cart";
import { useUIStore } from "@/components/store/useUIStore";
import { Pages } from "@/components/atoms/page";
import Modal from "@/components/organism/modal";
import CardProduk from "@/components/molecules/cardProduk";
import Star from "@/components/icons/star";
import { formatRupiah } from "@/const/idrCurrency";
import CartIcon from "@/components/icons/cart";
import Cart from "@/components/organism/cart";
import { useMenu } from "@/components/store/useMenu";

export default function FavoriteMenuPage() {
  const {
    listMenu,
    isLoading,
    fetchMenuData,
    getMenuRating,
  } = useMenu();

  const [favoriteMenus, setFavoriteMenus] = useState<MenuProps[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<MenuProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MenuProps | null>(
    null
  );
  const [isFetchingFavorites, setIsFetchingFavorites] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const open = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const isModalOpen = useUIStore((state) => state.activeModal === "cart");
  const isDetailProductOpen = useUIStore(
    (state) => state.activeModal === "detailProduct"
  );

  const handleAddToCartAndClose = () => {
    addToCart(selectedProduct!);
    close();
  };

  const fetchData = async () => {
    try {
      setIsFetchingFavorites(true);
      if (listMenu.length === 0) {
        await fetchMenuData();
      }
      const data = await getFavoriteMenus();

      const favoriteIds = data.map((fav: any) => fav.menu_id);
      const favorites = listMenu.filter((menu) =>
        favoriteIds.includes(menu.id)
      );
      setFavoriteMenus(favorites);
      setIsFetchingFavorites(false);
    } catch (error) {
      console.error("Error fetching favorite menus:", error);
    }
  };
  const handleFavoriteClick = async (product: MenuProps) => {
    let updatedFavorites;
    await removeFavoriteMenu(product.id);
    updatedFavorites = favoriteMenus.filter((menu) => menu.id !== product.id);
    setFavoriteMenus(updatedFavorites);
  };
  useEffect(() => {
    if (listMenu.length > 0) {
      fetchData();
    }
  }, [listMenu.length]);

  useEffect(() => {
    if (listMenu.length === 0) {
      fetchMenuData();
    }
  }, []);

  return (
    <SectionPage variant="top" className="h-dvh flex flex-col">
      <div
        className="absolute p-2 sm:p-4 rounded-full bg-white bottom-4 z-10 right-4  shadow-2xl shadow-black"
        onClick={() => open("cart")}
      >
        <CartIcon className="size-5 sm:size-7 text-primary " />
      </div>
      <Pages className="w-full h-full flex flex-col gap-4">
        <MenuFilterBar onFilter={setFilteredMenu} menuList={favoriteMenus} />
        {isLoading || isFetchingFavorites ? (
          <div className="flex justify-center items-center h-full">
            <Text size="heading2" className="text-pretty">
              Loading favorite menus...
            </Text>
          </div>
        ) : favoriteMenus.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Text size="heading1" className="text-pretty">
              Tidak ada menu favorit
            </Text>
          </div>
        ) : (
          <div className="h-full mx-auto md:m-0 overflow-y-auto scrollbar-hide">
            <GridMenu
              filteredMenu={filteredMenu.length ? filteredMenu : favoriteMenus}
              addToCart={addToCart}
              onProductClick={(product) => {
                setSelectedProduct(product);
                open("detailProduct");
              }}
              onFavoriteClick={(product) => {
                handleFavoriteClick(product);
              }}
              favoriteIds={favoriteMenus.map((menu) => menu.id)}
              getMenuRating={getMenuRating}
              gridType="full"
            />
          </div>
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
                onFavoriteClick={() => handleFavoriteClick(selectedProduct!)}
                isFavorite={favoriteMenus
                  .map((menu) => menu.id)
                  .includes(selectedProduct?.id!)}
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
      </Pages>
      {isModalOpen && (
        <Modal
          isModalActive={isModalOpen}
          size="cart"
          position="center"
          background="white"
          rounded="default"
          padding="default"
          children={
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              classname="lg:border-0 lg:pl-0"
            />
          }
        />
      )}
    </SectionPage>
  );
}
