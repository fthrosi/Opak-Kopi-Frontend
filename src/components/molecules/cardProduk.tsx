import { cn } from "@/lib/utils";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import ButtonText, { type ButtonTextProps } from "./buttonText";
import TitleContain, { type TitleContainProps } from "./titleContain";
import { Text, type TextVariantProps } from "../atoms/text";
import { useUIStore } from "../store/useUIStore";
import { HeartFill } from "../icons/heartFill";

const cardProdukVariants = cva(
  "flex flex-col rounded-lg overflow-hidden hover:shadow-md aspect-[52/80] bg-white",
  {
    variants: {
      layout: {
        default:
          "w-[clamp(9.2rem,45.3vw,15.2rem)] sm:w-[clamp(12rem,27vw,13rem)] md:w-[clamp(14.5rem,26.6vw,17rem)] lg:w-[clamp(12rem,18.7vw,16rem)] xl:w-[15rem] 2xl:w-[18rem]",
        kasir : "w-[clamp(9.2rem,45.3vw,15.2rem)] sm:w-[clamp(12rem,27vw,13rem)] md:w-[clamp(14.5rem,26.6vw,17rem)] lg:w-[clamp(9rem,16vw,14rem)] xl:w-[14rem] 2xl:w-[clamp(15rem,16.6vw,18rem)]",
        sm: "w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52 2xl:w-56",
        lg: "w-48 sm:w-52 md:w-56 lg:w-60 xl:w-64 2xl:w-72",
        xl: "w-56 sm:w-60 md:w-64 lg:w-72 xl:w-80 2xl:w-96",
        custom: "",
      },
    },
    defaultVariants: {
      layout: "default",
    },
  }
);
export interface CardProdukProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardProdukVariants> {
  className?: string;
  contentClassName?: string;
  onclick?: () => void;
  isFavorite?: boolean;
  textProps?: Pick<
    ButtonTextProps,
    | "text"
    | "textAs"
    | "textFamily"
    | "textWeight"
    | "textPosition"
    | "textColor"
    | "textClassName"
    | "textSize"
  >;
  buttonProps?: Pick<
    ButtonTextProps,
    | "buttonText"
    | "buttonVariant"
    | "buttonClassName"
    | "buttonAsChild"
    | "button"
    | "children"
  >;
  buttonTextProps?: Omit<
    ButtonTextProps,
    | "text"
    | "textAs"
    | "textFamily"
    | "textWeight"
    | "textPosition"
    | "textColor"
    | "textClassName"
    | "textSize"
    | "buttonText"
    | "buttonVariant"
    | "buttonClassName"
    | "buttonAsChild"
    | "button"
    | "children"
  >;
  titleProps?: Pick<
    TitleContainProps,
    | "className"
    | "title"
    | "titleAs"
    | "titleSize"
    | "titleWeight"
    | "titleFamily"
    | "titlePosition"
    | "titleColor"
    | "titleWidth"
    | "titleStroke"
    | "titleStrokeSize"
    | "titleStrokeColor"
    | "titleClassName"
    | "titleTextClassName"
    | "titleStrokeClassName"
    | "position"
    | "children"
  >;
  imageSrc: string;
  onButtonClick?: () => void;
  descriptionProps?: Pick<
    TextVariantProps<React.ElementType>,
    | "as"
    | "size"
    | "className"
    | "weight"
    | "family"
    | "position"
    | "textColor"
    | "children"
  >;
  onClick?: () => void;
  onFavoriteClick?: () => void;
  favoriteClassName?: string;
  isCustomer?: boolean;
}
export default function CardProduk({
  className,
  imageSrc,
  onButtonClick,
  layout,
  titleProps,
  textProps,
  buttonProps,
  buttonTextProps,
  contentClassName,
  descriptionProps,
  onClick,
  onFavoriteClick,
  isFavorite = false,
  favoriteClassName,
  isCustomer = true,
}: CardProdukProps) {
  const detailProduct = useUIStore((state) => state.activeModal);
  return (
    <div
      className={cn(cardProdukVariants({ layout }), className)}
      onClick={onClick}
    >
      <div className="h-3/5 w-full relative">
        <img className={`h-full w-full`} src={imageSrc} />
        {isCustomer && (
          <div
            className={cn(
              "absolute top-1 p-2 rounded-full bg-white/90",
              favoriteClassName
            )}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick?.();
            }}
          >
            <HeartFill
              className={`w-5 h-4.5  ${
                isFavorite ? "text-primary" : "text-white"
              }`}
            />
          </div>
        )}
      </div>

      <div className={cn("z-10 h-2/5", contentClassName)}>
        <TitleContain title={titleProps?.title || "Title"} {...titleProps} />
        {detailProduct && <Text {...descriptionProps} />}
        <ButtonText
          {...textProps}
          {...buttonProps}
          {...buttonTextProps}
          text={textProps?.text || "Button"}
          buttonProps={{
            onClick: (e) => {
              e.stopPropagation();
              onButtonClick?.();
            },
            size: "custom",
          }}
        />
      </div>
    </div>
  );
}
