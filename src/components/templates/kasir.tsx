import { Outlet } from "react-router-dom";
import StafNav from "../organism/stafNav";
import Sidebar from "../organism/sidebar";
import { useUIStore } from "../store/useUIStore";
import useAuthStore from "../store/useAuthStore";
import { logoutUser } from "@/api/Auth";
import { toast } from "sonner";
import { navbarStaf } from "@/const/constNavbar";
import { ModalConfirmation } from "../organism/modalConfirmation";

export default function KasirTemplate() {
  const { logout } = useAuthStore();
  const close = useUIStore((state) => state.close);
  const open = useUIStore((state) => state.open);
  const openSidebar = useUIStore((state) => state.openSidebar);
  const closeSidebar = useUIStore((state) => state.closeSidebar);
  const isSidebarOpen = useUIStore(
    (state) => state.activeSidebar === "sidebarStaf"
  );
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
    <div className="h-dvh flex lg:overflow-hidden relative">
      <div
        className={`fixed lg:static transition-transform  duration-300 ease-in-out ${
          isSidebarOpen
            ? "translate-x-0 bg-black/25"
            : "-translate-x-full lg:translate-x-0"
        }  w-full lg:w-[12rem] xl:w-[14rem] 2xl:w-[17rem] h-full z-30`}
      >
        <Sidebar handleClose={() => closeSidebar()} />
      </div>
      <div className="flex-1 flex flex-col lg:min-h-0">
        <div className="flex-shrink-0">
          <StafNav
            handleOpen={() => openSidebar("sidebarStaf")}
            children={navbarStaf}
            onItemClick={handleItemClick}
          />
        </div>
        <div className="flex-1 lg:overflow-hidden">
          <Outlet />
        </div>
      </div>
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
