import { Text, type TextVariantProps } from "../atoms/text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const navigationVariants = cva("flex flex-col w-fit", {
  variants: {
    layout: {
      default: "",
      navbar: "md:flex-row md:items-center md:justify-between",
    },
    gap: {
      default: "",
      navbar: "md:gap-x-4 lg:gap-x-6 gap-y-4",
    },
  },
  defaultVariants: {
    layout: "default",
    gap: "default",
  },
});
type navigation = {
  id: number;
  title: string;
  path: string;
};

export interface NavigationVariantProps
  extends VariantProps<typeof navigationVariants> {
  className?: string;
  textfamily?: TextVariantProps<React.ElementType>["family"];
  textColor?: TextVariantProps<React.ElementType>["textColor"];
  textClassName?: TextVariantProps<React.ElementType>["className"];
  data?: navigation[];
}
export default function Navigation({
  className,
  layout,
  gap,
  data,
  textfamily,
  textColor,
  textClassName,
}: NavigationVariantProps) {
  return (
    <nav className={cn(navigationVariants({ layout, gap }), className)}>
      {data?.map((item) => (
        <Text
          key={item.id}
          as="a"
          href={item.path}
          family={textfamily}
          textColor={textColor}
          className={cn(textClassName)}
        >
          {item.title}
        </Text>
      ))}
    </nav>
  );
}
