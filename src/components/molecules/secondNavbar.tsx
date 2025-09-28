import { Text } from "../atoms/text";
import type { SecondNavigasi } from "@/types/navigasi";
import { cn } from "@/lib/utils";
type SecondNavbarProps = {
  navigasi?: SecondNavigasi[];
  activeStatus?: string;
  onStatusChange?: (status: string) => void;
  className?: string;
};
export default function SecondNavbar({
  navigasi,
  activeStatus,
  onStatusChange,
  className,
}: SecondNavbarProps) {
  return (
    <div className={cn("w-full bg-white flex justify-between rounded-lg sm:w-[40rem] md:w-[46rem] xl:w-[60rem]", className)}>
      {navigasi?.map((item) => (
        <div
          className={cn(
            "flex-1 h-full cursor-pointer transition-all duration-300 px-2 py-4 relative",
            "hover:bg-gray-50",
            "before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2",
            "before:h-0.5 before:bg-primary before:transition-all before:duration-300",
            activeStatus === item.title
              ? "before:w-full before:bg-secondary"
              : "before:w-0 hover:before:w-full"
          )}
          key={item.id}
          onClick={() => onStatusChange?.(item.title)}
        >
          <Text
            size="caption"
            weight="semiBold"
            className={cn(
              "text-center transition-colors text-[0.6rem]",
              activeStatus === item.title ? "text-secondary" : "text-primary"
            )}
          >
            {item.label}
          </Text>
        </div>
      ))}
    </div>
  );
}
