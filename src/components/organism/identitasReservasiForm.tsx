import { Text } from "../atoms/text";
import InputForm from "../molecules/inputForm";
import useAuthStore from "../store/useAuthStore";
export default function FormIdentitasReservasi() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex flex-col gap-y-2">
      <Text size="body" weight="semiBold">
        Identitas
      </Text>
      <div className="bg-white p-4 flex flex-col gap-2 rounded-lg">
        <InputForm
          children="Nama"
          labelSize="default"
          labelColor="secondary"
          labelClassName="font-semibold"
          inputFormSize="sm"
          inputProps={{ 
            disabled: true,
            value: user?.name || "",
           }}
        />
        <InputForm
          children="Email"
          labelSize="default"
          labelColor="secondary"
          labelClassName="font-semibold"
          inputFormSize="sm"
          inputProps={{ 
            disabled: true,
            value: user?.email || "",
           }}
        />
        <InputForm
          children="No. Telepon"
          labelSize="default"
          labelColor="secondary"
          labelClassName="font-semibold"
          inputFormSize="sm"
          inputProps={{ 
            disabled: true,
            value: user?.phone || "",
           }}
        />
      </div>
    </div>
  );
}
