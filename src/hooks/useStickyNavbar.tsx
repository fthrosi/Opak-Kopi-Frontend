import { useEffect, useRef, useState } from "react";
import { useUIStore } from "../components/store/useUIStore";
export function useStickyNavbar(delay = 1000) {
  const [isSticky, setIsSticky] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setScrollY = useUIStore((state) => state.setScrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 0) {
        if (!scrollTimeoutRef.current) {
          scrollTimeoutRef.current = setTimeout(() => {
            setIsSticky(true);
            scrollTimeoutRef.current = null;
          }, delay);
        }
      } else {
        setIsSticky(false);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [delay]);

  return isSticky;
}