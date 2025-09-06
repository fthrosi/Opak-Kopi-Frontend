import React from "react";
import { cn } from "@/lib/utils";

export default function Img({
    src,
    alt,
    className,
    ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={src}
            alt={alt}
            className={cn("object-cover", className)}
            {...props}
        />
    );
}
