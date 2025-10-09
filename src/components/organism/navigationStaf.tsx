import type { NavigasiKasir } from "@/types/navigasi";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type menuItemProps = {
  item: NavigasiKasir;
  isActive: boolean;
  setActiveMenu: (nav: string) => void;
  className?: string;
};

export const MenuItem = ({ item, isActive, setActiveMenu, className }: menuItemProps) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveMenu(item.title);
    navigate(item.path);
  };
  return (
    <li className={cn("relative h-16.5", className)}>
      <div
        className={`
        cursor-pointer transition-all duration-300 ease-out h-full flex items-center
        `}
        onClick={handleClick}
      >
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className={`
            flex items-center px-6 py-4 text-base font-medium 
            transition-all duration-300 relative z-20 rounded-l-[30px]
            ${
              isActive
                ? "text-primary font-semibold"
                : "text-secondary hover:text-secondary"
            }
          `}
        >
          <span
            className={`
              mr-4 transition-colors duration-300 size-5
              ${
                isActive
                  ? "text-primary"
                  : "text-secondary group-hover:text-secondary"
              }
            `}
          >
            {item.icon}
          </span>
          {item.title}
        </a>
      </div>
    </li>
  );
};
