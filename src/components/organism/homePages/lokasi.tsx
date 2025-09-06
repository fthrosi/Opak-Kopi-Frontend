import HeaderLokasi from "@/components/molecules/lokasi/header";

export default function Lokasi() {
  return (
    <div className="flex flex-col gap-10 py-20  xl:justify-center xl:min-h-dvh">
      <HeaderLokasi />
      <div className="rounded-lg w-full shadow-md h-[clamp(13rem,47.7vw,16rem)] md:h-auto xs:aspect-[143/60] ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.096452309234!2d110.47283601122147!3d-7.7795972922076695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5b4027bddeff%3A0xe3ecc03846079e75!2sOpak%20Kopi!5e0!3m2!1sid!2sid!4v1756912016733!5m2!1sid!2sid"
          width="100%"
          height="100%"
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}
