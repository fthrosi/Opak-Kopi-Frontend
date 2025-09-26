import Modal from "./modal";
import Img from "../atoms/img";
import { Input } from "../atoms/inputForm";
import { Button } from "../atoms/button";

type ModalProfilePictureProps = {
    preview: string | null;
    selectedFile: File | null;
    handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateProfilePicture: (file: File | null) => void;
    closeModalProfilePicture: () => void;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>;
};
export const ModalProfilePicture = ({
    preview,
    selectedFile,
    handleFileSelect,
    handleUpdateProfilePicture,
    closeModalProfilePicture,
    setSelectedFile,
    setPreview
}: ModalProfilePictureProps) => {
    return (
        <Modal
          position="center"
          paddingWrapper="default"
          size="full"
          background="white"
          padding="default"
          rounded="default"
        >
          <div className="flex flex-col gap-4">
            <div className="preview-container bg-primary/10 w-full h-64 border-b-1 border-b-primary mb-2 relative overflow-hidden flex items-center justify-center">
              {preview ? (
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Img
                    src="/image/imageIcon.png"
                    alt="Upload Icon"
                    className="w-20 h-20 opacity-50"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleUpdateProfilePicture(selectedFile)}
                disabled={!selectedFile}
                className="flex-1 bg-green-600"
              >
                Simpan
              </Button>
              <Button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview("");
                  closeModalProfilePicture();
                }}
                className="flex-1"
              >
                Batal
              </Button>
            </div>
          </div>
        </Modal>
    )
}