import { data } from "@/const/constHeader";
import {Text} from "@/components/atoms/text";
export const StatHeader = () => {
  return (
    <div className="flex justify-start">
      {data.map((item) => (
        <div
          key={item.id}
          className="w-[clamp(6.25rem,26vw,8.5rem)] xs:w-[clamp(8.5rem,25vw,12rem)] sm:w-[clamp(12rem,31.5vw,15rem)] md:w-[10rem]"
        >
          <Text
            as="h1"
            variant="heading"
            family="lexend"
            weight="normal"
            className="text-broken text-[clamp(0.8rem,3.9vw,1.3rem)] xs:text-[clamp(1.3rem,3.8vw,1.5rem)] sm:text-[clamp(1.5rem,4.2vw,2rem)] md:text-[clamp(1.5rem,3vw,1.7rem)]"
          >
            {item.count}
          </Text>
          <Text
            as="p"
            variant="caption"
            family="lexend"
            weight="normal"
            className="text-primary text-[clamp(0.5rem,2.45vw,0.82rem)] xs:text-[clamp(0.82rem,3vw,1rem)] sm:text-[clamp(1rem,3vw,1.5rem)] md:text-[clamp(1rem,2vw,1.2rem)]"
          >
            {item.title}
          </Text>
          <Text
            as="p"
            variant="caption"
            family="lexend"
            weight="normal"
            className="text-broken text-[clamp(0.3rem,1.5vw,0.5rem)] xs:text-[clamp(0.5rem,1.5vw,0.7rem)] sm:text-[clamp(0.7rem,1.7vw,0.9rem)] md:text-[0.6rem] w-[clamp(4.5rem,22.5vw,7.5rem)] xs:w-[clamp(7.5rem,23vw,10rem)] sm:w-[clamp(10rem,29.4vw,14rem)] md:w-[9rem]"
          >
            {item.description}
          </Text>
        </div>
      ))}
    </div>
  );
};
