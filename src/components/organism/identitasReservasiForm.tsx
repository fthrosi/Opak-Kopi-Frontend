import { Text } from "../atoms/text";
import InputForm from "../molecules/inputForm";
export default function FormIdentitasReservasi() {
  return (
    <div className="flex flex-col gap-y-2">
      <Text size="body" weight="semiBold">Identitas</Text>
      <div className="bg-white p-4 flex flex-col gap-2 rounded-lg">
        <InputForm children="Nama" labelSize="default" labelColor="secondary" labelClassName="font-semibold" inputFormSize="sm" inputProps={{disabled:true}}/>
        <InputForm children="Email" labelSize="default" labelColor="secondary" labelClassName="font-semibold" inputFormSize="sm" inputProps={{disabled:true}}/>
        <InputForm children="No. Telepon" labelSize="default" labelColor="secondary" labelClassName="font-semibold" inputFormSize="sm" inputProps={{disabled:true}}/>
      </div>
    </div>
  );
}
