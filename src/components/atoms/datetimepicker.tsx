import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

type DateTimePickerProps = {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
};
export default function ResponsiveDateTimePickers({
  value,
  onChange,
}: DateTimePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          value={value}
          onChange={onChange}
          ampm={false} 
          slotProps={{
            textField: {
              sx: {
                backgroundColor: "#F5EDE1", // bg-input
                borderRadius: "0.5rem",
                "& .MuiInputBase-input": {
                  color: "#DE962C", // text-primary
                },
                "& .MuiInputLabel-root": {
                  color: "#DE962C", // label color
                  fontWeight: 600,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#DE962C", // border-primary
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#DE962C", // border-primary on focus
                },
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
