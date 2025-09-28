import Navbar from "../organism/navbar";
import { Outlet } from "react-router-dom";
import Navigation from "../molecules/navigation";
import LogoIcon from "../molecules/navbar/logo_icon";
import { navigationPelangganLogin } from "@/const/constNavbar";
import ProfileImage from "../molecules/navbar/profile";
import { profileDropdownData } from "@/const/constNavbar";
import { ModalConfirmation } from "../organism/modalConfirmation";
import { useUIStore } from "../store/useUIStore";
import useAuthStore from "../store/useAuthStore";
import { logoutUser } from "@/api/Auth";
import { toast } from "sonner";

export default function CustomerLoginView() {
  const { logout } = useAuthStore();
  const close = useUIStore((state) => state.close);
  const open = useUIStore((state) => state.open);
  const openSidebar = useUIStore((state) => state.openSidebar);
  const closeSidebar = useUIStore((state) => state.closeSidebar);
  const isModalConfirmation = useUIStore(
    (state) => state.activeModal === "logout"
  );
  const handleItemClick = (item: any) => {
    if (item.action === "logout") {
      open("logout");
    } else if (item.path) {
      window.location.href = item.path;
    }
  };
  const handleLogout = async () => {
    try {
      await logoutUser();
      close();
      logout();
      window.location.href = "/login";
      toast.success("Berhasil logout");
    } catch (error) {
      toast.error("Gagal logout");
    }
  };
  return (
    <div className="relative">
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
            handleOpen={() => openSidebar("sidebarCustomer")}
            handleClose={() => closeSidebar()}
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
        navigationButton={
          <ProfileImage
            children={profileDropdownData}
            onItemClick={handleItemClick}
          />
        }
      />
      <Outlet />
      {isModalConfirmation && (
        <ModalConfirmation
          title="Konfirmasi Logout"
          message="Apakah Anda yakin ingin Keluar?"
          onClose={close}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}
