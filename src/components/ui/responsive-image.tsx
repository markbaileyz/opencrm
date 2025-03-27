
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcSets?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  fallbackSrc?: string;
  loadingComponent?: React.ReactNode;
  aspectRatio?: string;
}

/**
 * A responsive image component that loads different image sizes
 * based on the device and handles loading states
 */
const ResponsiveImage = ({
  src,
  srcSets,
  alt = "",
  className,
  fallbackSrc,
  loadingComponent,
  aspectRatio = "16/9",
  ...props
}: ResponsiveImageProps) => {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset states when source changes
    if (src) {
      setImgSrc(src);
      setLoading(true);
      setError(false);
    }
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError(true);
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  // Default loading component
  const defaultLoadingComponent = (
    <div 
      className={cn(
        "relative w-full overflow-hidden rounded bg-muted",
        `aspect-[${aspectRatio}]`
      )}
    >
      <Skeleton className="h-full w-full" />
    </div>
  );

  if (loading && !error) {
    return (
      <div className={cn("relative", className)}>
        {loadingComponent || defaultLoadingComponent}
        <img
          src={imgSrc}
          alt={alt}
          className="absolute inset-0 h-0 w-0 opacity-0"
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </div>
    );
  }

  if (error && !imgSrc) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center rounded bg-muted/50 text-muted-foreground",
          `aspect-[${aspectRatio}]`,
          className
        )}
      >
        Image not available
      </div>
    );
  }

  return (
    <picture>
      {srcSets?.mobile && (
        <source media="(max-width: 640px)" srcSet={srcSets.mobile} />
      )}
      {srcSets?.tablet && (
        <source media="(max-width: 1024px)" srcSet={srcSets.tablet} />
      )}
      {srcSets?.desktop && <source media="(min-width: 1025px)" srcSet={srcSets.desktop} />}
      <img
        src={imgSrc}
        alt={alt}
        className={cn("w-full rounded", className)}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;
