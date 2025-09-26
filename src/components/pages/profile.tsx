
import SectionPage from "../atoms/sectionPage";

import Profile from "../organism/profile";

export default function ProfilePage() {
  return (
    <SectionPage variant="top" className="min-h-dvh pb-4">
      <Profile/>
    </SectionPage>
  );
}