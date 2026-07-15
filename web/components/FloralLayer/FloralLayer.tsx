import Image from "next/image";
import { forwardRef } from "react";

type FloralLayerProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/**
 * A single decorative botanical layer (floral spray, leaves, gold ornament, frame).
 * Kept as its own DOM node — not merged into a background image — so later
 * phases can target it individually with GSAP.
 */
const FloralLayer = forwardRef<HTMLImageElement, FloralLayerProps>(
  ({ src, alt = "", width, height, className, priority }, ref) => {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        aria-hidden={alt === "" ? true : undefined}
        className={className}
      />
    );
  }
);

FloralLayer.displayName = "FloralLayer";

export default FloralLayer;
