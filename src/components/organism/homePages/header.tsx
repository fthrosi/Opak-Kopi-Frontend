import { data } from "@/const/constHeader";
import TitleDescription from "@/components/molecules/titleDescription";
import ButtonText from "@/components/molecules/buttonText";
import { title } from "@/const/constHeader";
import { Pages } from "@/components/atoms/page";
import { Stat } from "@/components/molecules/stat";
export default function Header() {
  return (
    <Pages className="gap-5 lg:gap-9 xl:gap-13 z-2">
      <div className="relative overflow-x-hidden rounded-4xl w-full py-4 sm:py-5 lg:py-6 xl:py-7 px-5 md:px-10 flex flex-col justify-center gap-3">
        <div className="absolute inset-0 bg-[url(/image/Header.png)] brightness-70 bg-cover bg-center z-0" />
        <TitleDescription
          className="flex flex-col gap-3 z-10"
          title={title.title}
          titleAs="h1"
          titleSize="heading1"
          titleWeight="bold"
          titlePosition="left"
          titleColor="broken"
          titleWidth="hero"
          titleStroke={false}
          description={title.description}
          descriptionAs="p"
          descriptionSize="body"
          descriptionWeight="normal"
          descriptionPosition="left"
          descriptionColor="broken"
          descriptionWidth="hero"
        />
        <div className="flex justify-start gap-2 xs:gap-5 sm:gap-7 lg:gap-10">
          {data.map((item) => (
            <Stat
              className="z-10"
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
        textSize="heading2"
        textWeight={"normal"}
        textPosition={"center"}
        textColor={"secondary"}
        textClassName="z-2 text-left xs:text-center self-center w-[clamp(17rem,83.2vw,28rem)] xs:w-[clamp(28rem,90vw,36rem)] sm:w-[clamp(36.625rem,87.7vw,42rem)] md:w-[clamp(42rem,72vw,46rem)] lg:w-[clamp(46rem,61.3vw,49rem)] xl:w-[clamp(49rem,58vw,52rem)] 2xl:w-[54rem]"
        buttonVariant="default"
        buttonAsChild={false}
        buttonText="default"
        buttonClassName="hover:bg-primary xl:shadow 2xl:shadow-black mx-4 md:mx-[clamp(1.25rem,4vw,6.75rem)] lg:mx-20 xl:mx-35 2xl:mx-40 h-auto w-fit rounded-[0.2rem] text-[0.75rem] sm:text-[clamp(0.75rem,1.3vw,0.813rem)] lg:text-[clamp(0.813rem,1vw,0.875rem)] py-1 px-2 2xl:py-2 2xl:px-[1.13rem]"
      />
    </Pages>
  );
}
