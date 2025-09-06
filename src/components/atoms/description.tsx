import { cn } from "@/lib/utils";
import {Text} from "./text";
import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

const descriptionVariants = cva("", {
  variants: {
    variant: {
      hero: "text-[clamp(0.5rem,2vw,0.7rem)] xs:text-[clamp(0.7rem,2.3vw,0.9rem)] sm:text-[clamp(0.9rem,2.6vw,1.2rem)] md:text-[clamp(0.8rem,1.6vw,1rem)]",
    },
    width: {
      hero: "w-[clamp(12.5rem,49.3vw,16.5rem)] xs:w-[clamp(16.5rem,56.5vw,22rem)] sm:w-[clamp(22rem,64vw,29rem)] md:w-[clamp(20rem,40vw,25rem)]",
    },
    textColor: {
      hero: "text-broken",
    },
  },
  defaultVariants: {
    variant: "hero",
    width: "hero",
    textColor: "hero",
  },
});
type DescriptionVariantProps = VariantProps<typeof descriptionVariants>;
export interface DescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    DescriptionVariantProps {
      description: string;
      className?: string;
      weight?: "bold" | "light" | "normal" | "semiBold";
}
const Description = React.forwardRef<HTMLParagraphElement, DescriptionProps>(
  (
    {
      description,
      className,
      weight = "normal",
      variant,
      width,
      textColor,
    },
    ref
  ) => {
    return (
      <Text
        ref={ref}
        as="p"
        className={cn(
          descriptionVariants({ variant, width, textColor }),
          className
        )}
        weight={weight}
      >
        {description}
      </Text>
    );
  }
);
Description.displayName = "Description";
export {Description, descriptionVariants };
