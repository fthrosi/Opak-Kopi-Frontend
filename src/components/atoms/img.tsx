import React from "react";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const imgVariants = cva("object-cover", {
    variants: {
        variant: {
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
            full: "rounded-full",
            default: "rounded-md",
        },
        size: {
            default: "w-full h-full",
            medium: "w-16 h-16",
            large: "w-32 h-32",
            full: "w-full h-auto",
            custom: "",
        },
    },
    defaultVariants: {
        variant: "default",
    },
    
});

export type ImgVariantProps = React.ImgHTMLAttributes<HTMLImageElement> & VariantProps<typeof imgVariants> & {
    className?: string;
    src: string;
    alt: string;
};
export default function Img({
    variant,
    size,
    src,
    alt,
    className,
    ...props
}: ImgVariantProps) {
    return (
        <img
            src={src}
            alt={alt}
            className={cn(imgVariants({ variant, size }), className)}
            {...props}
        />
    );
}
