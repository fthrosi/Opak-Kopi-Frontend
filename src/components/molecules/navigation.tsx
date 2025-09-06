import {Text} from "../atoms/text";
import { navigationData } from "@/const/constNavbar";

export default function Navigation() {
  return (
    <nav className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-x-4 lg:gap-x-6 gap-y-4 w-fit">
      {navigationData.map((item) => (
        <Text
          key={item.id}
          as="a"
          href={item.path}
          variant="navLink"
          family="lily"
          className="xs:text-2xl text-secondary block md:inline w-fit text-xl md:text-lg 2xl:text-2xl"
        >
          {item.title}
        </Text>
      ))}
    </nav>
  );
}
