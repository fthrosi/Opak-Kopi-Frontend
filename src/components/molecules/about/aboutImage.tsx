export default function AboutImage() {
  return (
    <div className="w-full py-10 xs:pb-20 lg:py-0 lg:pb-0  flex justify-center md:justify-end md:items-center lg:mb-10 pl-6 md:pl-0">
      <div className="relative w-[clamp(13rem,53.7vw,18rem)] xs:w-[clamp(18rem,58vw,23rem)] md:w-[clamp(18rem,34.5vw,22rem)] lg:w-[clamp(22rem,37.6vw,30rem)] h-[clamp(12rem,51vw,17rem)] xs:h-[clamp(17rem,56vw,22rem)] md:h-[clamp(17rem,33vw,21rem)] lg:h-[clamp(21rem,36.4vw,29rem)]">
        <img
          src="/image/Header.png"
          alt="About Us"
          className="w-full h-full rounded-2xl"
        />
        <img
          src="/image/Header.png"
          alt="About Us"
          className="absolute inset-0 rounded-xl z-2 top-15 xs:top-25 lg:top-[clamp(6.25rem,9.7vw,8.75rem)] -left-8 xs:-left-16 lg:-left-[clamp(4rem,6.2vw,6.25rem)]  w-[clamp(11rem,48vw,16rem)] xs:w-[clamp(16rem,53vw,21rem)] md:w-[clamp(16rem,31.3vw,20rem)] lg:w-[clamp(20rem,32.6vw,26rem)] h-[clamp(10rem,45vw,15rem)] xs:h-[clamp(15rem,51vw,20rem)] md:h-[clamp(15rem,29.8vw,19rem)] lg:h-[clamp(19rem,31.3vw,25rem)]"
        />
      </div>
    </div>
  );
}
