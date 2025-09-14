import {Pages} from "@/components/atoms/page";
import { Title } from "@/components/atoms/title";
import { Description } from "@/components/atoms/description";
import { about } from "@/const/constAbout";
import Img from "@/components/atoms/img";
export default function About() {
  return (
    <Pages variant="small" className="gap-10 md:gap-0 md:flex-row h-dvh">
      <div className="self-center">
        <Title
          title="TENTANG KAFE OPAK KOPI"
          stroke={false}
          textAs="h2"
          textColor="primary"
          textSize="heading2"
          textWeight="bold"
          className="mb-2"
        />
        <div className="flex flex-col gap-2 tracking-widest md:tracking-normal lg:tracking-wider">
          {about.map((item) => (
            <Description
              key={item.id}
              description={item.text}
              width="about"
              textAs="p"
              textColor="secondary"
              textSize="body"
              textPosition="justify"
            />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-end md:items-center pl-6 md:pl-0">
        <div className="relative bg-[url('/image/Header.png')] rounded-2xl bg-cover w-[clamp(13rem,53.7vw,18rem)] xs:w-[clamp(18rem,58vw,23rem)] md:w-[clamp(18rem,34.5vw,22rem)] lg:w-[clamp(22rem,37.6vw,30rem)] h-[clamp(12rem,51vw,17rem)] xs:h-[clamp(17rem,56vw,22rem)] md:h-[clamp(17rem,33vw,21rem)] lg:h-[clamp(21rem,36.4vw,29rem)]">
          <Img src="/image/Header.png" alt="About Us" variant="xl" className="absolute inset-0 z-2 top-15 xs:top-25 lg:top-[clamp(6.25rem,9.7vw,8.75rem)] -left-8 xs:-left-16 lg:-left-[clamp(4rem,6.2vw,6.25rem)]  w-[clamp(11rem,48vw,16rem)] xs:w-[clamp(16rem,53vw,21rem)] md:w-[clamp(16rem,31.3vw,20rem)] lg:w-[clamp(20rem,32.6vw,26rem)] h-[clamp(10rem,45vw,15rem)] xs:h-[clamp(15rem,51vw,20rem)] md:h-[clamp(15rem,29.8vw,19rem)] lg:h-[clamp(19rem,31.3vw,25rem)]"/>
        </div>
      </div>
    </Pages>
  );
}
