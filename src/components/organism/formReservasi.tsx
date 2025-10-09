import { Text } from "../atoms/text";
import InputForm from "../molecules/inputForm";
import ResponsiveDateTimePickers from "../atoms/datetimepicker";
import type { UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
type FormReservasiProps = {
  register: UseFormRegister<any>;
  control: any; // atau UseFormReturn<any>["control"]
};
export default function FormReservasi({ register, control }: FormReservasiProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <Text size="body" weight="semiBold">
        Data Reservasi
      </Text>
      <div className="bg-white p-4 flex flex-col gap-2 rounded-lg">
        <div>
          <Text size="caption" textColor="secondary" weight="normal">
            Tanggal Dan Waktu
          </Text>
          <Controller
            name="reservation_time"
            control={control}
            render={({ field }) => (
              <ResponsiveDateTimePickers
                {...field}
                value={field.value || null}
                onChange={field.onChange}
                
              />
            )}
          />
        </div>
        <InputForm
          children="Jumlah Orang"
          labelSize="default"
          labelColor="secondary"
          labelClassName="font-semibold"
          inputFormSize="sm"
          inputVariant="number"
          inputId="jumlah-orang"
          inputProps={{
            ...register("number_of_guest"),
          }}
        />
      </div>
    </div>
  );
}
