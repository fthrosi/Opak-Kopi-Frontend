import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const transitionVariants = cva("absolute left-0 w-full bg-linear-to-b h-6 z-1 blur-lg opacity-70 -bottom-3 lg:-bottom-3 ", {
    variants: {
        variant: {
            broken: "from-broken to-primary",
            primary: "from-primary to-broken",
        }
    },
    defaultVariants: {
        variant: "broken",
    },
});
export interface TransitionVariantProps extends VariantProps<typeof transitionVariants> {
    className?: string;
}
export default function TransitionPage({ variant, className }: TransitionVariantProps) {
    return (
        <div className={cn(transitionVariants({ variant}), className )}>
            
        </div>
    );
}