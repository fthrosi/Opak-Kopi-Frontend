import { Title, type TitleProps } from "../atoms/title";
import { Description, type DescriptionProps } from "../atoms/description";
import { cn } from "@/lib/utils";
export interface TitleDescriptionProps {
  title: string;
  description: string;
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
}: TitleDescriptionProps) {
  return (
    <div className={cn("", className)}>
      <Title title={title} {...titleProps} />
      <Description description={description} {...descriptionProps} />
    </div>
  );
}
