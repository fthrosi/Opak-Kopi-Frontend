import { Title, type TitleProps } from "../atoms/title";
import { Description, type DescriptionProps } from "../atoms/description";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const titleDescriptionVariants = cva("flex flex-col", {
  variants: {
    position:{
      default: "",
      center: "items-center",
    },
    gap:{
      default: "",
      bestProduct: "gap-2 md:gap-3 2xl:gap-4",
    }
  },
  defaultVariants: {
    position: "default",
    gap: "default",
  },
});
export interface TitleDescriptionProps extends VariantProps<typeof titleDescriptionVariants> {
  title?: string;
  description?: string;
  titleProps?: Omit<TitleProps, "title">;
  descriptionProps?: Omit<DescriptionProps, "description">;
  className?: string;
}
export default function TitleDescription({
  title,
  description,
  titleProps,
  descriptionProps,
  className,
  position,
  gap
}: TitleDescriptionProps) {
  return (
    <div className={cn(titleDescriptionVariants({ position, gap }), className)}>
      <Title title={title ? title : ""} {...titleProps} />
      <Description description={description ? description : ""} {...descriptionProps} />
    </div>
  );
}
