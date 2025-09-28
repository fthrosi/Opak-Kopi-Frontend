import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Text } from "../atoms/text";

const cardInformationVariants = cva(
  "w-full rounded-lg p-3 flex flex-col items-center",
  {
    variants: {
      variant: {
        white: "bg-white",
        primary: "bg-primary/40",
        secondary: "bg-secondary/40",
        input: "bg-input",
      },
    },
  }
);

export interface CardInformationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardInformationVariants> {
  className?: string;
  title: string;
  count: string;
  children?: React.ReactNode;
  titleClassName?: string;
  numberClassName?: string;
}
export default function CardInformation({
  className,
  title,
  count,
  variant,
  children,
  titleClassName,
  numberClassName,
  ...props
}: CardInformationProps) {
  return (
    <div
      className={cn(cardInformationVariants({ variant }), className)}
      {...props}
    >
      <div className="flex gap-1 items-center">
        {children}
        <Text size="heading3" className={cn(titleClassName)}>
          {title}
        </Text>
      </div>
      <Text size="heading1" weight="semiBold" className={cn(numberClassName)}>
        {count}
      </Text>
    </div>
  );
}
