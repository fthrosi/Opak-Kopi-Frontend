import Img from "@/components/atoms/img";
import { Text } from "@/components/atoms/text";
export default function ProfileImage() {
  return (
    <>
    <Text size="heading3" textColor="secondary" weight="normal" family="lily" className="mt-4 md:hidden">Profile</Text>
      <Img
        src="/image/defaultUser.jpg"
        alt="Profile Picture"
        className="hidden md:block size-8 lg:size-9 xl:size-10 2xl:size-11 rounded-full"
      />
    </>
  );
}
