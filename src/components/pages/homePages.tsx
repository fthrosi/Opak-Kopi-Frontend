import Header from "../organism/homePages/header";
import TransitionPage from "../atoms/transitionPage";
import About from "../organism/homePages/about";
import SectionPage from "../atoms/sectionPage";
import { dataBestProduct } from "@/const/constBestProduct";
import { CardFeature } from "../molecules/cardFeatured";
import { TitleGridSection } from "../organism/titleGridSection";
// import Special from "../organism/homePages/special";
// import Lokasi from "../organism/homePages/lokasi";
export default function HomePages() {
  return (
    <div className=" bg-broken min-h-screen">
      <SectionPage variant="top" backgroundColor="dark">
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
          pagesProps={{ variant: "bestProduct" }}
          titleDescriptionProps={{
            position: "center",
            gap: "bestProduct",
            title: "Produk Penjualan Terbaik",
            description:
              "Dipilih langsung oleh pelanggan setia kami, inilah tiga menu favorit yang wajib kamu coba saat pertama kali datang ke kafe kami.",
            titleVariant: "default",
            titleStroke: true,
            titleStrokeSize: "special",
            titleStrokeColor: "default",
            titleColor: "broken",
            titleProps: {
              textProps: { as: "h2", position: "center", weight: "semiBold" },
            },
            descriptionVariant: "bestProduct",
            descriptionWidth: "bestProduct",
            descriptionProps: {
              textProps: {
                position: "center",
                family: "lexend",
                weight: "semiBold",
                textColor: "primary",
              },
            },
          }}
        >
          {dataBestProduct.map((item) => (
            <CardFeature
              src={item.image}
              alt={item.name}
              key={item.id}
              variant="bestProduct"
              className="p-4 shadow-xs shadow-gray-200 gap-5 xs:gap-7"
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
              textClassName="text-[clamp(0.8rem,4vw,1rem)] xs:text-[clamp(1.125rem,3.32vw,1.4rem)] md:text-[clamp(1rem,2.1vw,1.3rem)] lg:text-[clamp(1.2rem,1.76vw,1.4rem)] 2xl:text-[1.5rem]"
              textWeight="semiBold"

            />
          ))}
        </TitleGridSection>
        <TransitionPage variant="broken" />
      </SectionPage>

      {/* <div className="relative bg-light-cokelat py-8 sm:py-15">
        <TransitionTop />
        <SectionPage>
          <Special />
        </SectionPage>
        <TransitionBottom />
      </div>
      <SectionPage className="pt-8">
        <Lokasi />
      </SectionPage>  */}
    </div>
  );
}
