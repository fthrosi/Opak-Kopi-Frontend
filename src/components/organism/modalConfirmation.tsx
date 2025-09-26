import Modal from "./modal";
import { Text } from "../atoms/text";
import { Button } from "../atoms/button";
type confirmationProps = {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const ModalConfirmation = ({
  title,
  message,
  onClose,
  onConfirm,
}: confirmationProps) => {
  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      background="white"
      padding="default"
      rounded="default"
      modalClassName="max-w-md p-6"
    >
      <div className="flex flex-col gap-5 items-center">
        <Text size="heading3" weight="semiBold" textColor="secondary">
          {title}
        </Text>
        <Text size="body" position="center">{message}</Text>
      </div>

      <div className="w-full flex gap-3 mt-5">
        <Button onClick={onClose} className="bg-red-600 flex-1">
          Tidak
        </Button>
        <Button onClick={onConfirm} className="bg-green-600 flex-1">
          Ya
        </Button>
      </div>
    </Modal>
  );
};
