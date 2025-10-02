
import SectionPage from "../atoms/sectionPage";

import Profile from "../organism/profile";
import useAuthStore from "../store/useAuthStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  return (
    <SectionPage variant={user?.role.name === "Pelanggan" ? "top" : "default"} className={` pb-4 ${user?.role.name === "Pelanggan" ? "min-h-dvh" : "h-full"}`}>
      <Profile/>
    </SectionPage>
  );
}