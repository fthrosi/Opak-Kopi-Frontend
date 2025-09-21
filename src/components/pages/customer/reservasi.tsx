import FormReservasi from "@/components/organism/formReservasi";
import FormIdentitasReservasi from "@/components/organism/identitasReservasiForm";
import SectionPage from "@/components/atoms/sectionPage";
import { Pages } from "@/components/atoms/page";
import TitleDescription from "@/components/molecules/titleDescription";
import { Button } from "@/components/atoms/button";
export default function Reservasi() {
  return (
    <SectionPage variant="top" backgroundColor="light" className="h-dvh pb-0">
      <Pages className="flex h-full">
        <div className="h-full flex flex-col justify-center gap-6">
          <TitleDescription
            title="Pesan Tempat Anda Sekarang"
            titleAs="h3"
            titleSize="heading3"
            titleWeight="semiBold"
            description="Pesan tempatmu sekarang agar pengalaman nongkrong jadi lebih nyaman, tanpa perlu khawatir kehabisan meja."
            descriptionAs="p"
            descriptionSize="caption"
            descriptionColor="secondary"
            descriptionPosition="left"
            descriptionClassName="opacity-70"
            className="gap-y-2"
          />
          <FormIdentitasReservasi />
          <form action="" className="flex flex-col gap-6">
            <FormReservasi />
            <Button className="w-full">Reservasi</Button>
          </form>
        </div>
        <div className="hidden"></div>
      </Pages>
    </SectionPage>
  );
}
