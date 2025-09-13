import {Text, type TextVariantProps} from "../../atoms/text";
import BurgerMenu from "../../atoms/icons/burgerMenu";
import CloseIcon from "../../atoms/icons/close";
import { useUIStore } from "../../store/useUIStore";
import { cn } from "@/lib/utils";
type LogoIconProps = {
  className?: string;
  textprops: Pick<TextVariantProps<React.ElementType>, "className" | "as" | "family" | "textColor" | "size" | "weight">;
  href? : string;
  children?: React.ReactNode;
}

export default function LogoIcon( { className, textprops, href, children }: LogoIconProps) {
  const isOpen = useUIStore((state) => state.activeStates.sidebar);
  const toggleSidebar = useUIStore((state) => state.toggle);
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Text
        href= {textprops.as === "a" ? href : undefined}
        {...textprops}
      >
        {children}
      </Text>
      <div className="md:hidden">
        {isOpen ? (
          <CloseIcon className=" text-primary" onClick={() => toggleSidebar("sidebar")} />
        ) : (
          <BurgerMenu className=" text-primary" onClick={() => toggleSidebar("sidebar")} />
        )}
      </div>
    </div>
  );
}
