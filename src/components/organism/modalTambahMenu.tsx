import { useEffect, useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuSchema, type MenuFormValues } from "@/validateSchema/menu";
import type { kategoriMenu } from "@/types/kategoriMenu";
import { createMenu } from "@/api/menu";
import { toast } from "sonner";

import Modal from "@/components/organism/modal";
import InputForm from "@/components/molecules/inputForm";
import SelectLabel from "@/components/molecules/selectLabel";
import Img from "@/components/atoms/img";
import { Button } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";

interface TambahMenuModalProps {
  kategoriMenu: kategoriMenu[];
  onClose: () => void;
  onSuccess: () => void;
}

const statusOptions = [
  { id: 1, name: "Tersedia", value: "tersedia" },
  { id: 2, name: "Habis", value: "habis" },
];

export default function ModalTambahMenu({
  kategoriMenu,
  onClose,
  onSuccess,
}: TambahMenuModalProps) {
  const [previewImage, setPreviewImage] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MenuFormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      status: "tersedia",
      current_price: 0,
      current_cogs: 0,
      description: "",
      category_id: "",
    },
  });

  // Tonton perubahan pada field gambar untuk membuat preview
  const watchedImage = watch("image");
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage("");
    }
  }, [watchedImage]);

  // Fungsi yang dijalankan setelah validasi berhasil
  const onSubmit: SubmitHandler<MenuFormValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category_id", data.category_id);
      formData.append("status", data.status);
      formData.append("current_price", data.current_price.toString());
      formData.append("current_cogs", data.current_cogs.toString());
      formData.append("description", data.description || "");

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      console.log(...formData);
        await createMenu(formData);
        toast.success("Menu baru berhasil ditambahkan!");
        onSuccess();
        onClose();
    } catch (error) {
      console.error("Error creating menu:", error);
      toast.error("Gagal menambahkan menu baru!");
    }
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 items-center"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="size-30 md:size-40 lg:size-50 bg-gray-200 rounded-md">
            <Img
              src={previewImage || "/image/imageIcon.png"}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <Button
            type="button"
            size="custom"
            className="bg-primary text-white text-xs py-2 px-4"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            {previewImage ? "Ubah Foto" : "Unggah Foto"}
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            {...register("image")}
            className="hidden"
          />
          {errors.image && (
            <Text size="caption" className="text-red-500">
              {errors.image.message as string}
            </Text>
          )}
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="flex flex-col xs:flex-row gap-3">
            <div className="flex-1">
              <InputForm
                children="Nama Menu"
                inputId="namaMenu"
                inputProps={{
                  ...register("name"),
                  placeholder: "Masukkan nama menu",
                }}
              />
              {errors.name && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.name.message}
                </Text>
              )}
            </div>
            <div className="flex-1">
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <SelectLabel
                    children="Kategori"
                    selectFormProps={{
                      id: "kategoriMenu",
                      options: kategoriMenu,
                      placeholder: "Pilih Kategori",
                    }}
                    selectProps={{
                      ...field,
                      getValue: (option: any) => option.id?.toString(),
                      value: field.value ?? "",
                      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                        field.onChange(e.target.value);
                      },
                    }}
                  />
                )}
              />
              {errors.category_id && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.category_id.message}
                </Text>
              )}
            </div>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <div className="flex-1">
              <SelectLabel
                children="Status"
                selectFormProps={{ id: "statusMenu", options: statusOptions }}
                selectProps={{
                  ...register("status"),
                  getValue: (option: any) => option.value,
                }}
              />
              {errors.status && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.status.message}
                </Text>
              )}
            </div>
            <div className="flex-1">
              <InputForm
                children="Harga Jual"
                inputVariant="number"
                inputId="hargaJual"
                inputProps={{
                  ...register("current_price", { valueAsNumber: true }),
                  placeholder: "Rp 0",
                }}
              />
              {errors.current_price && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.current_price.message}
                </Text>
              )}
            </div>
          </div>
          <div className="xs:w-1/2 pr-1">
            <InputForm
              children="Harga Pokok"
              inputVariant="number"
              inputId="hargaPokok"
              inputProps={{
                ...register("current_cogs", { valueAsNumber: true }),
                placeholder: "Rp 0",
              }}
            />
            {errors.current_cogs && (
              <Text size="caption" className="text-red-500 mt-1">
                {errors.current_cogs.message}
              </Text>
            )}
          </div>

          <div>
            <Text size="caption">Deskripsi</Text>
            <textarea
              id="deskripsi"
              {...register("description")}
              className="bg-input border-1 border-input text-sm text-secondary w-full min-h-[7rem] p-2 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
              maxLength={300}
              placeholder="Deskripsi singkat menu..."
            />
            {errors.description && (
              <Text size="caption" className="text-red-500">
                {errors.description.message}
              </Text>
            )}
          </div>

          <div className="flex w-full justify-between gap-2 mt-4">
            <Button
              type="button"
              className="bg-red-600 text-xs sm:text-base flex-1"
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-primary text-xs sm:text-base flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Tambah Menu"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
