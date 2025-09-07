import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const textVariants = cva("", {
  variants: {
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
        className={cn(textVariants({ weight, family, position, textColor }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = "Text";
export { Text, textVariants };
