import { Text, type TextVariantProps } from "../atoms/text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const statVariants = cva(
  "w-[clamp(8rem,34vw,11rem)] xs:w-[11rem] md:w-[12rem] xl:w-[13rem]",
  {
    variants: {},
  }
);

export interface StatProps extends VariantProps<typeof statVariants> {
  count: string;
  title: string;
  description: string;
  className?: string;
  textSize?: TextVariantProps<React.ElementType>["size"];
  textWeight?: TextVariantProps<React.ElementType>["weight"];
  textProps?: Omit<
    TextVariantProps<React.ElementType>,
    | "className"
    | "children"
    | "size"
    | "weight"
  >;
  ref?: React.Ref<HTMLDivElement>;
  titleClassName?: string;
  subTitleClassName?: string;
  descriptionClassName?: string;
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    {
      count,
      title,
      description,
      className,
      titleClassName,
      subTitleClassName,
      descriptionClassName,
        textSize,
      textWeight,
      textProps,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(statVariants(), className)} {...props}>
        <Text
          as="h3"
          family="lexend"
          weight={textWeight || "semiBold"}
            size={textSize || "heading3"}
          className={cn(
            titleClassName,
            { ...textProps }
          )}
        >
          {count}
        </Text>
        <Text
          as="h4"
          family="lexend"
          weight={textWeight || "bold"}
          size={textSize || "body"}
          className={cn(
            subTitleClassName,
            { ...textProps }
          )}
        >
          {title}
        </Text>
        <Text
          as="p"
          family="lexend"
          weight={textWeight || "normal"}
          size={textSize || "caption"}
          className={cn(
            descriptionClassName,
            { ...textProps }
          )}
        >
          {description}
        </Text>
      </div>
    );
  }
);

Stat.displayName = "Stat";

export { Stat };
