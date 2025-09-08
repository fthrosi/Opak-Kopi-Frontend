import { Text,type TextVariantProps } from "../atoms/text";
import { Button,type ButtonProps } from "../atoms/button";
import { cn } from "@/lib/utils";
import { cva,type VariantProps } from "class-variance-authority";
import React from "react";
const buttonTextVariants = cva("flex", {
    variants: {
        position: {
            row: "flex-row",
            column: "flex-col",
        },
    },
    defaultVariants: {
        position: "column",
    },
});
export interface ButtonTextProps extends VariantProps<typeof buttonTextVariants> {
    className?: string;
    text: string;
    textProps?: TextVariantProps <React.ElementType>;
    buttonProps?: Omit<ButtonProps, "children">;
    button?: boolean;
    children?: React.ReactNode;
}
export default function ButtonText({ text,textProps, position , className, buttonProps, button, children }: ButtonTextProps) {
  return (
    <div className={cn(buttonTextVariants({ position }), className)}>
        <Text {...textProps}>{text}</Text>
        {button && <Button {...buttonProps}>{children}</Button>}
    </div>
  );
}