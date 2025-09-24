import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import CloseIcon from "@/components/atoms/icons/close";
import { useUIStore } from "../store/useUIStore";

const modalVariants = cva(
  "transition-transform duration-300 ease-in-out  fixed z-20 h-full bg-black/30 inset-0 w-full",
  {
    variants: {
      position: {
        center: "flex items-center justify-center",
        top: "flex items-start justify-center",
        bottom: "flex items-end justify-center",
        left: "flex items-center justify-start",
        right: "flex items-center justify-end",
      },
      paddingWrapper: {
        default: "p-4",
        none: "p-0",
      },
    },
  }
);
const childModalVariants = cva("relative", {
  variants: {
    size: {
      cart: "w-[19rem] xs:w-[25rem] h-[45rem]",
      md: "w-1/2",
      lg: "w-3/4",
      full: "w-full",
    },
    background: {
      white: "bg-white",
      broken: "bg-broken",
    },
    padding: {
      default: "p-2",
      none: "p-0",

    },
    rounded: {
      default: "rounded-lg",
    },
  }}
);

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants>, VariantProps<typeof childModalVariants> {
  className?: string;
  modalClassName?: string;
  isModalActive?: boolean;
  children: React.ReactNode;
}

export default function Modal({
  className,
  size,
  children,
  position,
  background,
  rounded,
  padding,
  isModalActive,
    modalClassName,
    paddingWrapper,
  ...props
}: ModalProps) {
  const onClose = useUIStore((state) => state.close);
  return (
    <div className={cn(modalVariants({ position, paddingWrapper }), className)} {...props}>
      <div
        className={cn(
          "relative",
          childModalVariants({ background, size, rounded, padding }),
            modalClassName
        )}
      >
        <CloseIcon
          className=" text-primary absolute top-2 right-2 z-20"
          onClick={() => onClose()}
        />
        {children}
      </div>
    </div>
  );
}
