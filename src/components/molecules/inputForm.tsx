import { Input, type InputProps } from "../atoms/inputForm";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const inputVariants = cva("flex flex-col w-full items-start gap-3", {
  variants: {
    labelSize: {
      default:
        "text-[0.75rem] sm:text-[clamp(0.75rem,1.3vw,0.813rem)] lg:text-[clamp(0.813rem,1vw,0.875rem)]",
      body: "text-[clamp(0.875rem,2.8vw,0.938rem)] sm:text-[clamp(0.938rem,1.6vw,1rem)] lg:text-[clamp(1rem,1.4vw,1.063rem)] xl:text-[clamp(1.063rem,1.3vw,1.125rem)] 2xl:text-[1.125rem]",
      custom:"",
    },
    labelColor: {
      default: "text-primary",
      secondary: "text-secondary",
      light: "text-light-cokelat",
      broken: "text-broken",
    },
  },
  defaultVariants: {
    labelSize: "default",
    labelColor: "default",
  },
});

export interface InputFormProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputVariants> {
  className?: string;
  labelClassName?: string;
  children?: React.ReactNode;
  inputVariant?: InputProps["variant"];
  inputFormSize?: InputProps["formSize"];
  inputId?: InputProps["id"];
  inputBgColor?: InputProps["bgColor"];
  inputTextColor?: InputProps["textColor"];
  inputPlaceholderColor?: InputProps["placeholderColor"];
  inputBorderColor?: InputProps["borderColor"];
  inputFocus?: InputProps["focus"];
  inputClassName?: InputProps["className"];
  inputProps?: Omit<
    InputProps,
    | "className"
    | "variant"
    | "bgColor"
    | "placeholderColor"
    | "textColor"
    | "borderColor"
    | "focus"
    | "formSize"
  >;
}
export default function InputForm({
  className,
  children,
  labelSize,
  labelColor,
  inputVariant,
  inputFormSize,
  inputId,
  inputBgColor,
  inputTextColor,
  inputPlaceholderColor,
  inputBorderColor,
  inputFocus,
  inputClassName,
  inputProps,
  labelClassName
}: InputFormProps) {
  return (
    <div className={cn(inputVariants({ labelSize, labelColor }), className)}>
      <label
        htmlFor={inputId}
        className={cn(
          "font-semibold",
          labelClassName
        )}
      >
        {children}
      </label>
      <Input
        id={inputId}
        formSize={inputFormSize}
        variant={inputVariant}
        bgColor={inputBgColor}
        textColor={inputTextColor}
        placeholderColor={inputPlaceholderColor}
        borderColor={inputBorderColor}
        focus={inputFocus}
        className={inputClassName}
        {...inputProps}
      />
    </div>
  );
}
