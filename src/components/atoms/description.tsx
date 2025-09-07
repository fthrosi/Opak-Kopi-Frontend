import { cn } from "@/lib/utils";
import {Text, type TextVariantProps} from "./text";
import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

const descriptionVariants = cva("", {
  variants: {
    variant: {
      hero: "text-[clamp(0.5rem,2vw,0.7rem)] xs:text-[clamp(0.7rem,2.3vw,0.9rem)] sm:text-[clamp(0.9rem,2.6vw,1.2rem)] md:text-[clamp(0.8rem,1.6vw,1rem)]",
      about:"text-[clamp(0.55rem,2.6vw,0.85rem)] sm:text-[clamp(0.85rem,2.1vw,1rem)] md:text-[clamp(0.65rem,1.4vw,0.9rem)] lg:text-[clamp(0.8rem,1.15vw,0.9rem)] xl:text-[clamp(0.9rem,1.1vw,1.125rem)] 2xl:text-[1.125rem]"
    },
    width: {
      default: "w-full",
      hero: "w-[clamp(12.5rem,49.3vw,16.5rem)] xs:w-[clamp(16.5rem,56.5vw,22rem)] sm:w-[clamp(22rem,64vw,29rem)] md:w-[clamp(20rem,40vw,25rem)]",
      about:"md:w-[clamp(22rem,44.3vw,28.3rem)] lg:w-[clamp(26rem,40.3vw,32.2rem)] xl:w-[clamp(28rem,38vw,38rem)] 2xl:w-[38rem]"
    },
  },
  defaultVariants: {
    variant: "hero",
    width: "default",
  },
});
type DescriptionVariantProps = VariantProps<typeof descriptionVariants>;
export interface DescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    DescriptionVariantProps {
      description: string;
      className?: string;
      textProps?: TextVariantProps<React.ElementType>;
}
const Description = React.forwardRef<HTMLParagraphElement, DescriptionProps>(
  (
    {
      description,
      className,
      textProps,
      variant,
      width,
    },
    ref
  ) => {
    return (
      <Text
        ref={ref}
        {...textProps}
        className={cn(
          descriptionVariants({ variant, width }),
          className
        )}
      >
        {description}
      </Text>
    );
  }
);
Description.displayName = "Description";
export {Description, descriptionVariants };
