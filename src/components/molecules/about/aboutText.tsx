import {Text} from "../../atoms/text";
import { about } from "@/const/constAbout";

export default function AboutText() {
  return (
    <div className="">
      <Text
        as="h1"
        variant="heading"
        family="lexend"
        className="z-2 text-primary font-bold mb-2 text-[clamp(0.8rem,4vw,1.3rem)] md:text-[clamp(0.9rem,2.4vw,1.5rem)] xl:text-[clamp(1.8rem,2.3vw,2.3rem)] 2xl:text-[2.25rem]"
      >
        TENTANG KAFE OPAK KOPI
      </Text>
      <div className="flex flex-col gap-2 tracking-widest md:tracking-normal lg:tracking-wider md:w-[clamp(22rem,44.3vw,28.3rem)] lg:w-[clamp(26rem,40.3vw,32.2rem)] xl:w-[clamp(28rem,38vw,38rem)] 2xl:w-[38rem]">
        {about.map((item) => (
          <Text key={item.id} as="p" variant="body" weight="normal" family="lexend" className="text-secondary text-justify text-[clamp(0.55rem,2.6vw,0.85rem)] sm:text-[clamp(0.85rem,2.1vw,1rem)] md:text-[clamp(0.65rem,1.4vw,0.9rem)] lg:text-[clamp(0.8rem,1.15vw,0.9rem)] xl:text-[clamp(0.9rem,1.1vw,1.125rem)] 2xl:text-[1.125rem]">
            {item.text}
          </Text>
        ))}
      </div>
    </div>
  );
}
