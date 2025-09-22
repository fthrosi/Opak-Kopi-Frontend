
import { formatRupiah } from "@/const/idrCurrency";
import CardProduk from "../molecules/cardProduk";
import Star from "../icons/star";
import { Text } from "../atoms/text";
import type { MenuProps } from "@/types/menu";
type GridMenuProps = {
  filteredMenu: Array<MenuProps>;
  addToCart: (item: any) => void;
};
export default function GridMenu({ filteredMenu, addToCart }: GridMenuProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 justify-items-center gap-[0.6rem] sm:gap-[clamp(0.6rem,2.5vw,1.2rem)]">
            {filteredMenu.map((item) => (
              <CardProduk
                key={item.id}
                imageSrc={item.image_url}
                contentClassName="flex flex-col justify-between px-[clamp(0.5rem,2.3vw,0.75rem)] py-[clamp(0.5rem,2.7vw,0.9rem)] sm:py-[0.8rem] md:py-[1.2rem] lg:py-[0.9rem]"
                titleProps={{
                  className: "flex-row justify-between items-center",
                  title: item.name,
                  titleClassName:
                    "text-[clamp(0.6rem,2.6vw,0.9rem)] sm:text-[clamp(0.8rem,1.9vw,0.9rem)] md:text-[clamp(1rem,1.9vw,1.2rem)] lg:text-[clamp(0.8rem,1.26vw,1rem)] xl:text-[1rem] 2xl:text-[1.3rem] text-wrap",
                  titleStroke: false,
                  titleSize: "custom",
                  titleWidth: "custom",
                  titleWeight: "semiBold",
                  titleColor: "secondary",
                  children: (
                    <div className="flex items-center">
                      <Star className="size-[clamp(0.5rem,2.3vw,0.75rem)] 2xl:size-4 text-amber-300 mr-1" />
                      <Text className="text-[clamp(0.55rem,2.4vw,0.8rem)] 2xl:text-base">
                        {item.rating ?? 0}
                      </Text>
                    </div>
                  ),
                }}
                buttonProps={{
                  buttonVariant: "default",
                  button: true,
                  children: "Masukan Keranjang",
                  buttonClassName:
                    "py-[clamp(0.25rem,1.5vw,0.5rem)] sm:py-[0.35rem] md:py-[clamp(0.35rem,1.04vw,0.5rem)] lg:py-[0.35rem] text-[clamp(0.6rem,2.37vw,0.8rem)] sm:text-[0.7rem] md:text-[clamp(0.7rem,1.4vw,0.9rem)] lg:text-[clamp(0.7rem,1.1vw,0.9rem)] 2xl:text-sm",
                }}
                textProps={{
                  text: formatRupiah({ value: item.current_price }),
                  textAs: "p",
                  textColor: "secondary",
                  textSize: "body",
                  textClassName:
                    "text-[clamp(0.6rem,2.6vw,0.9rem)] sm:text-[clamp(0.8rem,1.9vw,0.9rem)] md:text-[1.1rem] lg:text-[clamp(0.8rem,1.26vw,1rem)] 2xl:text-[1.3rem]",
                }}
                buttonTextProps={{
                  className:
                    "gap-[clamp(0.25rem,2.3vw,0.75rem)] sm:gap-[0.65rem] lg:gap-[clamp(0.4rem,1vw,0.8rem)] 2xl:gap-4",
                }}
                onButtonClick={() => addToCart(item)}
              />
            ))}
          </div>
  )
}
