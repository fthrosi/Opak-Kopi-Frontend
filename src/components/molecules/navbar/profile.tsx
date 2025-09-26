import Img from "@/components/atoms/img";
import { Text } from "@/components/atoms/text";
import { useUIStore } from "@/components/store/useUIStore";
import useAuthStore from "@/components/store/useAuthStore";
import type { NavigasiProfile } from "@/types/navigasi";
type ProfileImageProps = {
  children: NavigasiProfile[];
  onItemClick?: (item: NavigasiProfile) => void
};
export default function ProfileImage({ children, onItemClick }: ProfileImageProps) {
  const isProfileDropdownOpen = useUIStore(
    (state) => state.activeDropdown === "profile"
  );
  const openProfileDropdown = useUIStore((state) => state.openDropdown);
  const closeProfileDropdown = useUIStore((state) => state.closeDropdown);
  const profileData = useAuthStore((state) => state.user);
  const handleItemClick = (item: NavigasiProfile) => {
    closeProfileDropdown();
    if (onItemClick) {
      onItemClick(item); 
    } else if (item.path) {
      window.location.href = item.path;
    }
  };
  return (
    <>
      <div className="flex flex-col gap-5 mt-5 md:hidden">
        {children.map((item) => (
          <Text
            as={item.action === "logout" ? "p" : "a"}
            href={item.action !== "logout" ? item.path : undefined}
            onClick={item.action === "logout" ? () => handleItemClick(item) : undefined}
            key={item.id}
            family="lily"
            size="heading3"
            className="block text-sm text-secondary hover:bg-primary hover:text-white rounded-lg cursor-pointer"
          >
            {item.title}
          </Text>
        ))}
      </div>

      <div
        className="relative hidden md:inline-block"
        onMouseEnter={() => openProfileDropdown("profile")}
        onMouseLeave={() => closeProfileDropdown()}
      >
        <Img
          src={(profileData?.img.split('/').pop() !== "null" ? profileData?.img : "/image/defaultUser.jpg") || "/image/defaultUser.jpg"}
          alt="Profile Picture"
          className="size-8 lg:size-9 xl:size-10 2xl:size-11 rounded-full cursor-pointer"
        />
        {isProfileDropdownOpen && (
          <div className="pt-2">
            <div className="absolute top-full right-0  bg-white w-48 p-2 rounded-lg shadow-lg">
              {children.map((item) => (
                <Text
                  as={item.action === "logout" ? "p" : "a"}
                  href={item.action !== "logout" ? item.path : undefined}
                  onClick={item.action === "logout" ? () => handleItemClick(item) : undefined}
                  key={item.id}
                  className="block px-4 py-2 text-sm text-secondary hover:bg-primary hover:text-white rounded-lg cursor-pointer"
                >
                  {item.title}
                </Text>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
