import { Title, type TitleProps } from "../atoms/title";
import { Description, type DescriptionProps } from "../atoms/description";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const titleDescriptionVariants = cva("flex", {
  variants: {
    position: {
      default: "",
      start: "items-start",
      center: "items-center",
    },
    direction:{
      default: "flex-col",
      row: "flex-row",
    },
    gap: {
      default: "",
      bestProduct: "gap-2 md:gap-3 2xl:gap-4",
    },
  },
  defaultVariants: {
    direction: "default",
    position: "default",
    gap: "default",
  },
});
export interface TitleDescriptionProps
  extends VariantProps<typeof titleDescriptionVariants> {
  title?: string;
  description?: string;
  className?: string;

  // Title Props
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

  // Description Props
  descriptionAs?: DescriptionProps["textAs"];
  descriptionSize?: DescriptionProps["textSize"];
  descriptionWeight?: DescriptionProps["textWeight"];
  descriptionFamily?: DescriptionProps["textFamily"];
  descriptionPosition?: DescriptionProps["textPosition"];
  descriptionColor?: DescriptionProps["textColor"];
  descriptionWidth?: DescriptionProps["width"];
  descriptionClassName?: DescriptionProps["className"];
  descriptionProps?: Omit<
    DescriptionProps,
    "description" | "width" | "className" | "textAs" | "textSize" | "textWeight" | "textFamily" | "textPosition" | "textColor"
  >;
}
export default function TitleDescription({
  title,
  titleAs,
  titleSize,
  titleWeight,
  titleFamily,
  titlePosition,
  titleColor,
  description,
  descriptionAs,
  descriptionSize,
  descriptionWeight,
  descriptionFamily,
  descriptionPosition,
  descriptionColor,
  titleProps,
  descriptionProps,
  className,
  position,
  gap,
  direction,
  titleWidth,
  titleStrokeSize,
  titleStroke,
  titleStrokeColor,
  titleTextClassName,
  titleStrokeClassName,
  descriptionWidth,
  descriptionClassName,
}: TitleDescriptionProps) {
  return (
    <div className={cn(titleDescriptionVariants({ position, gap, direction }), className)}>
      <Title
        title={title ? title : ""}
        textAs={titleAs}
        textSize={titleSize}
        textWeight={titleWeight}
        textFamily={titleFamily}
        textPosition={titlePosition}
        textColor={titleColor}
        width={titleWidth}
        strokeSize={titleStrokeSize}
        stroke={titleStroke}
        strokeColor={titleStrokeColor}
        textClassName={titleTextClassName}
        strokeClassName={titleStrokeClassName}
        {...titleProps}
      />
      <Description
        textAs={descriptionAs}
        textSize={descriptionSize}
        textWeight={descriptionWeight}
        textFamily={descriptionFamily}
        textPosition={descriptionPosition}
        textColor={descriptionColor}
        description={description ? description : ""}
        width={descriptionWidth}
        className={descriptionClassName}
        {...descriptionProps}
      />
    </div>
  );
}
