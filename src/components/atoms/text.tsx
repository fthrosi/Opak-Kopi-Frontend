import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const textVariants = cva("", {
  variants: {
    size:{
      heading1:"text-[clamp(1.25rem,4.6vw,1.5rem)] xs:text-[clamp(1.5rem,4.5vw,1.75rem)] sm:text-[clamp(1.75rem,4vw,1.875rem)] md:text-[clamp(1.875rem,3.2vw,2rem)] lg:text-[clamp(2rem,3.2vw,2.5rem)] xl:text-[clamp(2.5rem,3.4vw,3rem)] 2xl:text-[3rem]",
      heading2:"text-[clamp(1.125rem,3.8vw,1.25rem)] xs:text-[clamp(1.25rem,3.5vw,1.375rem)] sm:text-[clamp(1.375rem,3.2vw,1.5rem)] md:text-[clamp(1.5rem,2.6vw,1.625rem)] lg:text-[clamp(1.625rem,2.2vw,1.75rem)] xl:text-[clamp(1.75rem,2.1vw,1.875rem)] 2xl:text-[2rem]",
      heading3:"text-[clamp(1rem,3vw,1.125rem)] sm:text-[clamp(1.125rem,2vw,1.25rem)] lg:text-[clamp(1.25rem,1.75vw,1.375rem)] xl:text-[clamp(1.375rem,1.7vw,1.5rem)] 2xl:text-[1.5rem]",
      body:"text-[clamp(0.875rem,2.8vw,0.938rem)] sm:text-[clamp(0.938rem,1.6vw,1rem)] lg:text-[clamp(1rem,1.4vw,1.063rem)] xl:text-[clamp(1.063rem,1.3vw,1.125rem)] 2xl:text-[1.125rem]",
      caption:"text-[0.75rem] sm:text-[clamp(0.75rem,1.3vw,0.813rem)] lg:text-[clamp(0.813rem,1vw,0.875rem)]",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      semiBold: "font-semibold",
      bold: "font-bold",
    },
    family: {
      lexend: "font-lexend",
      lily: "font-lily",
    },
    position: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
      justify: "text-justify",
    },
    textColor: {
      primary: "text-primary",
      secondary: "text-secondary",
      light: "text-light-cokelat",
      broken: "text-broken",
    }
  },

  defaultVariants: {
    weight: "normal",
    family: "lexend",
    position: "left",
    textColor: "primary",
  },
});

type TextOwnProps<C extends React.ElementType> = {
  as?: C;
  children?: ReactNode;
  className?: string;
} & VariantProps<typeof textVariants>;

export type TextVariantProps<C extends React.ElementType> = TextOwnProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof TextOwnProps<C>>;

const Text = React.forwardRef<HTMLElement, TextVariantProps<React.ElementType>>(
  (
    {
      as = "p",
      children,
      size,
      className,
      weight,
      family,
      position,
      textColor,
      ...props
    },
    ref
  ) => {
    const Component = as || "p";
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ weight, family, position, textColor, size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = "Text";
export { Text, textVariants };
