import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const typeMap = {
  text: "text",
  number: "number",
  file: "file",
  password: "password",
  email: "email",
  search: "search",
  tel: "tel",
  url: "url",
  date: "date",
  time: "time",
  datetimeLocal: "datetime-local",
  month: "month",
  week: "week",
  color: "color",
  checkbox: "checkbox",
  radio: "radio",
  range: "range",
  hidden: "hidden",
};
const inputVariants = cva(
  "flex w-full px-3 py-1 min-w-0 rounded-md border shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        text: "text",
        number: "number",
        file: "file",
        password: "password",
        email: "email",
        search: "search",
        tel: "tel",
        url: "url",
        date: "date",
        time: "time",
        datetimeLocal: "datetime-local",
        month: "month",
        week: "week",
        color: "color",
        checkbox: "checkbox",
        radio: "radio",
        range: "range",
        hidden: "hidden",
      },
      formSize: {
        default: "h-9 text-[0.75rem] sm:text-[clamp(0.75rem,1.3vw,0.813rem)] lg:text-[clamp(0.813rem,1vw,0.875rem)]",
        sm: "h-7",
      },
      bgColor: {
        default: "bg-input file:bg-input selection:bg-input",
        white: "bg-white file:bg-white selection:bg-white",
        transparent:
          "bg-transparent file:bg-transparent selection:bg-transparent",
      },
      textColor: {
        default:
          "text-primary file:text-primary/70 placeholder:text-primary/50 selection:text-primary",
        gray: "text-gray file:text-gray/70 placeholder:text-gray/50 selection:text-gray",
      },
      placeholderColor: {
        default: "placeholder:text-primary/50",
        gray: "placeholder:text-gray/50",
      },
      borderColor: {
        default: "border-primary",
        white: "border-white",
        gray: "border-gray",
      },
      focus: {
        default:
          "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
        white:
          "focus-visible:border-white focus-visible:ring-white/50 focus-visible:ring-[3px]",
        gray:
          "focus-visible:border-gray focus-visible:ring-gray/50 focus-visible:ring-[3px]",
      },
    },
    defaultVariants: {
      variant: "text",
      formSize: "default",
      bgColor: "default",
      textColor: "default",
      placeholderColor: "default",
      borderColor: "default",
      focus: "default",
    },
  }
);
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  className?: string;
  id?: string;
  autoComplete?: string;
}

function Input({
  className,
  id,
  autoComplete,
  variant,
  bgColor,
  formSize,
  placeholderColor,
  textColor,
  borderColor,
  focus,
  ...props
}: InputProps) {
  return (
    <input
      type={typeMap[variant ?? "text"]}
      data-slot="input"
      id={id}
      autoComplete={id}
      className={cn(
        inputVariants({
          formSize,
          variant,
          bgColor,
          placeholderColor,
          textColor,
          borderColor,
          focus,
        }),
        className
      )}
      {...props}
    />
  );
}

export { Input };
