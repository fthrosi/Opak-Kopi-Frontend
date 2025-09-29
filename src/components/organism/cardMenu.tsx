import { cn } from "@/lib/utils";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import TitleContain, {
  type TitleContainProps,
} from "../molecules/titleContain";
import { Text } from "../atoms/text";
import { formatRupiah } from "@/const/idrCurrency";
import { Button, type ButtonProps } from "../atoms/button";

const cardProdukVariants = cva(
  "flex flex-col rounded-lg overflow-hidden hover:shadow-md aspect-[52/80] bg-white",
  {
    variants: {
      layout: {
        default:
          "w-[clamp(9.2rem,45.3vw,15.2rem)] sm:w-[clamp(12rem,27vw,13rem)] md:w-[clamp(14.5rem,26.6vw,17rem)] lg:w-[clamp(12rem,18.7vw,16rem)] xl:w-[15rem] 2xl:w-[18rem]",
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
export interface CardMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardProdukVariants> {
  className?: string;
  children?: React.ReactNode;
  contentClassName?: string;
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
  buttonProps?: ButtonProps
  imageSrc: string;
  onClick?: () => void;
  price?: number;
  status?: string;
}
export default function CardMenu({
  className,
  imageSrc,
  layout,
  titleProps,
  contentClassName,
  onClick,
  children,
    buttonProps,
    price = 0,
    status
}: CardMenuProps) {
  return (
    <div className={cn(cardProdukVariants({ layout }), className)}>
      <div className="h-3/5 w-full relative">
        <img className={`h-full w-full`} src={imageSrc} />
      </div>

      <div className={cn("z-10 h-2/5", contentClassName)}>
        <TitleContain title={titleProps?.title || "Title"} {...titleProps} />
        <Text className="text-[clamp(0.6rem,2.6vw,0.9rem)] sm:text-[clamp(0.8rem,1.9vw,0.9rem)] md:text-[1rem] lg:text-[clamp(0.8rem,1.26vw,1rem)] 2xl:text-[1.3rem]" textColor="secondary">{formatRupiah({value:price})}</Text>
        <div className="flex gap-1">
            <Text className="text-[clamp(0.6rem,2.6vw,0.9rem)] sm:text-[clamp(0.8rem,1.9vw,0.9rem)]  lg:text-[0.8rem] 2xl:text-[0.9rem]" textColor="secondary">Status :</Text>
            <Text className="text-[clamp(0.6rem,2.6vw,0.9rem)] sm:text-[clamp(0.8rem,0.9.9vw,0.9rem)] lg:text-[0.8rem] 2xl:text-[0.9rem] capitalize">{status}</Text>
        </div>
        <Button onClick={onClick} {...buttonProps}>{children}</Button>
      </div>
    </div>
  );
}
