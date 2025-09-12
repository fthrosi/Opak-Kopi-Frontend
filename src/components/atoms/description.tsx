import { cn } from "@/lib/utils";
import { Text, type TextVariantProps } from "./text";
import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

const descriptionVariants = cva("", {
  variants: {
    width: {
      default: "w-full",
      hero: "w-[clamp(12.5rem,72vw,23.7rem)] xs:w-[23.7rem] md:w-[clamp(23.7rem,39vw,24.938rem)] lg:w-[clamp(24.93rem,34vw,25.6rem)] xl:w-[clamp(25.6rem,32vw,27.2rem)]",
      about:
        "md:w-[clamp(22rem,44.3vw,28.3rem)] lg:w-[clamp(26rem,40.3vw,32.2rem)] xl:w-[clamp(28rem,38vw,38rem)] 2xl:w-[38rem]",
      bestProduct: "w-[clamp(17rem,56.4vw,19rem)] xs:w-[clamp(19rem,62vw,21rem)] md:w-[clamp(21rem,36vw,22.5rem)] lg:w-[clamp(25.625rem,40vw,27rem)] xl:w-[clamp(27rem,33vw,29rem)]",
      special: "w-[clamp(14rem,69vw,23rem)] md:w-[clamp(20.9rem,42.3vw,27rem)]",
      custom: "",
    },
  },
  defaultVariants: {
    width: "default",
  },
});
type DescriptionVariantProps = VariantProps<typeof descriptionVariants>;
export interface DescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    DescriptionVariantProps {
  description: string;
  className?: string;
  textAs?: TextVariantProps<React.ElementType>["as"];
  textSize?: TextVariantProps<React.ElementType>["size"];
  textWeight?: TextVariantProps<React.ElementType>["weight"];
  textFamily?: TextVariantProps<React.ElementType>["family"];
  textPosition?: TextVariantProps<React.ElementType>["position"];
  textColor?: TextVariantProps<React.ElementType>["textColor"];
  textProps?: Omit<TextVariantProps<React.ElementType>, "as" | "size" | "weight" | "family" | "position" | "textColor" | "className" | "children">;
}
const Description = React.forwardRef<HTMLParagraphElement, DescriptionProps>(
  ({ description, className, textProps, width, textAs, textSize, textWeight, textFamily, textPosition, textColor }, ref) => {
    return (
      <Text
        ref={ref}
        as={textAs}
        size={textSize}
        weight={textWeight}
        family={textFamily}
        position={textPosition}
        textColor={textColor}
        {...textProps}
        className={cn(descriptionVariants({ width }), className)}
      >
        {description}
      </Text>
    );
  }
);
Description.displayName = "Description";
export { Description, descriptionVariants };
