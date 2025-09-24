import SectionPage from "@/components/atoms/sectionPage";
import PromoSection from "@/components/organism/promo";
export default function PromoPage() {
  return (
    <SectionPage variant="top" className="min-h-dvh flex flex-col">
      <PromoSection />
    </SectionPage>
  );
}