import { Text, type TextVariantProps } from "../atoms/text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useLocation } from "react-router-dom";

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
  textprops?: Pick<
    TextVariantProps<React.ElementType>,
    "className" | "family" | "textColor" | "size" | "as" | "weight" | "position"
  >;
  data?: navigation[];
}
export default function Navigation({
  className,
  layout,
  gap,
  data,
  textprops,
}: NavigationVariantProps) {
  const location = useLocation();
  const activeMenu = location.pathname;

  return (
    <nav className={cn(navigationVariants({ layout, gap }), className)}>
      {data?.map((item) => (
        <div className={cn("flex-1 h-full cursor-pointer transition-all duration-300 px-2 py-4 relative",
            "before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2",
            "before:h-0.5 before:bg-primary before:transition-all before:duration-300",
            activeMenu === item.path
              ? "before:w-full before:bg-primary"
              : "before:w-0 hover:before:w-full"
            )} key={item.id}>
          <Text as="a" href={item.path} {...textprops} className={`${activeMenu === item.path ? "text-primary" : "text-secondary"}`}>
            {item.title}
          </Text>
        </div>
      ))}
    </nav>
  );
}
