import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

// type optionDATA = { id: number; name: string };
const selectVariants = cva(
  "flex w-full px-3 py-1 min-w-0 rounded-md border shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      formSize: {
        default:
          "h-9 text-[0.75rem] sm:text-[clamp(0.75rem,1.3vw,0.813rem)] lg:text-[clamp(0.813rem,1vw,0.875rem)]",
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
          "text-primary file:text-primary/70 selection:text-primary",
        gray: "text-gray file:text-gray/70 selection:text-gray",
      },
      borderColor: {
        default: "border-primary",
        white: "border-white",
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
      formSize: "default",
      bgColor: "default",
        textColor: "default",
        borderColor: "default",
        focus: "default",
    },
  }
);
type SelectOption<T = any> = T;
export interface SelectProps<T = any>
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  className?: string;
  placeholder?: string;
    id?: string;
    disabled?: boolean;
    hidden?: boolean;
    options?: SelectOption<T>[];
    getValue?: (option: T) => string | number;
  getLabel?: (option: T) => React.ReactNode;
}
export default function Select({
  className,
  formSize,
  placeholder,
  bgColor,
    textColor,
    borderColor,
    focus,
  id,
  disabled,
  hidden,
  options,
  getValue = (option) => option.id,
  getLabel = (option) => option.name,
  ...props
}: SelectProps) {
  return (
    <select name={id} id={id} className={cn(selectVariants({ formSize, bgColor, textColor, borderColor, focus }), className)} {...props}>
      <option disabled={disabled} hidden={hidden} value="">{placeholder}</option>
      {options?.map((option) => (
        <option key={(getValue(option))} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}
