import {Text} from "@/components/atoms/text";

type CardProps = {
  img: string;
  title: string;
}
export default function Card({ img, title }: CardProps) {
  return (
    <div className="p-4 md:px-[clamp(1rem,3vw,3rem)] lg:px-[clamp(2rem,4vw,3.2rem)] xl:px-[clamp(3.2rem,4.5vw,4rem)] flex gap-3 flex-col items-center rounded-lg aspect-[21/13] bg-[#F9E8D3] shadow-sm shadow-primary w-[clamp(12rem,53.6vw,18rem)] md:w-[clamp(13.7rem,29.6vw,18.9rem)] lg:w-[clamp(18.9rem,27.8vw,22.225rem)] xl:w-[clamp(22.225rem,27.8vw,24.938rem)] 2xl:w-105">
      <img src={img} alt={title} className="size-[clamp(3.75rem,18vw,6rem)] lg:size-[clamp(6rem,8.8vw,7rem)] 2xl:size-34 rounded-lg mb-2" />
      <Text className="font-semibold text-[clamp(0.875rem,3.86vw,1.3rem)] md:text-[1rem] lg:text-[clamp(1rem,1.63vw,1.3rem)] 2xl:text-2xl text-center text-secondary">{title}</Text>
    </div>
  );
}
