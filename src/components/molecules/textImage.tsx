import { Text, type TextVariantProps } from "../atoms/text";
import Img,{type ImgVariantProps} from "../atoms/img";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const textImageVariants = cva("flex", {
    variants: {
        direction: {
            default: "flex-row",
            column: "flex-col",
        },
        gap: {
            default: "gap-5 md:gap-10 lg:gap-15",
            sm: "gap-3 md:gap-5 lg:gap-7.5",
            lg: "gap-7.5 md:gap-15 lg:gap-20",
            custom: "",
        },
        align: {
            default: "items-start",
            center: "items-center",
            end: "items-end", 
        },
    },
    defaultVariants: {
        direction: "default",
        gap: "default",
        align: "default",
    },
});

export interface TextImageProps extends VariantProps<typeof textImageVariants> {
    className?: string;

    // Text Props
    text: TextVariantProps<React.ElementType>["children"];
    textSize?: TextVariantProps<React.ElementType>["size"];
    textWeight?: TextVariantProps<React.ElementType>["weight"];
    textFamily?: TextVariantProps<React.ElementType>["family"];
    textPosition?: TextVariantProps<React.ElementType>["position"];
    textColor?: TextVariantProps<React.ElementType>["textColor"];
    textAs?: TextVariantProps<React.ElementType>["as"];
    textClassName?: TextVariantProps<React.ElementType>["className"];
    textProps?: Omit<TextVariantProps<React.ElementType>,
        | "children"
        | "size"
        | "weight"
        | "family"
        | "position"
        | "textColor"
        | "as"
        | "className"
    >;

    // Image Props
    imgSrc: ImgVariantProps["src"];
    imgAlt: ImgVariantProps["alt"];
    imgVariant?: ImgVariantProps["variant"];
    imgSize?: ImgVariantProps["size"];
    imgClassName?: ImgVariantProps["className"];
    imgProps?: Omit<ImgVariantProps,
        | "src"
        | "alt"
        | "variant"
        | "size"
        | "className"
    >;
}

export default function TextImage({
    className,
    direction,
    gap,
    align,
    text,
    textSize,
    textWeight,
    textFamily,
    textPosition,
    textColor,
    textAs,
    textClassName,
    textProps,
    imgSrc,
    imgAlt,
    imgVariant,
    imgSize,
    imgClassName,
    imgProps,
}: TextImageProps) {
    return (
        <div className={cn(textImageVariants({ direction, gap, align }), className)}>
            <Img
                src={imgSrc}
                alt={imgAlt}
                variant={imgVariant}
                size={imgSize}
                className={cn(imgClassName)}
                {...imgProps}
            />
            <Text
                className={cn(textClassName)}
                weight={textWeight}
                family={textFamily}
                position={textPosition}
                textColor={textColor}
                as={textAs}
                size={textSize}
                {...textProps}
            >
                {text}
            </Text>
            
        </div>
    );
}
