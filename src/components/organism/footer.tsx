import Navigation from "../molecules/navigation";
import TitleContain from "../molecules/titleContain";
import TitleDescription from "../molecules/titleDescription";
import { Kontak, data } from "@/const/constfooter";
import TextImage from "../molecules/textImage";
import { Text } from "../atoms/text";

export default function Footer() {
  return (
    <footer className="relative bg-light-cokelat">
      <div className="flex flex-col md:flex-row md:justify-between gap-5 md:gap-10 xl:gap-[6.688rem] px-2 xs:px-5 md:px-4 lg:px-14 xl:px-24 2xl:px-[4.375rem] xl:max-w-[1440px] mx-auto pt-5 pb-10 md:py-15 xl:py-[9.5rem]">
        <TitleDescription
          className="gap-2 md:gap-4 lg:gap-6 xl:gap-10 2xl:gap-7"
          position="start"
          direction="default"
          title="Opak Kopi"
          titleSize="heading2"
          titleAs="h2"
          titleWeight="normal"
          titleFamily="lily"
          titleStroke={false}
          description="Temukan lebih dari 90 makanan dan 50 minuman dalam satu tempat yang nyaman dan strategis."
          descriptionSize="body"
          descriptionColor="secondary"
          descriptionWidth="custom"
        />
        <div className="flex gap-10 xs:gap-20 md:gap-10 xl:gap-[6.688rem]">
          {data.map((item) => (
            <TitleContain
              title={item.Title}
              className="gap-2 md:gap-4 lg:gap-6 xl:gap-10 2xl:gap-12"
              titleColor="secondary"
              titleStroke={false}
              titleAs="h3"
              titleSize="body"
              key={item.id}
              titleWeight="semiBold"
            >
              <Navigation
                className="gap-1"
                data={item.navigation}
                textprops={{
                  textColor: "secondary",
                  size: "body",
                }}
              />
            </TitleContain>
          ))}
        </div>
        <TitleContain
          title="Kontak"
          position="end"
          className="gap-2 md:gap-4 lg:gap-6 xl:gap-10 2xl:gap-12"
          titleColor="secondary"
          titleStroke={false}
          titleAs="h3"
          titleSize="body"
          titleWeight="semiBold"
        >
          <div className="flex flex-col gap-2">
            {Kontak.map((item) => (
              <TextImage
                key={item.id}
                className="gap-2 2xl:gap-4 w-fit"
                gap="custom"
                imgSrc={item.icon}
                imgAlt={item.name}
                imgVariant="custom"
                imgSize="custom"
                imgClassName="size-4 xl:size-5 mt-1 xl:mt-1.5"
                text={item.name}
                textColor="secondary"
                textSize="body"
                textClassName="w-fit"
              />
            ))}
          </div>
        </TitleContain>
      </div>
      <div className="absolute bottom-0 w-full p-1 lg:p-3 bg-broken">
        <Text children="Copyright © 2025 Fathur Rosi" size="caption" weight="normal" position="center"/>
      </div>
    </footer>
  );
}
