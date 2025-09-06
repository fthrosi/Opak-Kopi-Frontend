import {Text} from "../../atoms/text";
import { Button } from "../../atoms/button";

export default function HeaderCaption() {
  return (
    <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6">
      <Button
        variant="default"
        text="default"
        className="mx-4 xl:mx-[clamp(1rem,5.9vw,5.25rem)] 2xl:mx-20 h-auto w-fit rounded-[0.2rem] text-[clamp(0.3rem,1.4vw,0.5rem)] md:text-[clamp(0.7rem,1.6vw,1rem)] xl:text-sm 2xl:text-[1rem] py-1 px-2 2xl:py-2 2xl:px-[1.13rem] "
      >
        Filosofi
      </Button>
      <Text
        as="p"
        variant="caption"
        className="z-2 text-secondary text-center self-center text-[clamp(0.55rem,2.6vw,0.85rem)] xs:text-[clamp(1.1rem,3.25vw,1.3rem)] sm:text-[clamp(1.3rem,3.4vw,1.6rem)] md:text-[clamp(1.6rem,3.3vw,2rem)] lg:text-[clamp(2rem,2.9vw,2.3rem)] xl:text-[clamp(2rem,2.5vw,2.5rem)] 2xl:text-[2.5rem] w-[clamp(15rem,72vw,24rem)] xs:w-[clamp(28rem,90vw,36rem)] sm:w-[clamp(36rem,92vw,44rem)] md:w-[clamp(44rem,85vw,54rem)] lg:w-[clamp(54rem,79vw,63rem)] xl:w-[clamp(55rem,69vw,68rem)] 2xl:w-[68rem]"
        family="lexend"
        weight="normal"
      >
        “Setiap cangkir kopi menyimpan jeda ruang kecil untuk merenung,
        bercengkerama, atau sekadar bernapas dalam hidup yang serba cepat.”
      </Text>
    </div>
  );
}
