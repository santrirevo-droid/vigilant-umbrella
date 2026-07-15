"use client";

import Image from "next/image";
import { forwardRef, type CSSProperties } from "react";

type PhotoBloomProps = {
  src: string;
  alt?: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
};

/**
 * A real macro flower photograph, masked into a soft-edged bloom that
 * fades into the page instead of showing a hard rectangular crop.
 * Ref forwards to the underlying <img> so it drops into the same GSAP
 * refs (useCoverRefs) as the SVG FloralLayer it replaces.
 */
const PhotoBloom = forwardRef<HTMLImageElement, PhotoBloomProps>(
  ({ src, alt = "", className = "", objectPosition = "center", priority }, ref) => {
    const maskStyle: CSSProperties = {
      objectFit: "cover",
      objectPosition,
      maskImage: "radial-gradient(circle, black 56%, transparent 80%)",
      WebkitMaskImage: "radial-gradient(circle, black 56%, transparent 80%)",
    };

    return (
      <div className={`aspect-square ${className}`}>
        <Image
          ref={ref}
          src={src}
          alt={alt}
          fill
          sizes="220px"
          priority={priority}
          aria-hidden={alt === "" ? true : undefined}
          style={maskStyle}
          className="select-none"
        />
      </div>
    );
  }
);

PhotoBloom.displayName = "PhotoBloom";

export default PhotoBloom;
