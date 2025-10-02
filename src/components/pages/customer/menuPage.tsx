import SectionPage from "../../atoms/sectionPage";
import MenuCatalog from "../../organism/menuCatalog";
import useAuthStore from "@/components/store/useAuthStore";
import Menu from "@/components/organism/menuCatalogNotLogin";

export default function MenuPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return (
    <SectionPage variant="menu" backgroundColor="dark" className="h-dvh">
      {isLoggedIn ? <MenuCatalog /> : <Menu />}
    </SectionPage>
  );
}
