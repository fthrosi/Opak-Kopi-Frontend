import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

type optionDATA = { value: string; label: string };
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
        transparent:
          "bg-transparent file:bg-transparent selection:bg-transparent",
      },
      textColor: {
        default:
          "text-primary file:text-primary/70 selection:text-primary",
      },
      borderColor: {
        default: "border-primary",
      },
      focus: {
        default:
          "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
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
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  className?: string;
  placeholder?: string;
    id?: string;
    options?: optionDATA[];
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
  options,
  ...props
}: SelectProps) {
  return (
    <select name={id} id={id} className={cn(selectVariants({ formSize, bgColor, textColor, borderColor, focus }), className)} {...props}>
      <option value="">{placeholder}</option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
