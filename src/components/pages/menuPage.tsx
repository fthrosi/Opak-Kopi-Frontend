import SectionPage from "../atoms/sectionPage";
import MenuCatalog from "../organism/menuCatalog";

export default function MenuPage() {
  return (
    <SectionPage variant="menu" backgroundColor="dark" className="h-dvh">
      <MenuCatalog />
    </SectionPage>
  );
}