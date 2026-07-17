/**
 * Fixed, viewport-covering warm wash behind every section. Rendered once in
 * the root layout, before the scrollable content, so normal DOM paint order
 * (not z-index) keeps it behind everything without needing a stacking-context
 * hack. Replaces the old busy floral pattern image with a quiet gradient so
 * the neutral paper tone reads as premium rather than "template."
 */
export default function BackgroundPattern() {
  return (
    <div
      className="fixed inset-0 bg-gradient-to-b from-cream via-warm-white to-beige/40"
      aria-hidden="true"
    />
  );
}
