import Navbar from "../organism/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../organism/footer";
import Navigation from "../molecules/navigation";
import NavigationAuth from "../molecules/navbar/navigationAuth";
import LogoIcon from "../molecules/navbar/logo_icon";
import { navigationData } from "@/const/constNavbar";
import { useUIStore } from "../store/useUIStore";

export default function CompanyProfileLayout() {
  const close = useUIStore((state) => state.closeSidebar);
  const open = useUIStore((state) => state.openSidebar);

  return (
    <>
      <Navbar
        logoIcon={
          <LogoIcon
            textprops={{
              as: "a",
              family: "lily",
              textColor: "primary",
              size: "heading2",
              weight: "normal",
              className: "hover:cursor-pointer",
            }}
            href="/"
            children={"Opak kopi"}
            handleOpen={() => open("sidebarCustomer")}
            handleClose={() => close()}
          />
        }
        navigation={
          <Navigation
            data={navigationData}
            layout="navbar"
            gap="navbar"
            textprops={{
              family: "lily",
              textColor: "secondary",
              size: "heading3",
              className: " block md:inline w-fit ",
              weight: "normal",
            }}
          />
        }
        navigationButton={<NavigationAuth />}
      />
      <Outlet />
      <Footer />
    </>
  );
}
