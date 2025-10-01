import CardInformation from "./cardInformation";

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
}

export default function InformationsCard({ items }: InformationsCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
