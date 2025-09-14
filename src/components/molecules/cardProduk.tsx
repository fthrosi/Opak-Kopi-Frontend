import { cn } from "@/lib/utils";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import ButtonText, { type ButtonTextProps } from "./buttonText";
import TitleContain, { type TitleContainProps } from "./titleContain";

const cardProdukVariants = cva(
  "flex flex-col rounded-lg overflow-hidden hover:shadow-md aspect-[52/70] bg-white",
  {
    variants: {
      layout: {
        default: "w-[16.25rem]",
        sm: "w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52 2xl:w-56",
        lg: "w-48 sm:w-52 md:w-56 lg:w-60 xl:w-64 2xl:w-72",
        xl: "w-56 sm:w-60 md:w-64 lg:w-72 xl:w-80 2xl:w-96",
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
  contentClassName
}: CardProdukProps) {
  return (
    <div className={cn(cardProdukVariants({ layout }), className)}>
      <div
        className={`h-3/5 w-full bg-[url(${imageSrc})] bg-cover bg-center`}
      />
      <div className={cn("px-4 py-3 z-10 h-2/5", contentClassName)}>
        <TitleContain
          title={titleProps?.title || "Title"}
          {...titleProps}
        />
        <ButtonText
          {...textProps}
          {...buttonProps}
          {...buttonTextProps}
          text={textProps?.text || "Button"}
          buttonProps={{ onClick: onButtonClick }}
        />
      </div>
    </div>
  );
}
