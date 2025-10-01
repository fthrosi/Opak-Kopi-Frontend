import CloseIcon from "../atoms/icons/close";
import { Text } from "../atoms/text";
import { MenuItem } from "./navigationStaf";
import { navbarKasir, navbarOwner } from "@/const/constNavbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

type SidebarProps = {
  handleClose: () => void;
};

export default function Sidebar({ handleClose }: SidebarProps) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const user = useAuthStore((state) => state.user);

  const navbar = user?.role === "Owner" ? navbarOwner : navbarKasir;
  useEffect(() => {
    const currentMenuItem = navbar.find((item) =>
      location.pathname.startsWith(item.path)
    );

    if (currentMenuItem) {
      const newIndex = navbar.findIndex(
        (item) => item.title === currentMenuItem.title
      );

      if (newIndex !== activeIndex) {
        setIsTransitioning(true);
        setActiveMenu(currentMenuItem.title);
        setActiveIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 300);
      }
      handleClose();
    }
  }, [location.pathname, activeIndex]);

  const handleMenuClick = (menuTitle: string) => {
    const newIndex = navbar.findIndex((item) => item.title === menuTitle);

    if (newIndex !== activeIndex) {
      setIsTransitioning(true);
      setActiveMenu(menuTitle);
      setActiveIndex(newIndex);

      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  return (
    <div className="w-full sm:w-[20rem] md:w-[25rem] lg:w-full h-full py-4 bg-white flex flex-col over-flow-hidden rounded-r-4xl">
      <div className="flex justify-between px-2 2xl:h-[5.75rem] h-[4rem] lg:h-[5.5rem]">
        <Text family="lily" size="heading2" className="text-[1.5rem]">
          Opak Kopi
        </Text>
        <div className="lg:hidden">
          <CloseIcon className=" text-primary" onClick={handleClose} />
        </div>
      </div>
      <nav className="flex-1 relative">
        <div
          className={`
            absolute right-0 w-full z-10
            transition-transform duration-500 ease-in-out
            ${isTransitioning ? "ease-out" : "ease-in-out"}
          `}
          style={{
            transform: `translateY(${activeIndex * 66}px)`,
            height: "64px",
          }}
        >
          <div className="absolute -top-4 right-0 w-4 h-4">
            <div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle at 0 0, transparent 16px, #faf5f1 16px)`,
              }}
            />
          </div>

          <div className="bg-broken h-full rounded-l-[32px] mr-0 " />

          <div className="absolute -bottom-4 right-0 w-4 h-4">
            <div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle at 0 100%, transparent 16px, #faf5f1 16px)`,
              }}
            />
          </div>
        </div>
        <ul className=" relative z-25">
          {navbar.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isActive={activeMenu === item.title} // ← CHECK by title
              setActiveMenu={handleMenuClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
