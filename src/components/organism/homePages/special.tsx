import Card from "@/components/molecules/special/card";
import Header from "@/components/molecules/special/header";
import { CardSpecial } from "@/const/constCardSpecial";
export default function Special() {
  return (
    <div className="flex flex-col py-20 md:py-10 xl:py-0 gap-15 md:gap-20 xl:min-h-dvh justify-center">
      <Header />
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-15 md:gap-10 xl:gap-6.5">
        {CardSpecial.map((item) => (
          <Card key={item.title} img={item.img} title={item.title} />
        ))}
      </div>
    </div>
  );
}
