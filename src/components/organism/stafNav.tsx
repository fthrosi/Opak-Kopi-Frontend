import { Text } from "../atoms/text";
import Img from "../atoms/img";
import BurgerMenu from "../atoms/icons/burgerMenu";
import useAuthStore from "../store/useAuthStore";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import "dayjs/locale/id";
import { useUIStore } from "../store/useUIStore";
import type { NavigasiProfile } from "@/types/navigasi";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

type StafNavProps = {
  handleOpen?: () => void;
  onItemClick?: (item: NavigasiProfile) => void;
  children: NavigasiProfile[];
};

export default function StafNav({ handleOpen, onItemClick, children }: StafNavProps) {
  const isProfileDropdownOpen = useUIStore(
    (state) => state.activeDropdown === "profile"
  );
  const openProfileDropdown = useUIStore((state) => state.openDropdown);
  const closeProfileDropdown = useUIStore((state) => state.closeDropdown);
  const user = useAuthStore((state) => state.user);
  const formattedDate = dayjs().tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
  const handleItemClick = (item: NavigasiProfile) => {
    closeProfileDropdown();
    if (onItemClick) {
      onItemClick(item);
    } else if (item.path) {
      window.location.href = item.path;
    }
  };
  return (
    <header
      className={`z-20 w-full 2xl:h-[5.75rem] border-b-1 border-primary bg-broken`}
    >
      <div className="flex items-center justify-between p-2 md:p-4 lg:px-8 xl:px-10 2xl:px-12 2xl:h-full">
        <div>
          <Text size="heading3" weight="semiBold" className="text-[0.75rem]">
            Hai, Selamat Bekerja
          </Text>
          <Text weight="semiBold" size="caption" className="opacity-70">
            {formattedDate}
          </Text>
        </div>
        <div
          className={`hidden lg:flex items-center gap-3 relative`}
          onMouseEnter={() => openProfileDropdown("profile")}
          onMouseLeave={() => closeProfileDropdown()}
        >
          <div className="size-15 rounded-full overflow-hidden">
            <Img
              src={
                (user?.img.split("/").pop() !== "null"
                  ? user?.img
                  : "/image/defaultUser.jpg") || "/image/defaultUser.jpg"
              }
              alt="profile"
              className="h-full w-full"
            />
          </div>
          {isProfileDropdownOpen && (
            <div className="pt-2">
              <div className="absolute top-full right-0  bg-white w-48 p-2 rounded-lg shadow-lg">
                {children.map((item) => (
                  <Text
                    as={item.action === "logout" ? "p" : "a"}
                    href={item.action !== "logout" ? item.path : undefined}
                    onClick={
                      item.action === "logout"
                        ? () => handleItemClick(item)
                        : undefined
                    }
                    key={item.id}
                    className="block px-4 py-2 text-sm text-secondary hover:bg-primary hover:text-white rounded-lg cursor-pointer"
                  >
                    {item.title}
                  </Text>
                ))}
              </div>
            </div>
          )}
          <div>
            <Text size="caption" weight="semiBold" className="text-secondary">
              {user?.name}
            </Text>
            <Text className="opacity-70" size="caption">
              {user?.role}
            </Text>
          </div>
        </div>
        <div className="lg:hidden">
          <BurgerMenu className=" text-primary" onClick={handleOpen} />
        </div>
      </div>
    </header>
  );
}
