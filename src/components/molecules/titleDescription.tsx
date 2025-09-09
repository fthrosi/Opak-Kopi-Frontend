import { Title, type TitleProps } from "../atoms/title";
import { Description, type DescriptionProps } from "../atoms/description";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const titleDescriptionVariants = cva("flex flex-col", {
  variants: {
    position: {
      default: "",
      center: "items-center",
    },
    gap: {
      default: "",
      bestProduct: "gap-2 md:gap-3 2xl:gap-4",
    },
  },
  defaultVariants: {
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

  // Description Props
  descriptionVariant?: DescriptionProps["variant"];
  descriptionWidth?: DescriptionProps["width"];
  descriptionClassName?: DescriptionProps["className"];
  descriptionProps?: Omit<
    DescriptionProps,
    "description" | "variant" | "width" | "className"
  >;
}
export default function TitleDescription({
  title,
  description,
  titleProps,
  descriptionProps,
  className,
  position,
  gap,
  titleVariant,
  titleWidth,
  titleColor,
  titleStrokeSize,
  titleStroke,
  titleStrokeColor,
  descriptionVariant,
  descriptionWidth,
  descriptionClassName,
}: TitleDescriptionProps) {
  return (
    <div className={cn(titleDescriptionVariants({ position, gap }), className)}>
      <Title
        title={title ? title : ""}
        variant={titleVariant}
        width={titleWidth}
        text={titleColor}
        strokeSize={titleStrokeSize}
        stroke={titleStroke}
        strokeColor={titleStrokeColor}
        {...titleProps}
      />
      <Description
        description={description ? description : ""}
        variant={descriptionVariant}
        width={descriptionWidth}
        className={descriptionClassName}
        {...descriptionProps}
      />
    </div>
  );
}
