import {Text} from "@/components/atoms/text";
// import Title from "../../atoms/title";
export default function Header() {
  return (
    <div className="flex flex-col w-full md:flex-row md:justify-between gap-4 items-center">
      {/* <Title weight="semiBold" classNameTitle="w-[clamp(12.5rem,59.9vw,20rem)] md:w-[clamp(20rem,37.6vw,24rem)] lg:w-[clamp(23rem,36.3vw,29rem)] xl:w-[30rem]" title="Apa yang Membuat Kami Special?" strokeClassName="text-stroke-2 md:text-stroke-3 lg:text-stroke-4 xl:text-stroke-5 text-center md:text-start stroke-color-secondary text-[clamp(1.25rem,6vw,2rem)] md:text-[clamp(1.8rem,3.7vw,2.3rem)] lg:text-[clamp(2.3rem,3.6vw,3rem)] xl:text-[3rem]" textClassName="text-center md:text-start text-[clamp(1.25rem,6vw,2rem)] md:text-[clamp(1.8rem,3.7vw,2.3rem)] lg:text-[clamp(2.3rem,3.6vw,3rem)] xl:text-[3rem] text-light-cokelat"/> */}
      <Text as="p" className="text-[clamp(0.55rem,2.55vw,0.85rem)] md:text-[clamp(0.85rem,1.7vw,1rem)] text-center md:text-justify text-secondary w-[clamp(13.5rem,62.5vw,20.9rem)] md:w-[clamp(20.9rem,42.3vw,27rem)]">
        Kami bukan sekedar kafe biasa. Dari variasi menu hingga lokasi yang strategis,semuanya kami rancang untuk bikin kamu betah
      </Text>
    </div>
  );
}
