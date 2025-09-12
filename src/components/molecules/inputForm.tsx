import { Input, type InputProps } from "../atoms/inputForm";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const inputVariants = cva("grid w-full items-center gap-3", {
  variants: {
    labelSize: {
      default:
        "text-[0.75rem] sm:text-[clamp(0.75rem,1.3vw,0.813rem)] lg:text-[clamp(0.813rem,1vw,0.875rem)]",
      body: "text-[clamp(0.875rem,2.8vw,0.938rem)] sm:text-[clamp(0.938rem,1.6vw,1rem)] lg:text-[clamp(1rem,1.4vw,1.063rem)] xl:text-[clamp(1.063rem,1.3vw,1.125rem)] 2xl:text-[1.125rem]",
    },
    labelColor: {
      default: "text-primary",
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
  children?: React.ReactNode;
  inputVariant?: InputProps["variant"];
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
  >;
}
export default function InputForm({
  className,
  children,
  labelSize,
  labelColor,
  inputVariant,
  inputId,
  inputBgColor,
  inputTextColor,
  inputPlaceholderColor,
  inputBorderColor,
  inputFocus,
  inputClassName,
  inputProps,
}: InputFormProps) {
  return (
    <div className={cn(inputVariants(), className)}>
      <label
        htmlFor={inputId}
        className={cn(
          "font-semibold",
          inputVariants({ labelSize, labelColor })
        )}
      >
        {children}
      </label>
      <Input
        id={inputId}
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
