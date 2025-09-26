import Navbar from "../organism/navbar";
import { Outlet } from "react-router-dom";
import Navigation from "../molecules/navigation";
import LogoIcon from "../molecules/navbar/logo_icon";
import { navigationPelangganLogin } from "@/const/constNavbar";
import ProfileImage from "../molecules/navbar/profile";
export default function ProfileView() {
  return (
    <>
      <Navbar
        className="border-b-1 border-primary"
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
          />
        }
        navigation={
          <Navigation
            data={navigationPelangganLogin}
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
        navigationButton={<ProfileImage children={navigationPelangganLogin} />}
      />
      <Outlet />
    </>
  );
}
