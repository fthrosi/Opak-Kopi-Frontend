import { Button, type ButtonProps } from "../atoms/button";
import { cn } from "@/lib/utils";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Text, type TextVariantProps } from "../atoms/text";
import TitleDescription from "../molecules/titleDescription";
const formSectionVariants = cva("flex flex-col", {
  variants: {
    gap: {
      default: "gap-4",
      sm: "gap-5",
      md: "gap-6",
      lg: "gap-7",
    },
    layout: {
      default: "grid grid-cols-1",
      mdTwo: "grid grid-cols-1 md:grid-cols-2",
      mdThree: "grid grid-cols-1 md:grid-cols-3",
      lgTwo: "grid grid-cols-1 lg:grid-cols-2",
      lgThree: "grid grid-cols-1 lg:grid-cols-3",
      custom: "",
    },
    gapForm: {
      default: "gap-0",
      xs: "gap-4",
      sm: "gap-5",
      md: "gap-6",
      lg: "gap-7",
    },
  },
  defaultVariants: {
    gap: "default",
  },
});
export interface FormSectionProps
  extends VariantProps<typeof formSectionVariants> {
  className?: string;
  children?: React.ReactNode;
  buttonProps?: Omit<ButtonProps, "children">;
  buttonText?: string;
  textProps?: TextVariantProps<React.ElementType>;
  button?: boolean;
  login?: boolean;
  register?: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
export default function FormSection({
  className,
  login,
  register,
  textProps,
  children,
  gap,
  gapForm,
  layout,
  buttonProps,
  buttonText,
  button = true,
  onSubmit,
}: FormSectionProps) {
  return (
    <div className={cn(formSectionVariants({ gap }), className)}>
      {(register || login) && (
        <TitleDescription
          title={`Selamat Datang ${login ? "Kembali" : ""}`}
          titleSize="heading2"
          titleWeight="semiBold"
          titlePosition="center"
          titleColor="secondary"
          description={`Masukan ${
            login
              ? "Email Dan Kata Sandi Untuk Mengakses Akun Anda"
              : "Data Diri Anda Untuk Mendaftar Akun Baru"
          }`}
          descriptionSize="caption"
          descriptionColor="secondary"
          descriptionPosition="center"
          descriptionClassName="self-center"
          className="gap-2"
        />
      )}

      <form onSubmit={onSubmit}>
        <div className={cn(formSectionVariants({ layout, gapForm }))}>
          {children}
        </div>
        <div className="flex flex-col gap-5 mt-5">
          {login && <Text {...textProps} />}
        {button && <Button {...buttonProps}>{buttonText}</Button>}
        </div>
      </form>
      {(register || login) && (
        <Text
          {...textProps}
          as="a"
          href={register ? "/login" : "/register"}
          position="center"
          size="caption"
          children={
            <>
              {register ? "Sudah" : "Belum"} Memiliki Akun?{" "}
              <span className="text-secondary">Klik Disini</span>
            </>
          }
        />
      )}
    </div>
  );
}
