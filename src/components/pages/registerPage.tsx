import FormSection from "../organism/formSection";
import InputForm from "../molecules/inputForm";
import { Title } from "../atoms/title";
import { registerForm } from "@/const/Form";
import { registerUser } from "@/api/Auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/validateSchema/register";
import { toast } from "sonner";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      toast.success(
        "Registrasi berhasil!, silahkan periksa email anda untuk verifikasi"
      );
      reset();
      navigate("/login");
    } catch (error) {
      toast.error(error as string || "Registrasi gagal. Silakan coba lagi.");
    }
  };
  return (
    <div className="flex w-full p-4 md:p-2 xl:p-3 h-dvh bg-bone">
      <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center  md:mr-1.5">
        <Title
          textAs="a"
          textProps={{ href: "/" }}
          textSize="heading2"
          textFamily="lily"
          title="Opak Kopi"
          className="absolute top-0 left-0"
        />
        <FormSection
          buttonText="Daftar"
          className="w-[16rem] xs:w-[20rem] sm:w-[23rem] md:w-[18rem] lg:w-[22rem] xl:w-[25rem] 2xl:w-[28.7rem]"
          gapForm="xs"
          gap="sm"
          register={true}
          buttonProps={{ type: "submit", disabled: isSubmitting }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {registerForm.map((item) => (
            <div key={item.id}>
              <InputForm
                inputId={item.inputId}
                children={item.children}
                labelSize="default"
                inputVariant={item.variant}
                inputClassName={
                  errors[item.inputId as keyof RegisterFormData]
                    ? "border-red-500"
                    : ""
                }
                inputProps={{
                  ...register(item.inputId as keyof RegisterFormData),
                  placeholder: item.placeHolder,
                }}
              />
              {errors[item.inputId as keyof RegisterFormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[item.inputId as keyof RegisterFormData]?.message}
                </p>
              )}
            </div>
          ))}
        </FormSection>
      </div>
      <div className="hidden md:block w-1/2 md:ml-1.5 bg-[url('/image/Header.png')] bg-cover bg-center rounded-2xl"></div>
    </div>
  );
}
