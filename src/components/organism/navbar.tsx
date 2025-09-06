import { useEffect, useState } from "react";
import Navigation from "../molecules/navigation";
import NavigationAuth from "../molecules/navbar/navigationAuth";
import LogoIcon from "../molecules/navbar/logo_icon";
import { useUIStore } from "../store/useUIStore";

export default function Navbar() {
  const isOpen = useUIStore((state) => state.activeStates.sidebar);
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [isOpen]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`fixed z-10 w-full 2xl:h-[5.75rem] top-0 transition-all duration-100 ${
        isScrolling ? "md:bg-broken bg-transparent" : "bg-transparent"
      }`}
    >
      <div className="block md:flex items-center justify-between md:p-4 lg:px-14 xl:px-24 2xl:px-[4.375rem] 2xl:py-0 xl:max-w-[1440px] mx-auto 2xl:h-full">
        <div
          className={`px-2 py-2 xs:px-3 md:p-0 transition-all duration-200 ${
            isScrolling ? "bg-broken md:bg-transparent" : "bg-transparent"
          }`}
        >
          <LogoIcon />
        </div>
        <div
          className={`bg-broken h-screen md:h-fit px-4 flex justify-center md:contents transition-transform duration-400 md:translate-0 ${
            isOpen ? "translate-x-0 " : "-translate-x-200 hidden"
          }`}
        >
          <div className="flex flex-col md:contents items-start justify-center md:justify-between">
            <Navigation />
            <NavigationAuth />
          </div>
        </div>
      </div>
    </header>
  );
}
