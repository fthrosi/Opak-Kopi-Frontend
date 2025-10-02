import { useState, useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promoSchema, type PromoFormValues } from "@/validateSchema/promo";
import type { MenuProps } from "@/types/menu";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createPromo } from "@/api/promo";
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

interface TambahPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  menus?: MenuProps[];
}
const typeOptions = [
  { id: 1, name: "Persentase", value: "percent" },
  { id: 2, name: "Nominal", value: "amount" },
];
const promoSyaratOptions = [
  { id: 1, name: "Berdasarkan Menu", value: "menu" },
  { id: 2, name: "Berdasarkan Pembelian", value: "purchase" },
];
export default function ModalTambahPromo({
  isOpen,
  onClose,
  onSuccess,
  menus,
}: TambahPromoModalProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  // ← REACT HOOK FORM + ZOD
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PromoFormValues>({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      name: "",
      promo_type: "percent",
      start_date: "",
      end_date: "",
      promo_code: "",
      description: "",
      syarat_promo: "menu", // default syarat
      amount_value: 0,
      percent_value: 0,
      minimum_purchase: 0,
      promo_menus: [],
    },
  });

  const watchedType = watch("promo_type");
  const watchedSyarat = watch("syarat_promo");
  const watchedMenus = watch("promo_menus");

  // ← RESET FORM SAAT MODAL DIBUKA/DITUTUP
  useEffect(() => {
    if (isOpen) {
      reset();
      setSelectedImage(null);
      setPreviewImage("");
    }
  }, [isOpen, reset]);

  const watchedImage = watch("image");
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage("");
    }
  }, [watchedImage]);

  // ← SUBMIT HANDLER
  const onSubmit = async (data: PromoFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("promo_type", data.promo_type);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("promo_code", data.promo_code);
      formData.append("description", data.description || "");
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      // Handle syarat promo
      if (data.syarat_promo === "menu") {
        if (data.promo_menus && data.promo_menus.length > 0) {
          const menuIds = data.promo_menus.map((pm: any) => pm.menu.id);
          formData.append("menu_id", JSON.stringify(menuIds));
        }
      } else {
        if (data.minimum_purchase) {
          formData.append("minimum_purchase", data.minimum_purchase.toString());
        }
      }

      // Handle nilai promo
      if (data.promo_type === "amount" && data.amount_value) {
        formData.append("amount_value", data.amount_value.toString());
      } else if (data.promo_type === "percent" && data.percent_value) {
        formData.append("percent_value", data.percent_value.toString());
      }

      await createPromo(formData);
      toast.success("Promo berhasil ditambahkan!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Gagal menambahkan promo!");
    }
  };

  if (!isOpen) return null;

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 items-center">
          {/* Upload Image */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={` bg-gray-200 rounded-md ${
                !previewImage
                  ? "size-30 md:size-40 lg:size-50 "
                  : "w-60 h-20 xs:w-80 md:w-90"
              }`}
            >
              <Img
                src={previewImage || "/image/imageIcon.png"}
                alt="Preview Gambar Promo"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <Button
              type="button"
              size="custom"
              className="bg-primary text-white text-xs py-2 px-4"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              Pilih Foto
            </Button>
            {selectedImage && (
              <Text size="caption" className="text-green-600 text-center">
                ✓ Foto dipilih
              </Text>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              {...register("image")}
              className="hidden"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            {/* Row 1: Nama & Syarat */}
            <div className="flex flex-col xs:flex-row gap-3">
              <div className="xs:flex-1">
                <InputForm
                  children="Nama Promo"
                  inputId="name"
                  inputProps={{
                    ...register("name"),
                    placeholder: "Masukkan nama promo",
                  }}
                />
                {errors.name && (
                  <Text size="caption" className="text-red-500 mt-1">
                    {errors.name.message}
                  </Text>
                )}
              </div>

              <div className="xs:flex-1">
                <Controller
                  name="syarat_promo"
                  control={control}
                  render={({ field }) => (
                    <SelectLabel
                      children="Syarat Promo"
                      selectFormProps={{
                        id: "syarat_promo",
                        options: promoSyaratOptions,
                        placeholder: "Pilih Syarat",
                      }}
                      selectProps={{
                        ...field,
                        getValue: (option: any) => option.value,
                        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                          field.onChange(e.target.value);
                          // Reset fields when changing syarat
                          if (e.target.value === "menu") {
                            setValue("minimum_purchase", undefined);
                            setValue("promo_menus", []);
                          } else {
                            setValue("promo_menus", []);
                            setValue("minimum_purchase", undefined);
                          }
                        },
                      }}
                    />
                  )}
                />
                {errors.syarat_promo && (
                  <Text size="caption" className="text-red-500 mt-1">
                    {errors.syarat_promo.message}
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
                        placeholder: "Pilih Tipe",
                      }}
                      selectProps={{
                        ...field,
                        getValue: (option: any) => option.value,
                        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                          field.onChange(e.target.value);
                          // Reset values when changing type
                          setValue("amount_value", undefined);
                          setValue("percent_value", undefined);
                        },
                      }}
                    />
                  )}
                />
                {errors.promo_type && (
                  <Text size="caption" className="text-red-500 mt-1">
                    {errors.promo_type.message}
                  </Text>
                )}
              </div>
              <div className="xs:flex-1">
                <InputForm
                  children="Kode Promo"
                  inputId="promo_code"
                  className="xs:flex-1"
                  inputProps={{
                    ...register("promo_code"),
                    placeholder: "Masukkan kode promo",
                  }}
                />
                {errors.promo_code && (
                  <Text size="caption" className="text-red-500 mt-1">
                    {errors.promo_code.message}
                  </Text>
                )}
              </div>
            </div>

            {/* Row 3: Tanggal */}
            <div className="flex flex-col xs:flex-row gap-3 mt-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="xs:flex-1">
                  <Controller
                    name="start_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Tanggal Mulai"
                        value={field.value ? dayjs(field.value) : null}
                        disablePast={true}
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
                </div>
                <div className="xs:flex-1">
                  <Controller
                    name="end_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Tanggal Berakhir"
                        disablePast={true}
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
                </div>
              </LocalizationProvider>
            </div>

            {/* Row 4: Kode Promo & Nilai */}
            <div className="flex flex-col xs:flex-row gap-3">
              {watchedType === "amount" ? (
                <div className="xs:flex-1">
                  <div>
                    <InputForm
                      children="Nilai Promo (Nominal)"
                      inputId="amount_value"
                      inputVariant="number"
                      inputProps={{
                        ...register("amount_value", {
                          valueAsNumber: true,
                        }),
                        placeholder: "Rp 0",
                      }}
                    />
                    {errors.amount_value && (
                      <Text size="caption" className="text-red-500 mt-1">
                        {errors.amount_value.message}
                      </Text>
                    )}
                  </div>
                </div>
              ) : (
                <div className="xs:flex-1">
                  <div>
                    <InputForm
                      children="Nilai Promo (Persentase)"
                      inputId="percent_value"
                      inputVariant="number"
                      inputProps={{
                        ...register("percent_value", {
                          valueAsNumber: true,
                        }),
                        placeholder: "% (0-100)",
                      }}
                    />
                    {errors.percent_value && (
                      <Text size="caption" className="text-red-500 mt-1">
                        {errors.percent_value.message}
                      </Text>
                    )}
                  </div>
                </div>
              )}
              {watchedSyarat === "purchase" ? (
                <div className="xs:flex-1">
                  <InputForm
                    children="Pembelian Minimum"
                    inputId="minimum_purchase"
                    className="xs:flex-1"
                    inputVariant="number"
                    inputProps={{
                      ...register("minimum_purchase", {
                        valueAsNumber: true,
                      }),
                      placeholder: "Rp 0",
                    }}
                  />
                  {errors.minimum_purchase && (
                    <Text size="caption" className="text-red-500 mt-1">
                      {errors.minimum_purchase.message}
                    </Text>
                  )}
                </div>
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
                placeholder="Masukkan deskripsi promo..."
              />
              {errors.description && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.description.message}
                </Text>
              )}
              <Text size="caption" className="text-gray-500 text-right">
                {watch("description")?.length || 0}/300 karakter
              </Text>
            </div>

            {/* Action Buttons */}
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
                {isSubmitting ? "Menambah..." : "Tambah Promo"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
