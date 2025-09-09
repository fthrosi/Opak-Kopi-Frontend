import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Pages, type PagesProps } from "../atoms/page";
import TitleDescription, {
  type TitleDescriptionProps,
} from "../molecules/titleDescription";


const titleGridSectionVariants = cva(
  "flex flex-col items-center justify-center",
  {
    variants: {
      layout: {
        bestProduct:
          "grid grid-cols-1 gap-10 xs:gap-15 sm:gap-20 md:grid-cols-3 md:gap-5 lg:gap-7.5 xl:gap-10 2xl:gap-12.5",
      },
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
      children
    },
    ref
  ) => {
    return (
      <Pages {...pagesProps} ref={ref}>
        <TitleDescription
          {...titleDescriptionProps}
        />
        <div className={cn(titleGridSectionVariants({ layout }), className)}>
          {children}
        </div>
      </Pages>
    );
  }
);

TitleGridSection.displayName = "TitleGridSection";
export { TitleGridSection };
