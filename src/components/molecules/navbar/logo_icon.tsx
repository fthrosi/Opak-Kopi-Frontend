import {Text} from "../../atoms/text";
import BurgerMenu from "../../atoms/icons/burgerMenu";
import CloseIcon from "../../atoms/icons/close";
import { useUIStore } from "../../store/useUIStore";

export default function LogoIcon() {
  const isOpen = useUIStore((state) => state.activeStates.sidebar);
  const toggleSidebar = useUIStore((state) => state.toggle);

  return (
    <div className="flex items-center justify-between">
      <Text
        as="a"
        href="/"
        variant="heading"
        family="lily"
        weight="normal"
        className="text-xl xs:text-2xl 2xl:text-[2rem] text-primary"
      >
        Opak Kopi
      </Text>
      <div className="md:hidden">
        {isOpen ? (
          <CloseIcon className=" text-primary" onClick={() => toggleSidebar("sidebar")} />
        ) : (
          <BurgerMenu className=" text-primary" onClick={() => toggleSidebar("sidebar")} />
        )}
      </div>
    </div>
  );
}
