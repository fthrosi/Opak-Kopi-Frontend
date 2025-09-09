import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import ButtonText, { type ButtonTextProps } from "./buttonText";
import React from "react";
import Img, { type ImgVariantProps } from "../atoms/img";

const cardFeaturedVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "",
      bestProduct:
        "w-[clamp(15rem,53.5vw,18rem)] xs:w-[clamp(18rem,52.7vw,21rem)] md:w-[clamp(14.5rem,31vw,19.8rem)] lg:w-[clamp(18.16rem,28.9vw,23.063rem)] xl:w-[clamp(21rem,27.1vw,24.288rem)] 2xl:w-[25rem]",
      small:
        "p-3 w-[clamp(12rem,40vw,14rem)] xs:w-[clamp(14rem,38vw,16rem)] md:w-[clamp(12rem,25vw,15rem)] lg:w-[clamp(15rem,24vw,18rem)] xl:w-[clamp(17rem,22vw,19.5rem)] 2xl:w-[20rem] gap-3 xs:gap-5",
    },
    aspect: {
      bestProduct: "aspect-[100/129]",
    },
    background: {
      light: "bg-light-cokelat",
    },
    rounded: {
      lg: "rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    aspect: "bestProduct",
    background: "light",
    rounded: "lg",
  },
});

export interface CardFeaturedProps
  extends VariantProps<typeof cardFeaturedVariants> {
  className?: string;
  imgProps?: Omit<
    ImgVariantProps,
    "src" | "alt" | "variant" | "size" | "className"
  >;
  buttonTextProps?: Omit<
    ButtonTextProps,
    | "text"
    | "position"
    | "className"
    | "TextAs"
    | "textFamily"
    | "textWeight"
    | "textPosition"
    | "textColor"
    | "textClassName"
    | "textProps"
    | "buttonText"
    | "buttonVariant"
    | "buttonClassName"
    | "buttonAsChild"
    | "buttonProps"
    | "button"
    | "children"
  >;
  //img props
  src?: ImgVariantProps["src"];
  alt?: ImgVariantProps["alt"];
  imgvariant?: ImgVariantProps["variant"];
  imgsize?: ImgVariantProps["size"];
  imgClassName?: ImgVariantProps["className"];

  //text button props
  text?: ButtonTextProps["text"];
  textButtonClassName?: ButtonTextProps["className"];
  textButtonPosition?: ButtonTextProps["position"];
  //text props
  textAs?: ButtonTextProps["textAs"];
  textFamily?: ButtonTextProps["textFamily"];
  textWeight?: ButtonTextProps["textWeight"];
  textPosition?: ButtonTextProps["textPosition"];
  textColor?: ButtonTextProps["textColor"];
  textClassName?: ButtonTextProps["textClassName"];
  textProps?: ButtonTextProps["textProps"];
  //button props
  buttonText?: ButtonTextProps["buttonText"];
  buttonVariant?: ButtonTextProps["buttonVariant"];
  buttonClassName?: ButtonTextProps["buttonClassName"];
  buttonAsChild?: ButtonTextProps["buttonAsChild"];
  buttonProps?: ButtonTextProps["buttonProps"];
  button?: ButtonTextProps["button"];
  children?: ButtonTextProps["children"];
}

const CardFeature = React.forwardRef<HTMLDivElement, CardFeaturedProps>(
  (
    {
      variant,
      aspect,
      background,
      rounded,
      className,
      imgProps,
      buttonTextProps,
      src,
      alt,
      imgvariant,
      imgsize,
      imgClassName,
      text,
      textButtonClassName,
      textButtonPosition,
      textAs,
      textFamily,
      textWeight,
      textPosition,
      textColor,
      textClassName,
      textProps,
      buttonText,
      buttonVariant,
      buttonClassName,
      buttonAsChild,
      buttonProps,
      button,
      children,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardFeaturedVariants({ variant, aspect, background, rounded }),
          className
        )}
      >
        <Img
          src={src ? src : ""}
          alt={alt ? alt : ""}
          variant={imgvariant}
          size={imgsize}
          className={imgClassName}
          {...imgProps}
        />
        <ButtonText
          text={text ? text : ""}
          className={textButtonClassName}
          position={textButtonPosition}
          textAs={textAs}
          textFamily={textFamily}
          textWeight={textWeight}
          textPosition={textPosition}
          textColor={textColor}
          textClassName={textClassName}
          textProps={textProps}
          buttonText={buttonText}
          buttonVariant={buttonVariant}
          buttonClassName={buttonClassName}
          buttonAsChild={buttonAsChild}
          buttonProps={buttonProps}
          button={button}
          children={children}
          {...buttonTextProps}
        />
      </div>
    );
  }
);

CardFeature.displayName = "CardFeature";
export { CardFeature };
