import { Title, type TitleProps } from "../atoms/title";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const titleContainVariants = cva("flex flex-col", {
  variants: {
    position: {
      start: "items-start",
        center: "items-center",
        end: "items-end",
    },
  },
  defaultVariants: {
    position: "start",
  },
});
export interface TitleContainProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof titleContainVariants> {
  className?: string;
  title: string;
  titleVariant?: TitleProps["variant"];
  titleWidth?: TitleProps["width"];
  titleColor?: TitleProps["text"];
  titleStrokeSize?: TitleProps["strokeSize"];
  titleStroke?: boolean;
  titleStrokeColor?: TitleProps["strokeColor"];
  titleProps?: Omit<
    TitleProps,
    | "title"
    | "variant"
    | "width"
    | "text"
    | "strokeSize"
    | "stroke"
    | "strokeColor"
  >;
  children?: React.ReactNode;
}
export default function TitleContain({
  position,
  className,
  title,
  titleVariant,
  titleWidth,
  titleColor,
  titleStrokeSize,
  titleStroke,
  titleStrokeColor,
  titleProps,
  children,
}: TitleContainProps) {
  return (
    <div className={cn(titleContainVariants({ position }), className)}>
      <Title
        title={title}
        variant={titleVariant}
        width={titleWidth}
        text={titleColor}
        strokeSize={titleStrokeSize}
        stroke={titleStroke}
        strokeColor={titleStrokeColor}
        {...titleProps}
      />
      {children}
    </div>
  );
}
