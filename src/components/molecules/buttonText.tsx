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

    //text props
    textAs?:TextVariantProps<React.ElementType>["as"];
    textFamily?:TextVariantProps<React.ElementType>["family"];
    textWeight?:TextVariantProps<React.ElementType>["weight"];
    textPosition?:TextVariantProps<React.ElementType>["position"];
    textColor?:TextVariantProps<React.ElementType>["textColor"];
    textClassName?:TextVariantProps<React.ElementType>["className"];
    textProps?: Omit<TextVariantProps<React.ElementType>, "className" | "as" | "family" | "weight" | "position" | "textColor">;

    //button props
    buttonText? : ButtonProps["text"];
    buttonVariant?: ButtonProps["variant"];
    buttonClassName?: ButtonProps["className"];
    buttonAsChild?: ButtonProps["asChild"];
    buttonProps?: Omit<ButtonProps, "children" | "text" | "variant" | "className" | "asChild">;
    button?: boolean;
    children?: React.ReactNode;
}
export default function ButtonText({ text,textProps, position , className, buttonProps, button, children,textAs,textFamily,textWeight,textPosition,textColor,textClassName, buttonText,buttonAsChild,buttonClassName,buttonVariant }: ButtonTextProps) {
  return (
    <div className={cn(buttonTextVariants({ position }), className)}>
        <Text {...textProps} as={textAs} family={textFamily} weight={textWeight} position={textPosition} textColor={textColor} className={textClassName}>{text}</Text>
        {button && <Button {...buttonProps} text={buttonText} variant={buttonVariant} className={buttonClassName} asChild={buttonAsChild}>{children}</Button>}
    </div>
  );
}