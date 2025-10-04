import React, { useEffect } from "react";
import { useUIStore } from "../store/useUIStore";
import { useStickyNavbar } from "@/hooks/useStickyNavbar";
import { useSidebarAnimation } from "@/hooks/useSidebarAnimation";
import { cn } from "@/lib/utils";
import NotificationList from "./notificationIcon";
import useAuthStore from "../store/useAuthStore";
type NavbarProps = {
  logoIcon?: React.ReactNode;
  navigation?: React.ReactNode;
  navigationButton?: React.ReactNode;
  className?: string;
};
export default function Navbar({
  logoIcon,
  navigation,
  navigationButton,
  className,
}: NavbarProps) {
  const { isLoggedIn } = useAuthStore();
  const isScroll = useUIStore((state) => state.scrollY);
  const isOpen = useUIStore(
    (state) => state.activeSidebar === "sidebarCustomer"
  );
  const isSticky = useStickyNavbar(300);
  const isFullyClosed = useSidebarAnimation(isOpen, 500);
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
  return (
    <>
      {isScroll <= 0 && (
        <header
          className={cn(
            `fixed top-0 z-20 w-full 2xl:h-[5.75rem]  transition-transform duration-300 ease-in-out bg-transparent`,
            className
          )}
        >
          <div className="block md:flex items-center justify-between md:p-4 lg:px-14 xl:px-24 2xl:px-[4.375rem] 2xl:py-0 xl:max-w-[1440px] mx-auto 2xl:h-full">
            <div
              className={`px-2 py-2 xs:px-5 md:p-0 transition-all duration-300 bg-transparent`}
            >
              {logoIcon}
            </div>
            <div
              className={` md:h-fit bg-broken px-4 flex justify-center md:contents transition-transform duration-400 md:translate-0 ${
                isFullyClosed ? "h-0 overflow-hidden" : "h-dvh"
              } ${isOpen ? "translate-x-0 " : "-translate-x-200 "}`}
            >
              <div className="flex flex-col md:contents items-start justify-center md:justify-between">
                {navigation}
                <div className="flex gap-5 items-center">
                  {isLoggedIn && <NotificationList />}

                  {navigationButton}
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
      {isScroll > 0 && (
        <header
          className={`fixed top-0 z-20 w-full 2xl:h-[5.75rem]  transition-transform duration-300 ease-in-out ${
            isSticky
              ? "md:bg-broken bg-transparent  translate-y-0"
              : "bg-transparent -translate-y-full"
          }`}
        >
          <div className="block md:flex items-center justify-between md:p-4 lg:px-14 xl:px-24 2xl:px-[4.375rem] 2xl:py-0 xl:max-w-[1440px] mx-auto 2xl:h-full">
            <div
              className={`px-2 py-2 xs:px-5 md:p-0 transition-all duration-300 ${
                isSticky ? "bg-broken md:bg-transparent" : "bg-transparent"
              }`}
            >
              {logoIcon}
            </div>
            <div
              className={` md:h-fit bg-broken px-4 flex justify-center md:contents transition-transform duration-400 md:translate-0 ${
                isFullyClosed ? "h-0 overflow-hidden" : "h-dvh"
              } ${isOpen ? "translate-x-0 " : "-translate-x-200 "}`}
            >
              <div className="flex flex-col md:contents items-start justify-center md:justify-between">
                {navigation}
                {navigationButton}
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
