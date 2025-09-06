import {Text} from "@/components/atoms/text";
// import Title from "../../atoms/title";
export default function HeaderLokasi() {
  return (
    <div className=" flex flex-col items-center gap-3">
      {/* <Title title="Temukan Kami di Sini" weight="bold" /> */}
      <div className="w-full flex justify-center text-center">
        <Text
          as="p"
          variant="body"
          weight="semiBold"
          family="lexend"
          className="text-[clamp(0.55rem,2.55vw,0.85rem)] lg:text-[clamp(0.85rem,1.57vw,1.25rem)]  w-[clamp(15rem,68.3vw,23rem)] lg:w-[clamp(27rem,42.5vw,34rem)] text-primary"
        >
          Kami berada di lokasi strategis yang mudah diakses dari mana saja. Ayo mampir dan nikmati suasana kafe yang nyaman!
        </Text>
      </div>
    </div>
  );
}
