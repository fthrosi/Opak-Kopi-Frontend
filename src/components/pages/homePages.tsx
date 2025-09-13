import Header from "../organism/homePages/header";
import TransitionPage from "../atoms/transitionPage";
import About from "../organism/homePages/about";
import SectionPage from "../atoms/sectionPage";
import { dataBestProduct } from "@/const/constBestProduct";
import { CardFeature } from "../molecules/cardFeatured";
import { TitleGridSection } from "../organism/titleGridSection";
import { CardSpecial } from "@/const/constCardSpecial";
export default function HomePages() {
  return (
    <div className=" bg-broken min-h-screen">
      <SectionPage
        variant="top"
        backgroundColor="dark"
        // className=""
      >
        {/* <div className="absolute z-0 right-0  rounded-full xl:size-70 bg-secondary/50 blur-2xl ring-150 ring-primary/40" />
        <div className="absolute z-0 left-50 rounded-full xl:size-70 bg-secondary/50 blur-2xl ring-150 ring-primary/40" />
        <div className="absolute z-0 left-0 bottom-0 rounded-full size-5 xl:size-70 bg-secondary/50 blur-2xl ring-150 ring-primary/40" />
        <div className="absolute z-0 right-0 bottom-0 rounded-full xl:size-70 bg-secondary/50 blur-2xl ring-150 ring-primary/40" />
        <div className="absolute z-0 right-120 bottom-50 rounded-full size-20 xl:size-70 bg-secondary blur-2xl ring-10 ring-primary/40" /> */}
        <Header />
        <TransitionPage variant="broken" />
      </SectionPage>
      <SectionPage variant="default" backgroundColor="light">
        <About />
        <TransitionPage variant="primary" />
      </SectionPage>
      <SectionPage variant="default" backgroundColor="dark">
        <TitleGridSection
          layout="bestProduct"
          gap={"bestProduct"}
          pagesProps={{ variant: "bestProduct" }}
          titleDescriptionProps={{
            position: "center",
            gap: "bestProduct",
            title: "Produk Penjualan Terbaik",
            description:
              "Dipilih langsung oleh pelanggan setia kami, inilah tiga menu favorit yang wajib kamu coba saat pertama kali datang ke kafe kami.",
            titleSize: "heading1",
            titleWeight: "semiBold",
            titleStroke: true,
            titleStrokeSize: "special",
            titleStrokeColor: "default",
            titleColor: "broken",
            titleAs: "h2",
            titlePosition: "center",
            descriptionSize: "body",
            descriptionAs: "p",
            descriptionWidth: "bestProduct",
            descriptionPosition: "center",
            descriptionWeight: "semiBold",
          }}
        >
          {dataBestProduct.map((item) => (
            <CardFeature
              src={item.image}
              alt={item.name}
              key={item.id}
              variant="bestProduct"
              className="p-4 lg:p-5.5 2xl:p-7 shadow-xs shadow-gray-200 gap-5 xs:gap-7"
              imgvariant="lg"
              imgClassName="h-3/4"
              text={item.name}
              textButtonPosition="column"
              textButtonClassName="gap-2 lg:gap-5 items-center justify-between"
              buttonText="default"
              button={true}
              buttonAsChild={true}
              buttonClassName="font-normal w-[clamp(5rem,25vw,7rem)] text-[clamp(0.7rem,2.7vw,0.9rem)] xs:text-[clamp(0.9rem,2.6vw,1.1rem)] md:text-[clamp(0.8rem,1.6vw,1rem)] md:w-[clamp(5rem,9.4vw,6rem)] lg:text-[clamp(0.9rem,1.4vw,1.1rem)] lg:w-[clamp(5rem,8.8vw,7rem)] 2xl:w-[11.25rem] 2xl:text-[1.5rem] 2xl:py-4 2xl:h-15 self-center"
              children={<a href="/login">Beli</a>}
              textAs="p"
              textFamily="lexend"
              textColor="secondary"
              textPosition="center"
              textSize="heading3"
              textWeight="semiBold"
            />
          ))}
        </TitleGridSection>
        <TransitionPage variant="broken" />
      </SectionPage>
      <SectionPage variant="default" backgroundColor="light">
        <TitleGridSection
          layout="special"
          gap="special"
          pagesProps={{ variant: "bestProduct" }}
          className="md:justify-between w-full"
          titleDescriptionProps={{
            className:
              " items-center gap-4 md:flex-row w-full md:justify-between",
            position: "default",
            direction: "default",
            title: "Apa yang membuat kami Spesial?",
            description:
              "Kami bukan sekedar kafe biasa. Dari variasi menu hingga lokasi yang strategis,semuanya kami rancang untuk bikin kamu betah.",
            titleSize: "heading1",
            titleAs: "h2",
            titleWeight: "semiBold",
            titlePosition: "center",
            titleStroke: true,
            titleStrokeSize: "special",
            titleStrokeColor: "special",
            titleColor: "light",
            titleWidth: "special",
            titleStrokeClassName: "md:text-left",
            titleTextClassName: "md:text-left",

            descriptionSize: "body",
            descriptionAs: "p",
            descriptionWeight: "normal",
            descriptionPosition: "center",
            descriptionWidth: "special",
            descriptionColor: "secondary",
            descriptionClassName: "md:text-left md:text-justify",
          }}
        >
          {CardSpecial.map((item) => (
            <CardFeature
              src={item.img}
              alt={item.title}
              key={item.id}
              variant="special"
              background={"broken"}
              aspect={"special"}
              className="py-4 px-2 xs:px-6 md:px-[clamp(1rem,2.1vw,3rem)] lg:px-[clamp(1.5rem,2.4vw,3.2rem)] xl:px-[clamp(3.2rem,4.5vw,4rem)] flex flex-col items-center shadow-xs shadow-primary"
              imgvariant="lg"
              imgClassName="size-[clamp(3.75rem,18vw,6rem)] lg:size-[clamp(6rem,8.8vw,7rem)] 2xl:size-34 rounded-lg mb-2"
              text={item.title}
              textButtonPosition="column"
              textButtonClassName="gap-2 lg:gap-5 items-center justify-between"
              textAs="p"
              textSize="heading3"
              textFamily="lexend"
              textColor="secondary"
              textPosition="center"
              textWeight="semiBold"
            />
          ))}
        </TitleGridSection>
        <TransitionPage variant="broken" />
      </SectionPage>
      <SectionPage variant="default" backgroundColor="dark">
        <TitleGridSection
          layout="default"
          gap={"bestProduct"}
          className="w-full"
          pagesProps={{ variant: "bestProduct" }}
          titleDescriptionProps={{
            position: "center",
            gap: "bestProduct",
            title: "Temukan Kami di Sini",
            description:
              "Kami berada di lokasi strategis yang mudah diakses dari mana saja. Ayo mampir dan nikmati suasana kafe yang nyaman!",
            titleAs: "h2",
            titleSize: "heading1",
            titleWeight: "semiBold",
            titlePosition: "center",
            titleStroke: true,
            titleStrokeSize: "special",
            titleStrokeColor: "default",
            titleColor: "broken",
            descriptionAs: "p",
            descriptionSize: "body",
            descriptionPosition: "center",
            descriptionWeight: "semiBold",
            descriptionColor: "primary",
            descriptionWidth: "bestProduct",
            descriptionClassName: "lg:w-[24rem] xl:w-[clamp(25rem,31vw,27rem)]",
          }}
        >
          <div className="rounded-lg w-full shadow-md h-[clamp(13rem,47.7vw,16rem)] md:h-auto xs:aspect-[143/60] ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.096452309234!2d110.47283601122147!3d-7.7795972922076695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5b4027bddeff%3A0xe3ecc03846079e75!2sOpak%20Kopi!5e0!3m2!1sid!2sid!4v1756912016733!5m2!1sid!2sid"
              width="100%"
              height="100%"
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </TitleGridSection>
      </SectionPage>
    </div>
  );
}
