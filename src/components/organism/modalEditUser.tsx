import Modal from "./modal";
import InputForm from "../molecules/inputForm";
import { Button } from "../atoms/button";

type FieldConfig = {
  id: string;
  label: string;
  type: string;
};
type Props = {
  fields: FieldConfig[];
  formData: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
};

export const ModalEditUser = ({
  fields,
  formData,
  onChange,
  onSubmit,
  onClose,
  isLoading,
}: Props) => {
  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      background="white"
      padding="default"
      rounded="default"
      modalClassName="max-w-lg"
    >
      <div className="flex flex-col gap-4">
        <form
          onSubmit={(event) => {
            event?.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-3">
            {fields.map((field) => (
              <InputForm
                key={field.id}
                inputId={field.id}
                children={field.label}
                inputProps={{
                  type: field.type,
                  value: formData[field.id] || "",
                  onChange: (e) => onChange(field.id, e.target.value),
                  placeholder: `Masukkan ${field.label.toLowerCase()}`,
                }}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-green-600"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button onClick={onClose} className="flex-1" type="button">
              Batal
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
