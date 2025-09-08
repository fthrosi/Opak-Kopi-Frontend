import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import {Pages, type PagesProps} from "../atoms/page";
import TitleDescription,{type TitleDescriptionProps} from "../molecules/titleDescription";
import { CardFeature, type CardFeaturedProps } from "../molecules/cardFeatured";

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
type cardItem = {
  id: number;
  name: string;
 image: string;
}
export interface TitleGridSectionProps
  extends VariantProps<typeof titleGridSectionVariants> {
  className?: string;
  pagesProps?: Omit<PagesProps, "children">;
  titleDescriptionProps?: TitleDescriptionProps;
  cardFeaturedProps?: CardFeaturedProps;
  data: cardItem[];
}
const TitleGridSection = React.forwardRef<
  HTMLDivElement,
  TitleGridSectionProps
>(({titleDescriptionProps, className, layout, pagesProps, cardFeaturedProps,data }, ref) => {
  return (
    <Pages
      {...pagesProps}
      ref={ref}
    >
      <TitleDescription
        {...titleDescriptionProps}
      />
      <div className={cn(titleGridSectionVariants({ layout }), className)}>
        {data.map((item) => (
          <CardFeature
            {...cardFeaturedProps}
            src={item.image}
            alt={item.name}
            text={item.name}
            key={item.id}
          />
        ))} 
      </div>
    </Pages>
  );
});

TitleGridSection.displayName = "TitleGridSection";
export { TitleGridSection };
