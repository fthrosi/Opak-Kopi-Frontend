import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const sectionVariants = cva("relative", {
    variants: {
        variant: {
            default: "",
            top: "pt-11.5 xs:pt-12.5 sm:pt-13 md:pt-18 lg:pt-19 xl:pt-20 2xl:pt-[5.9rem] pb-10 xl:pb-0 xl:min-h-dvh",
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
