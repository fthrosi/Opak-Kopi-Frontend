import React from "react";
import { cn } from "@/lib/utils";
type PageVariantProps = {
    className?: string;
    children: React.ReactNode;
} 
export default function Pages({ children, className }: PageVariantProps) {
  return (
    <div className={cn("px-2 xs:px-3 md:px-4 lg:px-14 xl:px-24 2xl:px-[4.375rem] xl:max-w-[1440px] xl:h-dvh mx-auto relative flex flex-col", className)}>
        {children}
    </div>
  );
};
