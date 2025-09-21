import { Text } from "../atoms/text";
import InputForm from "../molecules/inputForm";
export default function FormReservasi() {
  return (
    <div className="flex flex-col gap-y-2">
      <Text size="body" weight="semiBold">Data Reservasi</Text>
      <div className="bg-white p-4 flex flex-col gap-2 rounded-lg">
        <InputForm children="Tanggal dan Waktu" labelSize="default" labelColor="secondary" labelClassName="font-semibold" inputFormSize="sm" inputVariant="datetimeLocal" inputId="tanggal-waktu"/>
        <InputForm children="Jumlah Orang" labelSize="default" labelColor="secondary" labelClassName="font-semibold" inputFormSize="sm" inputVariant="number" inputId="jumlah-orang"/>
      </div>
    </div>
  );
}
