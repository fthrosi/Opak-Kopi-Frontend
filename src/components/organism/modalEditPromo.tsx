import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { promoType } from "@/types/promoType";
import {
  promoEditSchema,
  type PromoEditFormValues,
} from "@/validateSchema/promo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { MenuProps } from "@/types/menu";
import { updatePromo } from "@/api/promo";
import { toast } from "sonner";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import Modal from "@/components/organism/modal";
import InputForm from "@/components/molecules/inputForm";
import SelectLabel from "@/components/molecules/selectLabel";
import Img from "@/components/atoms/img";
import { Button } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";

interface EditPromoModalProps {
  promo: promoType | null;
  onClose: () => void;
  onSuccess: () => void;
  menus?: MenuProps[];
}

const statusOptions = [
  { id: 1, name: "Aktif", value: "Aktif" },
  { id: 2, name: "Nonaktif", value: "Tidak Aktif" },
];
const typeOptions = [
  { id: 1, name: "Persentase", value: "percent" },
  { id: 2, name: "Nominal", value: "amount" },
];
const promoSyaratOptions = [
  { id: 1, name: "Berdasarkan Menu", value: "menu" },
  { id: 2, name: "Berdasarkan Pembelian", value: "purchase" },
];

export default function ModalEditPromo({
  promo,
  onClose,
  onSuccess,
  menus,
}: EditPromoModalProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ← REACT HOOK FORM + ZOD
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PromoEditFormValues>({
    resolver: zodResolver(promoEditSchema),
  });

  const watchedType = watch("promo_type");
  const watchedSyarat = watch("syarat_promo");
  const watchedMenus = watch("promo_menus");

  // ← POPULATE FORM DENGAN DATA PROMO YANG AKAN DIEDIT
  useEffect(() => {
    if (promo) {
      // Set preview image
      if (promo.img_url) {
        setPreviewImage(promo.img_url);
      } else {
        setPreviewImage("");
      }
      setSelectedImage(null);

      // Tentukan syarat berdasarkan data
      const syarat =
        promo.promo_menus && promo.promo_menus.length > 0 ? "menu" : "purchase";

      // Reset form dengan data promo
      reset({
        name: promo.name || "",
        promo_type: promo.promo_type || "percent",
        status: promo.status || "Aktif",
        start_date: promo.start_date
          ? dayjs(promo.start_date).format("YYYY-MM-DD")
          : "",
        end_date: promo.end_date
          ? dayjs(promo.end_date).format("YYYY-MM-DD")
          : "",
        promo_code: promo.promo_code || "",
        description: promo.description || "",
        syarat_promo: syarat,
        amount_value: promo.amount_value || undefined, 
        percent_value: promo.percent_value || undefined, 
        minimum_purchase: promo.minimum_purchase || undefined,
        promo_menus: promo.promo_menus || [],
      });
    }
  }, [promo, reset]);

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

  // ← SUBMIT HANDLER
  const onSubmit = async (data: PromoEditFormValues) => {
    if (!promo) return;

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("promo_type", data.promo_type);
      formData.append("status", data.status);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("promo_code", data.promo_code);
      formData.append("description", data.description || "");

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // Handle syarat promo
      if (data.syarat_promo === "menu") {
        if (data.promo_menus && data.promo_menus.length > 0) {
          const menuIds = data.promo_menus.map((pm: any) => pm.menu.id);
          formData.append("menu_id", JSON.stringify(menuIds));
        }
      } else {
        if (data.minimum_purchase) {
          const minPurchase = Number(data.minimum_purchase);
          formData.append("minimum_purchase", minPurchase.toString());
        }
      }

      // Handle nilai promo
      if (data.promo_type === "amount" && data.amount_value) {
        const amountValue = Number(data.amount_value);
        formData.append("amount_value", amountValue.toString());
      } else if (data.promo_type === "percent" && data.percent_value) {
        const percentValue = Number(data.percent_value);
        formData.append("percent_value", percentValue.toString());
      }

      await updatePromo(promo.id, formData);
      toast.success("Promo berhasil diupdate!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Gagal mengupdate promo!");
    }
  };

  if (!promo) return null;

  return (
    <Modal
      position="center"
      paddingWrapper="default"
      size="full"
      background="white"
      padding="default"
      rounded="default"
      modalClassName="max-w-[40rem] max-h-[40rem] overflow-y-auto pt-10"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5 items-center">
          {/* Upload Image */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-60 xs:w-80 md:w-90">
              <Img
                src={previewImage || "/placeholder.png"}
                alt={promo.name || "Promo Image"}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <Button
              type="button"
              size="custom"
              className="bg-primary text-white text-xs py-2 px-4"
              onClick={handleUbahFotoClick}
              disabled={isSubmitting}
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
            {/* Row 1: Nama & Syarat */}
            <div className="flex flex-col xs:flex-row gap-3">
              <div className="flex-1">
                <InputForm
                  children="Nama Promo"
                  inputId="name"
                  inputProps={{
                    ...register("name"),
                  }}
                />
                {errors.name && (
                  <Text size="caption" className="text-red-500">
                    {errors.name.message as string}
                  </Text>
                )}
              </div>
              <div className="flex-1">
                <Controller
                  name="syarat_promo"
                  control={control}
                  render={({ field }) => (
                    <SelectLabel
                      children="Syarat Promo"
                      selectFormProps={{
                        id: "syarat_promo",
                        options: promoSyaratOptions,
                      }}
                      selectProps={{
                        ...field,
                        getValue: (option: any) => option.value,
                        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                          field.onChange(e.target.value);
                          // Reset fields when changing syarat
                          if (e.target.value === "menu") {
                            setValue("minimum_purchase", 0);
                            setValue("promo_menus", []);
                          } else {
                            setValue("promo_menus", []);
                            setValue("minimum_purchase", 0);
                          }
                        },
                      }}
                    />
                  )}
                />
                {errors.syarat_promo && (
                  <Text size="caption" className="text-red-500">
                    {errors.syarat_promo.message as string}
                  </Text>
                )}
              </div>
            </div>

            {/* Row 2: Tipe & Status */}
            <div className="flex flex-col xs:flex-row gap-3">
              <div className="xs:flex-1">
                <Controller
                  name="promo_type"
                  control={control}
                  render={({ field }) => (
                    <SelectLabel
                      children="Tipe Promo"
                      selectFormProps={{
                        id: "promo_type",
                        options: typeOptions,
                      }}
                      selectProps={{
                        ...field,
                        getValue: (option: any) => option.value,
                        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                          field.onChange(e.target.value);
                          // Reset values when changing type
                          setValue("amount_value", 0);
                          setValue("percent_value", 0);
                        },
                      }}
                    />
                  )}
                />
                {errors.promo_type && (
                  <Text size="caption" className="text-red-500">
                    {errors.promo_type.message as string}
                  </Text>
                )}
              </div>
              <div className="xs:flex-1">
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <SelectLabel
                      children="Status"
                      selectFormProps={{
                        id: "status",
                        options: statusOptions,
                      }}
                      selectProps={{
                        ...field,
                        getValue: (option: any) => option.value,
                      }}
                    />
                  )}
                />
                {errors.status && (
                  <Text size="caption" className="text-red-500">
                    {errors.status.message as string}
                  </Text>
                )}
              </div>
            </div>

            {/* Row 3: Tanggal */}
            <div className="flex flex-col xs:flex-row gap-3 mt-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="start_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Tanggal Mulai"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date: Dayjs | null) => {
                        field.onChange(date ? date.format("YYYY-MM-DD") : "");
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          error: !!errors.start_date,
                          helperText: errors.start_date?.message,
                        },
                      }}
                    />
                  )}
                />

                <Controller
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Tanggal Berakhir"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date: Dayjs | null) => {
                        field.onChange(date ? date.format("YYYY-MM-DD") : "");
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          error: !!errors.end_date,
                          helperText: errors.end_date?.message,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            {/* Row 4: Kode Promo & Nilai */}
            <div className="flex flex-col xs:flex-row gap-3">
              <div className="xs:flex-1">
                <InputForm
                  children="Kode Promo"
                  inputId="promo_code"
                  inputProps={{
                    ...register("promo_code"),
                  }}
                />
                {errors.promo_code && (
                  <Text size="caption" className="text-red-500">
                    {errors.promo_code.message as string}
                  </Text>
                )}
              </div>
              {watchedType === "amount" ? (
                <div className="xs:flex-1">
                  <InputForm
                    children="Nilai Promo (Nominal)"
                    inputId="amount_value"
                    inputVariant="number"
                    inputProps={{
                      ...register("amount_value", {
                        setValueAs: (value) => {
                          if (
                            value === "" ||
                            value === null ||
                            value === undefined
                          ) {
                            return undefined; // ← Return undefined untuk empty
                          }
                          const num = Number(value);
                          return isNaN(num) ? undefined : num;
                        },
                      }),
                    }}
                  />
                  {errors.amount_value && (
                    <Text size="caption" className="text-red-500">
                      {errors.amount_value.message as string}
                    </Text>
                  )}
                </div>
              ) : (
                <div className="xs:flex-1">
                  <InputForm
                    children="Nilai Promo (Persentase)"
                    inputId="percent_value"
                    inputVariant="number"
                    inputProps={{
                      ...register("percent_value", {
                        setValueAs: (value) => {
                          if (
                            value === "" ||
                            value === null ||
                            value === undefined
                          ) {
                            return undefined; // ← Return undefined untuk empty
                          }
                          const num = Number(value);
                          return isNaN(num) ? undefined : num;
                        },
                      }),
                    }}
                  />
                  {errors.percent_value && (
                    <Text size="caption" className="text-red-500">
                      {errors.percent_value.message as string}
                    </Text>
                  )}
                </div>
              )}
            </div>

            {/* Row 5: Syarat-based fields */}
            <div className="w-1/2 pr-2">
              {watchedSyarat === "purchase" ? (
                <>
                  <InputForm
                    children="Pembelian Minimum"
                    inputId="minimum_purchase"
                    inputVariant="number"
                    inputProps={{
                      ...register("minimum_purchase", {
                        setValueAs: (value) => {
                          if (
                            value === "" ||
                            value === null ||
                            value === undefined
                          ) {
                            return undefined; // ← Return undefined untuk empty
                          }
                          const num = Number(value);
                          return isNaN(num) ? undefined : num;
                        },
                      }),
                    }}
                  />
                  {errors.minimum_purchase && (
                    <Text size="caption" className="text-red-500">
                      {errors.minimum_purchase.message as string}
                    </Text>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-1 flex-1">
                  <Text size="caption">Menu Promo</Text>
                  <div className="border border-input rounded-md p-3 max-h-40 overflow-y-auto bg-input">
                    {menus && menus.length > 0 ? (
                      menus.map((menu) => {
                        const isChecked =
                          watchedMenus?.some(
                            (pm: any) => pm.menu.id === menu.id
                          ) ?? false;

                        return (
                          <label
                            key={menu.id}
                            className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-white/50 rounded px-2 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                const currentMenus = watchedMenus || [];
                                let newMenus;

                                if (e.target.checked) {
                                  newMenus = [...currentMenus, { menu }];
                                } else {
                                  newMenus = currentMenus.filter(
                                    (pm: any) => pm.menu.id !== menu.id
                                  );
                                }

                                setValue("promo_menus", newMenus);
                              }}
                              className="w-4 h-4 accent-primary cursor-pointer"
                            />
                            <span className="text-sm text-secondary">
                              {menu.name}
                            </span>
                          </label>
                        );
                      })
                    ) : (
                      <Text
                        size="caption"
                        className="text-gray-500 text-center py-2"
                      >
                        Tidak ada menu tersedia
                      </Text>
                    )}
                  </div>
                  {watchedMenus && watchedMenus.length > 0 && (
                    <Text size="caption" className="text-primary mt-1">
                      ✓ {watchedMenus.length} menu terpilih
                    </Text>
                  )}
                  {errors.promo_menus && (
                    <Text size="caption" className="text-red-500 mt-1">
                      {errors.promo_menus.message}
                    </Text>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <Text size="caption">Deskripsi</Text>
              <textarea
                {...register("description")}
                className="bg-input border-1 border-input text-sm text-secondary w-full min-h-[7rem] p-2 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                maxLength={300}
                disabled={isSubmitting}
              />
              <Text size="caption" className="text-gray-500 text-right">
                {watch("description")?.length || 0}/300 karakter
              </Text>
            </div>

            {/* <div className="bg-red-100 p-2 text-xs">
              <p>
                <strong>Form Errors:</strong>
              </p>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
              <p>
                <strong>Form Values:</strong>
              </p>
              <pre>{JSON.stringify(watch(), null, 2)}</pre>
            </div> */}
            {/* Action Buttons */}
            <div className="flex w-full justify-between gap-2 mt-4">
              <Button
                type="button"
                className="bg-red-600 text-xs sm:text-base flex-1"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-primary text-xs sm:text-base flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
