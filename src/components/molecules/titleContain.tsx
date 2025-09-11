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
 titleAs?: TitleProps["textAs"];
  titleSize?: TitleProps["textSize"];
  titleWeight?: TitleProps["textWeight"];
  titleFamily?: TitleProps["textFamily"];
  titlePosition?: TitleProps["textPosition"];
  titleColor?: TitleProps["textColor"];
  titleWidth?: TitleProps["width"];
  titleStrokeSize?: TitleProps["strokeSize"];
  titleStroke?: boolean;
  titleStrokeColor?: TitleProps["strokeColor"];
  titleClassName?: TitleProps["className"];
  titleTextClassName?: TitleProps["textClassName"];
  titleStrokeClassName?: TitleProps["strokeClassName"];
  titleProps?: Omit<
    TitleProps,
    | "title"
    | "textAs"
    | "textSize"
    | "textWeight"
    | "textFamily"
    | "textPosition"
    | "textColor"
    | "width"
    | "strokeSize"
    | "stroke"
    | "strokeColor"
    | "className"
    | "textClassName"
    | "strokeClassName"
  >;
  children?: React.ReactNode;
}
export default function TitleContain({
  position,
  className,
  title,
  titleAs,
  titleSize,
  titleWeight,
  titleFamily,
  titlePosition,
  titleColor,
  titleStrokeClassName,
  titleTextClassName,
  titleClassName,
  titleWidth,
  titleStrokeSize,
  titleStroke,
  titleStrokeColor,
  titleProps,
  children,
}: TitleContainProps) {
  return (
    <div className={cn(titleContainVariants({ position }), className)}>
      <Title
        textAs={titleAs}
        textSize={titleSize}
        textWeight={titleWeight}
        textFamily={titleFamily}
        textPosition={titlePosition}
        textColor={titleColor}
        title={title}
        width={titleWidth}
        strokeSize={titleStrokeSize}
        stroke={titleStroke}
        strokeColor={titleStrokeColor}
        className={titleClassName}
        textClassName={titleTextClassName}
        strokeClassName={titleStrokeClassName}
        {...titleProps}
      />
      {children}
    </div>
  );
}
