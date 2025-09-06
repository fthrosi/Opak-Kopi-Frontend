import { cn } from "@/lib/utils";

interface BurgerMenuProps {
  className?: string;
  onClick?: () => void;
}

export default function BurgerMenu({ className, onClick }: BurgerMenuProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
      onClick={onClick}
      className={cn("h-6 w-6", className)}
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
}
