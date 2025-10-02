import { useState, useEffect, useRef } from "react";
import type { MenuProps } from "@/types/menu";
import type { kategoriMenu } from "@/types/kategoriMenu";
import { updateMenu } from "@/api/menu";
import { toast } from "sonner";

import Modal from "@/components/organism/modal";
import InputForm from "@/components/molecules/inputForm";
import SelectLabel from "@/components/molecules/selectLabel";
import Img from "@/components/atoms/img";
import { Button } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";

interface EditMenuModalProps {
  menu: MenuProps | null;
  kategoriMenu: kategoriMenu[];
  onClose: () => void;
  onSuccess: () => void; 
}


const statusOptions = [
  { id: 1, name: "Tersedia", value: "tersedia" },
  { id: 2, name: "Habis", value: "habis" },
];

export default function ModalEditMenu({ menu, kategoriMenu, onClose, onSuccess }: EditMenuModalProps) {
  
  const [editedMenu, setEditedMenu] = useState<MenuProps | null>(menu);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    setEditedMenu(menu);
    if (menu?.image_url) {
      setPreviewImage(menu.image_url);
    } else {
      setPreviewImage("");
    }
    
    setSelectedImage(null);
  }, [menu]);

  
  const handleChange = (field: keyof MenuProps, value: any) => {
    if (editedMenu) {
      setEditedMenu({ ...editedMenu, [field]: value });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    const selectedCategory = kategoriMenu.find((cat) => cat.id === categoryId) || null;
    handleChange("category", selectedCategory);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("File yang dipilih harus berupa gambar!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB!");
        return;
      }
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUbahFotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!editedMenu) return;

    try {
      const formData = new FormData();
      formData.append("name", editedMenu.name);
      formData.append("category_id", editedMenu.category?.id.toString() || "");
      formData.append("status", editedMenu.status);
      formData.append("current_price", editedMenu.current_price.toString());
      formData.append("current_cogs", editedMenu.current_cogs.toString());
      formData.append("description", editedMenu.description);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await updateMenu(editedMenu.id, formData);

      toast.success("Menu berhasil diupdate!");
      onSuccess();
      onClose(); 
    } catch (error) {
      toast.error("Gagal mengupdate menu!");
    }
  };

  if (!editedMenu) return null;

  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      background="white"
      padding="default"
      rounded="default"
      modalClassName="max-w-[40rem] pt-5"
    >
      <div className="flex flex-col gap-5 items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="size-30 md:size-40 lg:size-50">
            <Img
              src={previewImage || "/placeholder.png"}
              alt={editedMenu.name || "Menu Image"}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <Button
            size="custom"
            className="bg-primary text-white text-xs py-2 px-4"
            onClick={handleUbahFotoClick}
          >
            Ubah Foto
          </Button>
          {selectedImage && (
            <Text size="caption" className="text-green-600 text-center">
              ✓ Foto baru dipilih (belum disimpan)
            </Text>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-col xs:flex-row gap-3">
            <InputForm
              children="Nama Menu"
              inputId="namaMenu"
              inputProps={{
                value: editedMenu.name,
                onChange: (e) => handleChange("name", e.target.value),
              }}
            />
            <SelectLabel
              children="Kategori"
              selectFormProps={{ id: "kategoriMenu", options: kategoriMenu }}
              selectProps={{
                value: editedMenu.category?.id || "",
                onChange: handleCategoryChange,
                getValue: (option) => option.id,
              }}
            />
          </div>
          <div className="flex flex-col xs:flex-row gap-3">
            <SelectLabel
              children="Status"
              selectFormProps={{ id: "statusMenu", options: statusOptions }}
              selectProps={{
                value: editedMenu.status,
                onChange: (e) => handleChange("status", e.target.value),
                getValue: (option) => option.value,
              }}
            />
            <InputForm
              children="Harga Jual"
              inputVariant="number"
              inputId="hargaJual"
              inputProps={{
                value: editedMenu.current_price,
                onChange: (e) => handleChange("current_price", parseFloat(e.target.value) || 0),
              }}
            />
          </div>
          <div className="xs:w-1/2 pr-1">
            <InputForm
              children="Harga Pokok"
              inputVariant="number"
              inputId="hargaPokok"
              inputProps={{
                value: editedMenu.current_cogs,
                onChange: (e) => handleChange("current_cogs", parseFloat(e.target.value) || 0),
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Text size="caption">Deskripsi</Text>
            <textarea
              id="deskripsi"
              className="bg-input border-1 border-input text-sm text-secondary w-full min-h-[7rem] p-2 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
              value={editedMenu.description}
              onChange={(e) => handleChange("description", e.target.value)}
              maxLength={300}
            />
            <Text size="caption" className="text-gray-500 text-right">
              {editedMenu.description.length}/300 karakter
            </Text>
          </div>

          <div className="flex w-full justify-between gap-2 mt-4">
            <Button className="bg-red-600 text-xs sm:text-base flex-1" onClick={onClose}>
              Batal
            </Button>
            <Button className="bg-primary text-xs sm:text-base flex-1" onClick={handleSubmit}>
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}