
import { useEffect, useState } from "react";

export function useSidebarAnimation(isOpen: boolean, duration : number) {
  const [isFullyClosed, setIsFullyClosed] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen) {
      setIsFullyClosed(false);
    } else {
      timeout = setTimeout(() => setIsFullyClosed(true), duration);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen, duration]);

  return isFullyClosed;
}