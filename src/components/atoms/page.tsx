import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pagesVariants = cva(
  "px-2 xs:px-5 md:px-4 lg:px-14 xl:px-24 2xl:px-[4.375rem] xl:max-w-[1440px] xl:min-h-dvh mx-auto relative flex flex-col",
  {
    variants: {
      variant: {
        default: "",
        small: "pb-30 pt-15",
        bestProduct: "py-30 flex flex-col items-center gap-15 justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);


export interface PagesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pagesVariants> {
  children: React.ReactNode;
  className?: string;
}

// 3. forwardRef juga menjadi sangat sederhana
const Pages = React.forwardRef<HTMLDivElement, PagesProps>(
  ({ className, children, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pagesVariants({ variant,}), className )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Pages.displayName = "Pages";

export { Pages, pagesVariants };