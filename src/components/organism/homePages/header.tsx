
import { data } from "@/const/constHeader";
import TitleDescription from "@/components/molecules/titleDescription";
import ButtonText from "@/components/molecules/buttonText";
import { title } from "@/const/constHeader";
import {Pages} from "@/components/atoms/page";
import { Stat } from "@/components/molecules/stat";
export default function Header() {
  return (
    <Pages className="gap-5 lg:gap-9 xl:gap-13">
      <div className="bg-[url(/image/Header.png)] bg-cover bg-center rounded-4xl w-full py-4 sm:py-5 lg:py-6 xl:py-7 px-5 md:px-10 flex flex-col justify-center gap-3">
        <TitleDescription
          className="flex flex-col gap-3"
          title={title.title}
          titleVariant="hero"
          titleWidth="hero"
          titleColor="broken"
          titleStroke={false}
          titleProps={{
            textProps: { as: "h1", weight: "bold" },
          }}
          description={title.description}
          descriptionWidth="hero"
          descriptionProps={{
            textProps: { weight: "normal", textColor: "broken" },
          }}
        />
        <div className="flex justify-start">
          {data.map((item) => (
            <Stat
              key={item.id}
              count={item.count}
              title={item.title}
              description={item.description}
              titleClassName="text-broken"
              subTitleClassName="text-primary"
              descriptionClassName="text-broken"
            />
          ))}
        </div>
      </div>
      <ButtonText
        text="“Setiap cangkir kopi menyimpan jeda ruang kecil untuk merenung,
        bercengkerama, atau sekadar bernapas dalam hidup yang serba cepat.”"
        children={"Filosofi"}
        className="flex-col-reverse gap-4 lg:gap-5 xl:gap-6"
        button={true}
        textAs={"p"}
        textFamily={"lexend"}
        textWeight={"normal"}
        textPosition={"center"}
        textColor={"secondary"}
        textClassName="z-2 self-center text-[clamp(0.55rem,2.6vw,0.85rem)] xs:text-[clamp(1.1rem,3.25vw,1.3rem)] sm:text-[clamp(1.3rem,3.4vw,1.6rem)] md:text-[clamp(1.6rem,3.3vw,2rem)] lg:text-[clamp(2rem,2.9vw,2.3rem)] xl:text-[clamp(2rem,2.5vw,2.5rem)] 2xl:text-[2.5rem] w-[clamp(15rem,72vw,24rem)] xs:w-[clamp(28rem,90vw,36rem)] sm:w-[clamp(36rem,92vw,44rem)] md:w-[clamp(44rem,85vw,54rem)] lg:w-[clamp(54rem,79vw,63rem)] xl:w-[clamp(55rem,69vw,68rem)] 2xl:w-[68rem]"
        buttonVariant="default"
        buttonAsChild={false}
        buttonText="default"
        buttonClassName="hover:bg-primary mx-4 xl:mx-[clamp(1rem,5.9vw,5.25rem)] 2xl:mx-20 h-auto w-fit rounded-[0.2rem] text-[clamp(0.3rem,1.4vw,0.5rem)] md:text-[clamp(0.7rem,1.6vw,1rem)] xl:text-sm 2xl:text-[1rem] py-1 px-2 2xl:py-2 2xl:px-[1.13rem]"
      />
    </Pages>
  );
}
