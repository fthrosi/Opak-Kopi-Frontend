import FormReservasi from "@/components/organism/formReservasi";
import FormIdentitasReservasi from "@/components/organism/identitasReservasiForm";
import SectionPage from "@/components/atoms/sectionPage";
import { Pages } from "@/components/atoms/page";
import TitleDescription from "@/components/molecules/titleDescription";
import { Button } from "@/components/atoms/button";
import Img from "@/components/atoms/img";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservasiSchema } from "@/validateSchema/inputreservasi";
import { toast } from "sonner";
import dayjs from "dayjs";
import { createReservation } from "@/api/reservation";
import useAuthStore from "@/components/store/useAuthStore";

export default function Reservasi() {
  const {
    register,
    handleSubmit, control, reset
  } = useForm({
    resolver: zodResolver(reservasiSchema),
    mode: "onSubmit",
  });
  const onError = (errors: any) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };
  const user = useAuthStore((state) => state.user);
  const onSubmit = async (data: any) => {
    if (!user?.name || !user?.email || !user?.phone) {
      toast.error("Silakan lengkapi identitas Anda Pada Halaman Profile.",{
        duration: 5000,
      });
      return;
    }
    const reservationTimeStr = data.reservation_time?.format
      ? data.reservation_time.format("YYYY-MM-DDTHH:mm:ss")
      : data.reservation_time?.toDate
      ? dayjs(data.reservation_time.toDate()).format("YYYY-MM-DDTHH:mm:ss")
      : "";

    const reservasiData = {
      ...data,
      reservation_time: reservationTimeStr,
    };
    console.log(reservasiData.reservation_time);
    try {
       await createReservation(reservasiData);
      toast.success("Reservasi berhasil!");
      reset();
    } catch (error) {
      toast.error("Gagal membuat reservasi. Silakan coba lagi.");
    }
  };
  return (
    <SectionPage variant="top" backgroundColor="light" className="h-dvh pb-0">
      <Pages className="flex md:flex-row h-full">
        <div className="h-full flex flex-col justify-center gap-6 md:w-1/2 md:pr-5">
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
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-6"
          >
            <FormReservasi register={register} control={control} />
            <Button className="w-full" type="submit">
              Reservasi
            </Button>
          </form>
        </div>
        <div className="hidden md:block md:pl-5 w-1/2 h-full md:py-10 py-15">
          <Img
            src="/image/Header.png"
            alt="Gambar Reservasi"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Pages>
    </SectionPage>
  );
}
