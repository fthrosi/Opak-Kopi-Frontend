import Navigation from "../molecules/navigation";
import TitleContain from "../molecules/titleContain";
import TitleDescription from "../molecules/titleDescription";
import { Kontak, data } from "@/const/constfooter";
import TextImage from "../molecules/textImage";

export default function Footer() {
  return (
    <footer className="bg-light-cokelat">
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 xl:gap-[6.688rem] px-2 xs:px-5 md:px-4 lg:px-14 xl:px-24 2xl:px-[4.375rem] xl:max-w-[1440px] mx-auto py-5 md:py-15 xl:py-[9.5rem]">
        <TitleDescription
          className="gap-2 md:gap-4 lg:gap-6 xl:gap-10 2xl:gap-7"
          position="start"
          direction="default"
          title="Opak Kopi"
          titleVariant="custom"
          titleColor="default"
          titleStroke={false}
          titleProps={{
            textClassName: "text-2xl 2xl:text-[2.5rem]",
            textProps: {
              family: "lily",
              weight: "normal",
            },
          }}
          description="Temukan lebih dari 90 makanan dan 50 minuman dalam satu tempat yang nyaman dan strategis."
          descriptionVariant="custom"
          descriptionWidth="custom"
          descriptionProps={{
            textProps: {
              textColor: "secondary",
            },
          }}
          descriptionClassName="text-[clamp(0.55rem,2.55vw,0.85rem)] lg:text-[clamp(0.85rem,1.57vw,1.25rem)]"
        />
        <div className="flex gap-10 xs:gap-20 md:gap-10 xl:gap-[6.688rem]">
          {data.map((item) => (
            <TitleContain
              title={item.Title}
              className="gap-2 md:gap-4 lg:gap-6 xl:gap-10 2xl:gap-12"
              titleVariant="custom"
              titleColor="secondary"
              titleStroke={false}
              titleProps={{
                textClassName: "text-lg lg:text-xl 2xl:text-2xl",
              }}
            >
              <Navigation
                className="gap-1"
                data={item.navigation}
                textColor="secondary"
                textClassName="text-[clamp(0.55rem,2.55vw,0.85rem)] lg:text-[clamp(0.85rem,1.57vw,1.25rem)]"
              />
            </TitleContain>
          ))}
        </div>
        <TitleContain
          title="Kontak"
          className="gap-2 md:gap-4 lg:gap-6 xl:gap-10 2xl:gap-12"
          titleVariant="custom"
          titleColor="secondary"
          titleStroke={false}
          titleProps={{
            textClassName: "text-lg lg:text-xl 2xl:text-2xl",
          }}
        >
          <div className="flex flex-col gap-2">
            {Kontak.map((item) => (
              <TextImage
                key={item.id}
                className="gap-2 2xl:gap-4"
                gap="custom"
                imgSrc={item.icon}
                imgAlt={item.name}
                imgVariant="custom"
                imgSize="custom"
                imgClassName="size-4 xl:size-5 mt-1 xl:mt-1.5"
                text={item.name}
                textColor="secondary"
                textClassName="text-[clamp(0.55rem,2.55vw,0.85rem)] lg:text-[clamp(0.85rem,1.57vw,1.25rem)]"
              />
            ))}
          </div>
        </TitleContain>
      </div>
    </footer>
  );
}
