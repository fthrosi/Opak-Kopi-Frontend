import React from "react";
import {Text, type TextVariantProps} from "./text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const titleVariants = cva("relative", {
  variants: {
    width: {
      default: "w-full",
      hero: "w-[clamp(15rem,77vw,25rem)] xs:w-[clamp(25rem,88vw,35rem)] sm:w-[clamp(35rem,90vw,38rem)] md:w-[clamp(30rem,61vw,37rem)] lg:w-[clamp(37rem,66.5vw,53rem)]",
      special: "w-[clamp(12.5rem,59.9vw,20rem)] md:w-[clamp(20rem,37.6vw,24rem)] lg:w-[clamp(23rem,36.3vw,29rem)] xl:w-[30rem]",
    }
  },
  defaultVariants: {
    width: "default",
  },
});
const textVariants = cva("", {
  variants: {
    variant: {
      default:
        "text-[clamp(1.25rem,6vw,2rem)] md:text-[clamp(2rem,4.2vw,2.5rem)] lg:text-[clamp(3rem,5.5vw,3.5rem)] xl:text-[clamp(3.5rem,4.5vw,4rem)]",
      hero: 
        "text-[clamp(1rem,5vw,1.8rem)] xs:text-[clamp(1.8rem,6vw,2.3rem)] sm:text-[clamp(2.3rem,6vw,2.5rem)] md:text-[clamp(2rem,4vw,2.5rem)] lg:text-[clamp(2.5rem,4.5vw,3.5rem)]",
      special:
        "text-[clamp(1.25rem,6vw,2rem)] md:text-[clamp(1.8rem,3.7vw,2.3rem)] lg:text-[clamp(2.3rem,3.6vw,3rem)]",
      about:
        "text-[clamp(0.8rem,4vw,1.3rem)] md:text-[clamp(0.9rem,2.4vw,1.5rem)] xl:text-[clamp(1.8rem,2.3vw,2.3rem)] 2xl:text-[2.25rem]",
    },
    text: {
      default: "text-primary",
      broken: "text-broken",
      light: "text-light-cokelat",
    },
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
  defaultVariants: {
    variant: "default",
    text: "default",
  },
});
type TitleVariantProps = VariantProps<typeof titleVariants>;
type textVariantProps = VariantProps<typeof textVariants>;
export interface TitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TitleVariantProps,
    Omit<textVariantProps, "className"> {
  title: string;
  textProps?: TextVariantProps<React.ElementType>;
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
      className,
      strokeClassName,
      textClassName,
      variant,
      strokeColor,
      stroke,
      strokeSize,
      text,
      width,
      textProps,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(titleVariants({ width }), className)}>
        {stroke && (
          <Text
            {...textProps}
            className={cn(
              "absolute inset-0",
              textVariants({ strokeSize, strokeColor, variant }),
              strokeClassName
            )}
          >
            {title}
          </Text>
        )}
        <Text
          {...textProps}
          className={cn("relative", textVariants({ text, variant }), textClassName)}
        >
          {title}
        </Text>
      </div>
    );
  }
);
Title.displayName = "Title";
export { Title, titleVariants, textVariants };
