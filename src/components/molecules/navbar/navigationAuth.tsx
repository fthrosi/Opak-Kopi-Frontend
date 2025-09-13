import { Text } from "../../atoms/text";
import { Button } from "../../atoms/button";
export default function NavigationAuth() {
  return (
    <nav className="flex flex-col gap-y-4 md:flex-row md:items-center md:space-x-4 w-fit mt-[1rem] md:mt-0">
      <Text
        as="a"
        href="/login"
        family="lily"
        size="heading3"
        textColor="secondary"
        className="block w-fit"
      >
        Masuk
      </Text>
      <Button
        variant="default"
        size="default"
        text="lily"
        className="md:h-7 2xl:h-9 2xl:text-lg hover:cursor-pointer"
      >
        <a href="/register">Daftar</a>
      </Button>
    </nav>
  );
}
