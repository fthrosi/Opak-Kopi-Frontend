import { Text, type TextVariantProps } from "../atoms/text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const statVariants = cva("w-[clamp(6.25rem,26vw,8.5rem)] xs:w-[clamp(8.5rem,25vw,12rem)] sm:w-[clamp(12rem,31.5vw,15rem)] md:w-[10rem]",{
    variants: {
        align: {
            left: "text-left",
            center: "text-center",
            right: "text-right" 
        },
    },
    defaultVariants: {
        align: "left"
    }
});

export interface StatProps extends VariantProps<typeof statVariants> {
    count: string;
    title: string;
    description: string;
    className?: string;
    textProps?: TextVariantProps<React.ElementType>;
    ref?: React.Ref<HTMLDivElement>;
    titleClassName?: string;
    subTitleClassName?: string;
    descriptionClassName?: string;
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(({count, title, description, align, className,titleClassName, subTitleClassName, descriptionClassName,textProps, ...props}, ref) => {
    return (
        <div ref={ref} className={cn(statVariants({align}), className)} {...props}>
            <Text as="p" family="lexend" weight="normal" className={cn("text-[clamp(0.8rem,3.9vw,1.3rem)] xs:text-[clamp(1.3rem,3.8vw,1.5rem)] sm:text-[clamp(1.5rem,4.2vw,2rem)] md:text-[clamp(1.5rem,3vw,1.7rem)]", titleClassName, {...textProps})}>
                {count}
            </Text>
            <Text as="p" family="lexend" weight="normal" className={cn("text-[clamp(0.5rem,2.45vw,0.82rem)] xs:text-[clamp(0.82rem,3vw,1rem)] sm:text-[clamp(1rem,3vw,1.5rem)] md:text-[clamp(1rem,2vw,1.2rem)]", subTitleClassName, {...textProps})}>
                {title}
            </Text>
            <Text as="p" family="lexend" weight="normal" className={cn("text-[clamp(0.3rem,1.5vw,0.5rem)] xs:text-[clamp(0.5rem,1.5vw,0.7rem)] sm:text-[clamp(0.7rem,1.7vw,0.9rem)] md:text-[0.6rem] w-[clamp(4.5rem,22.5vw,7.5rem)] xs:w-[clamp(7.5rem,23vw,10rem)] sm:w-[clamp(10rem,29.4vw,14rem)] md:w-[9rem]", descriptionClassName, {...textProps})}>
                {description}
            </Text>
        </div>
    );
});

Stat.displayName = "Stat";

export { Stat };