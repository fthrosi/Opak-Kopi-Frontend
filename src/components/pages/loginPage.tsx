import FormSection from "../organism/formSection";
import InputForm from "../molecules/inputForm";
import { Title } from "../atoms/title";
import { loginForm } from "@/const/Form";
import { login } from "@/api/Auth";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/validateSchema/login";
import { toast } from "sonner";
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const {form, handleChange } = useFormInput({ email: "", password: "" });
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      useAuthStore.getState().login(response.user);
      toast.success("Login berhasil!");
      reset();
      navigate("/menulogin");
    } catch (error) {
      toast.error(error as string || "Login gagal. Silakan coba lagi.");
      reset();
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
          buttonText="Masuk"
          className="w-[16rem] xs:w-[20rem] sm:w-[23rem] md:w-[18rem] lg:w-[22rem] xl:w-[25rem] 2xl:w-[28.7rem]"
          gapForm="xs"
          gap="sm"
          login={true}
          onSubmit={handleSubmit(onSubmit)}
          buttonProps={{ type: "submit", disabled: isSubmitting }}
          textProps={{
            as: "a",
            href: "/email",
            size: "caption",
            children: "Lupa Kata Sandi?",
            position: "right",
            className: "hover:cursor-pointer",
          }}
        >
          {loginForm.map((item) => (
            <div key={item.id}>
              <InputForm
                inputId={item.inputId}
                children={item.children}
                labelSize="default"
                inputVariant={item.variant}
                inputClassName={
                  errors[item.inputId as keyof LoginFormData]
                    ? "border-red-500"
                    : ""
                }
                inputProps={{
                  ...register(item.inputId as keyof LoginFormData),
                  placeholder: item.placeHolder,
                }}
              />
              {errors[item.inputId as keyof LoginFormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[item.inputId as keyof LoginFormData]?.message}
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
