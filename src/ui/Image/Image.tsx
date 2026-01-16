import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

/**
 * A robust Image component to replace next/image in a React environment.
 * Includes loading states and fallback handling.
 */
const Image = ({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc = "/images/placeholder.png",
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden ", containerClassName)}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#0A2665]/20 border-t-[#0A2665] animate-spin" />
        </div>
      )}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        className={cn(
          "transition-all duration-700 ease-in-out",
          isLoading
            ? "scale-105 blur-lg grayscale"
            : "scale-100 blur-0 grayscale-0",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
};

export default Image;
