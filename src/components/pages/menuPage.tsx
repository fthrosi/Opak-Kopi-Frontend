import SectionPage from "../atoms/sectionPage";
import MenuCatalog from "../organism/menuCatalog";

export default function MenuPage() {
  return (
    <SectionPage variant="top" backgroundColor="dark" className="xl:h-dvh">
      <MenuCatalog />
    </SectionPage>
  );
}