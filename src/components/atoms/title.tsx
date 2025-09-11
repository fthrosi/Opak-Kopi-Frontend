import React from "react";
import {Text, type TextVariantProps} from "./text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const titleVariants = cva("relative", {
  variants: {
    width: {
      default: "w-full",
      hero: "w-[clamp(15rem,72vw,24rem)] xs:w-[clamp(24rem,69vw,27rem)] sm:w-[clamp(27rem,62.5vw,30rem)] md:w-[clamp(30rem,50vw,32rem)] lg:w-[clamp(32rem,49vw,38rem)] xl:w-[clamp(38rem,53.5vw,48rem)]",
      special: "w-[clamp(12.5rem,59.9vw,20rem)] md:w-[clamp(20rem,37.6vw,24rem)] lg:w-[clamp(23rem,36.3vw,29rem)] xl:w-[30rem]",
    }
  },
  defaultVariants: {
    width: "default",
  },
});
const textVariants = cva("", {
  variants: {
    strokeSize: {
      default:
        "text-stroke-2 xs:text-stroke-3 sm:text-stroke-4 md:text-stroke-5",
      special:
        "text-stroke-2 md:text-stroke-3 lg:text-stroke-4 xl:text-stroke-5",
    },
    strokeColor: {
      default: "stroke-color-primary",
      special: "stroke-color-secondary",
    },
  },
});
type TitleVariantProps = VariantProps<typeof titleVariants>;
type textVariantProps = VariantProps<typeof textVariants>;
export interface TitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TitleVariantProps,
    textVariantProps {
  title: string;
  textAs?: TextVariantProps<React.ElementType>["as"];
  textSize?: TextVariantProps<React.ElementType>["size"];
  textWeight?: TextVariantProps<React.ElementType>["weight"];
  textFamily?: TextVariantProps<React.ElementType>["family"];
  textPosition?: TextVariantProps<React.ElementType>["position"];
  textColor?: TextVariantProps<React.ElementType>["textColor"];
  textProps?: Omit<TextVariantProps<React.ElementType>, "className" | "as" | "children" | "size" | "weight" | "family" | "position" | "textColor">;
  className?: string;
  strokeClassName?: string;
  textClassName?: string;
  stroke?: boolean;
  strokeSize?: textVariantProps["strokeSize"];
  strokeColor?: textVariantProps["strokeColor"];
}
const Title = React.forwardRef<HTMLDivElement, TitleProps>(
  (
    {
      title,
      textAs,
      textSize,
      textWeight,
      textFamily,
      textPosition,
      textColor,
      className,
      strokeClassName,
      textClassName,
      strokeColor,
      stroke,
      strokeSize,
      width,
      textProps,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(titleVariants({ width }), className)}>
        {stroke && (
          <Text
            as={textAs}
            size={textSize}
            weight={textWeight}
            family={textFamily}
            position={textPosition}
            textColor={textColor}
            {...textProps}
            className={cn(
              "absolute inset-0",
              textVariants({ strokeSize, strokeColor }),
              strokeClassName
            )}
          >
            {title}
          </Text>
        )}
        <Text
          as={textAs}
          size={textSize}
          weight={textWeight}
          family={textFamily}
          position={textPosition}
          textColor={textColor}
          {...textProps}
          className={cn("relative", textClassName)}
        >
          {title}
        </Text>
      </div>
    );
  }
);
Title.displayName = "Title";
export { Title, titleVariants, textVariants };
