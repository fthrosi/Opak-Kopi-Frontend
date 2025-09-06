import {Text} from "@/components/atoms/text";
import { Button } from "@/components/atoms/button";

type CardBestProductProps = {
  name: string;
  image: string;
};

export default function CardBestProduct({ name, image }: CardBestProductProps) {
  return (
    <div className="flex flex-col shadow-xs aspect-[100/129] shadow-gray-200 bg-light-cokelat rounded-lg p-4 w-[clamp(15rem,53.5vw,18rem)] xs:w-[clamp(18rem,52.7vw,21rem)] md:w-[clamp(14.5rem,31vw,19.8rem)] lg:w-[clamp(18.16rem,28.9vw,23.063rem)] xl:w-[clamp(21rem,27.1vw,24.288rem)] 2xl:w-[25rem]  gap-5 xs:gap-7 ">
      <div className="h-3/4">
        <img src={image} alt="Gambar Produk" className="rounded-lg h-full w-full" />
      </div>
      <div className="h-1/4 flex flex-col gap-2 lg:gap-5 items-center justify-between">
        <Text
          as="h2"
          weight="semiBold"
          className="text-secondary text-[clamp(0.8rem,4vw,1rem)] xs:text-[clamp(1.125rem,3.32vw,1.4rem)] md:text-[clamp(1rem,2.1vw,1.3rem)] lg:text-[clamp(1.2rem,1.76vw,1.4rem)] 2xl:text-[1.5rem] text-center"
        >
          {name}
        </Text>
        <Button
          asChild
          variant="default"
          className=" font-normal w-[clamp(5rem,25vw,7rem)] text-[clamp(0.7rem,2.7vw,0.9rem)] xs:text-[clamp(0.9rem,2.6vw,1.1rem)] md:text-[clamp(0.8rem,1.6vw,1rem)] md:w-[clamp(5rem,9.4vw,6rem)] lg:text-[clamp(0.9rem,1.4vw,1.1rem)] lg:w-[clamp(5rem,8.8vw,7rem)] 2xl:w-[11.25rem] 2xl:text-[1.5rem] 2xl:py-4 2xl:h-15"
        >
          <a href="/login">Beli</a>
        </Button>
      </div>
    </div>
  );
}
