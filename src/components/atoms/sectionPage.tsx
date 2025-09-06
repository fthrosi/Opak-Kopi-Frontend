import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const sectionVariants = cva("relative", {
    variants: {
        variant: {
            default: "py-10 sm:py-15 xl:py-0",
            top: "pt-11 xs:pt-12 md:pt-16 2xl:pt-[5.65rem] pb-10 xl:pb-0",
        },
        backgroundColor: {
            light: "bg-light-cokelat",
            dark: "bg-broken",
        }
    },
    defaultVariants: {
        variant: "default",
        backgroundColor: "dark",
    },
});
export interface SectionVariantProps extends VariantProps<typeof sectionVariants> {
    className?: string;
    children: React.ReactNode;
}
export default function SectionPage({ children, className, variant, backgroundColor }: SectionVariantProps) {
  return (
    <div className={cn(sectionVariants({ variant, backgroundColor }), className)}>
        {children}
    </div>
  );
};
