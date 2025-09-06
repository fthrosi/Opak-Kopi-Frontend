import { cn } from "@/lib/utils";

interface CloseIconProps {
  className?: string;
  onClick?: () => void;
}
export default function CloseIcon({className, onClick}: CloseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
      onClick={onClick}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}
