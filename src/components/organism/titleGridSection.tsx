import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Pages, type PagesProps } from "../atoms/page";
import TitleDescription, {
  type TitleDescriptionProps,
} from "../molecules/titleDescription";


const titleGridSectionVariants = cva(
  "flex flex-col",
  {
    variants: {
      layout: {
        default: "",
        bestProduct:
          "grid grid-cols-1 md:grid-cols-3 ",
        special: "items-center md:flex-row md:justify-between",
      },
      gap:{
        default: "",
        bestProduct: "gap-10 xs:gap-15 sm:gap-20 md:gap-5 lg:gap-7.5 xl:gap-10 2xl:gap-12.5",
        special:"gap-15 md:gap-0",
      }
    },
    defaultVariants: {
      layout: "bestProduct",
    },
  }
);
export interface TitleGridSectionProps
  extends VariantProps<typeof titleGridSectionVariants> {
  className?: string;
  pagesProps?: Omit<PagesProps, "children">;
  children?: React.ReactNode;
  titleDescriptionProps?: TitleDescriptionProps;
}
const TitleGridSection = React.forwardRef<
  HTMLDivElement,
  TitleGridSectionProps
>(
  (
    {
      className,
      layout,
      pagesProps,
      titleDescriptionProps,
      children,
      gap 
    },
    ref
  ) => {
    return (
      <Pages {...pagesProps} ref={ref}>
        <TitleDescription
          {...titleDescriptionProps}
        />
        <div className={cn(titleGridSectionVariants({ layout,gap }), className)}>
          {children}
        </div>
      </Pages>
    );
  }
);

TitleGridSection.displayName = "TitleGridSection";
export { TitleGridSection };
