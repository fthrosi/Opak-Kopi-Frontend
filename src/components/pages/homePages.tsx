import Header from "../organism/homePages/header";
import TransitionPage from "../atoms/transitionPage";
import About from "../organism/homePages/about";
import BestProduct from "../organism/homePages/bestProduct";
import SectionPage from "../atoms/sectionPage";
import Special from "../organism/homePages/special";
import Lokasi from "../organism/homePages/lokasi";
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
        <BestProduct />
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
