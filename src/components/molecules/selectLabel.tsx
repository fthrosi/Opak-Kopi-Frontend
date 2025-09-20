import Select, { type SelectProps } from "../atoms/selectForm";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const selectLabelVariants = cva("flex flex-col w-full items-start gap-3", {
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
export interface SelectLabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof selectLabelVariants> {
  className?: string;
  children?: React.ReactNode;

  selectFormProps?: Pick<
    SelectProps,
    | "className"
    | "formSize"
    | "placeholder"
    | "bgColor"
    | "textColor"
    | "borderColor"
    | "focus"
    | "id"
    | "options"
  >;
  selectProps?: Omit<
    SelectProps,
    | "className"
    | "formSize"
    | "placeholder"
    | "bgColor"
    | "textColor"
    | "borderColor"
    | "focus"
    | "id"
    | "options"
  >;
}
export default function SelectLabel({
  className,
  children,
    labelSize,
  labelColor,
  selectFormProps,
  selectProps,
}: SelectLabelProps) {
  return (
    <div className={cn("font-semibold",selectLabelVariants({ labelSize,labelColor }), className)}>
      <label htmlFor={selectFormProps?.id}>{children}</label>
      <Select
        {...selectFormProps}
        {...selectProps}
      />
    </div>
  );
}
