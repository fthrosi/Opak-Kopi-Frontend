import Img from "@/components/atoms/img";
import { Text } from "@/components/atoms/text";
import { useUIStore } from "@/components/store/useUIStore";
import useAuthStore from "@/components/store/useAuthStore";

type navigasi = {
  id: number;
  title: string;
  path: string;
};
type ProfileImageProps = {
  children: navigasi[];
};
export default function ProfileImage({ children }: ProfileImageProps) {
  const isProfileDropdownOpen = useUIStore(
    (state) => state.activeDropdown === "profile"
  );
  const openProfileDropdown = useUIStore((state) => state.openDropdown);
  const closeProfileDropdown = useUIStore((state) => state.closeDropdown);
  const profileData = useAuthStore((state) => state.user);

  return (
    <>
      <div className="flex flex-col gap-5 mt-5 md:hidden">
        {children.map((item) => (
          <Text
            as="a"
            href={item.path}
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
          src={profileData?.img ? profileData.img : "/image/defaultUser.jpg"}
          alt="Profile Picture"
          className="size-8 lg:size-9 xl:size-10 2xl:size-11 rounded-full cursor-pointer"
        />
        {isProfileDropdownOpen && (
          <div className="pt-2">
            <div className="absolute top-full right-0  bg-white w-48 p-2 rounded-lg shadow-lg">
              {children.map((item) => (
                <Text
                  as="a"
                  href={item.path}
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
