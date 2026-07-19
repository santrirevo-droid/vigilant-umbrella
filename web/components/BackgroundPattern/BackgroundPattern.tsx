/**
 * Fixed, viewport-covering warm wash behind every section. Rendered once in
 * the root layout, before the scrollable content.
 *
 * Needs an explicit negative z-index: a `position: fixed` element with
 * z-index:auto paints *after* normal-flow siblings regardless of DOM order
 * (CSS2.1 stacking order, step 6 vs step 3) — it only stayed behind content
 * on pages where something else (e.g. Lenis's transformed scroll wrapper)
 * happened to give that content its own stacking context. Pages without
 * that had this pane silently covering everything, fading it out top to
 * bottom to match the gradient. Explicit -z-10 makes it correct everywhere.
 */
export default function BackgroundPattern() {
  return (
    <div
      className="fixed inset-0 -z-10 bg-gradient-to-b from-maroon via-maroon-deep to-maroon-light/40"
      aria-hidden="true"
    />
  );
}
