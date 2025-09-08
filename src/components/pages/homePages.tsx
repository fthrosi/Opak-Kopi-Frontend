import Header from "../organism/homePages/header";
import TransitionPage from "../atoms/transitionPage";
import About from "../organism/homePages/about";
import BestProduct from "../organism/homePages/bestProduct";
import SectionPage from "../atoms/sectionPage";
import { dataBestProduct } from "@/const/constBestProduct";
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
      {/* <SectionPage variant="default" backgroundColor="dark">
        <BestProduct />
        <TransitionPage variant="broken" />
      </SectionPage> */}
      <SectionPage variant="default" backgroundColor="dark">
        <TitleGridSection
          data={dataBestProduct}
          layout="bestProduct"
          pagesProps={{ variant: "bestProduct" }}
          titleDescriptionProps={{
            position: "center",
            gap: "bestProduct",
            title: "Produk Penjualan Terbaik",
            description:
              "Dipilih langsung oleh pelanggan setia kami, inilah tiga menu favorityang wajib kamu coba saat pertama kali datang ke kafe kami.",
            titleProps: {
              stroke: true,
              variant: "default",
              strokeSize: "special",
              strokeColor: "default",
              text: "broken",
              textProps: { as: "h2", position: "center", weight: "semiBold" },
            },
            descriptionProps: {
              variant: "bestProduct",
              width: "bestProduct",
              textProps: {
                position: "center",
                family: "lexend",
                weight: "semiBold",
                textColor: "primary",
              },
            },
          }}
          cardFeaturedProps={{
            variant: "bestProduct",
            imgProps: { variant: "lg", className: "h-3/4" },
            buttonTextProps: {
              button: true,
              textProps: {
                textColor: "secondary",
                position: "center",
                className:
                  "text-[clamp(0.8rem,4vw,1rem)] xs:text-[clamp(1.125rem,3.32vw,1.4rem)] md:text-[clamp(1rem,2.1vw,1.3rem)] lg:text-[clamp(1.2rem,1.76vw,1.4rem)] 2xl:text-[1.5rem]",
                weight: "semiBold",
              },
              buttonProps: {
                asChild: true,
                className:
                  "font-normal w-[clamp(5rem,25vw,7rem)] text-[clamp(0.7rem,2.7vw,0.9rem)] xs:text-[clamp(0.9rem,2.6vw,1.1rem)] md:text-[clamp(0.8rem,1.6vw,1rem)] md:w-[clamp(5rem,9.4vw,6rem)] lg:text-[clamp(0.9rem,1.4vw,1.1rem)] lg:w-[clamp(5rem,8.8vw,7rem)] 2xl:w-[11.25rem] 2xl:text-[1.5rem] 2xl:py-4 2xl:h-15",
              },
              children: <a href="/login">Beli</a>,
              className:
                "h-1/4 flex flex-col gap-2 lg:gap-5 items-center justify-between",
            },
            className:"p-4 shadow-xs shadow-gray-200 gap-5 xs:gap-7"
          }}
        />
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
