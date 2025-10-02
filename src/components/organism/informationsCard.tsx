import CardInformation from "./cardInformation";
import { cn } from "@/lib/utils";

interface InfoItem {
  title: string;
  count: number | string;
  variant: "white" | "secondary" | "primary";
  titleClassName?: string;
  numberClassName?: string;
  icon?: React.ReactNode;
}

interface InformationsCardProps {
  items: InfoItem[];
  className?: string;
}

export default function InformationsCard({ items, className }: InformationsCardProps) {
  return (
    <div className={cn(`grid grid-cols-1 sm:grid-cols-3 gap-2`, className)}>
      {items.map((item, index) => (
        <CardInformation
          key={index}
          title={item.title}
          count={item.count.toString()}
          variant={item.variant}
          titleClassName={item.titleClassName}
          numberClassName={item.numberClassName}
        >
          {item.icon}
        </CardInformation>
      ))}
    </div>
  );
}
