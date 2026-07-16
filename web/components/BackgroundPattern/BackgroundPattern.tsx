import Image from "next/image";

/**
 * Fixed, viewport-covering floral pattern behind every section. Rendered
 * once in the root layout, before the scrollable content, so normal DOM
 * paint order (not z-index) keeps it behind everything without needing a
 * stacking-context hack.
 */
export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0" aria-hidden="true">
      <Image
        src="/bg-pattern.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
