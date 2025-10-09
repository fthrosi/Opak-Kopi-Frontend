import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

type DateTimePickerProps = {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
};
export default function ResponsiveDateTimePickers({
  value,
  onChange,
}: DateTimePickerProps) {
  const OPENING_HOUR = 15; // Jam buka (3 sore)
  const CLOSING_HOUR = 20; // Jam tutup (jam 20 udah tutup, jadi max 19:59)
  const MIN_HOURS_ADVANCE = 3; // Minimal booking 3 jam sebelumnya
  const MINUTE_STEP = 5; // Step menit di picker

  // Fungsi untuk bulatkan ke kelipatan 5 menit berikutnya
  const roundUpToNearestStep = (time: Dayjs, step: number) => {
    const minutes = time.minute();
    const roundedMinutes = Math.ceil(minutes / step) * step;
    return time.minute(roundedMinutes).second(0).millisecond(0);
  };

  const shouldDisableTime = (value: Dayjs, view: 'hours' | 'minutes' | 'seconds') => {
    const now = dayjs();
    const isToday = value.isSame(now, 'day');
    
    const minBookingTime = roundUpToNearestStep(
      now.add(MIN_HOURS_ADVANCE, 'hour'),
      MINUTE_STEP
    );
    
    if (view === 'hours') {
      const hour = value.hour();
      
      if (hour < OPENING_HOUR || hour >= CLOSING_HOUR) {
        return true;
      }

      if (isToday) {
        const minHour = minBookingTime.hour();
        if (hour < minHour) {
          return true;
        }
      }
    }

    if (view === 'minutes') {
      if (isToday) {
        if (value.isBefore(minBookingTime)) {
          return true;
        }
      }
    }

    return false;
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          value={value}
          onChange={onChange}
          disablePast={true}
          maxDate={dayjs().add(1, "week")}
          shouldDisableTime={shouldDisableTime}
          ampm={false}
          slotProps={{
            textField: {
              sx: {
                backgroundColor: "#F5EDE1",
                borderRadius: "0.5rem",
                "& .MuiInputBase-input": {
                  color: "#DE962C",
                },
                "& .MuiInputLabel-root": {
                  color: "#DE962C",
                  fontWeight: 600,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#DE962C",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#DE962C",
                },
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
