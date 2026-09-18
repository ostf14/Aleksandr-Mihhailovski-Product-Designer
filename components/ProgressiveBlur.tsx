/**
 * Progressive blur — a soft dissolve at an edge instead of a cut line.
 *
 * Five stacked layers, each with its own blur radius and its own mask window.
 * One layer with a masked gradient cannot do this: `backdrop-filter` takes a
 * single radius, so the ramp has to be built out of overlapping bands whose
 * masks hand off to each other.
 *
 * Cost worth knowing: every layer is its own compositing surface, so one of
 * these is five of them. They are `pointer-events-none` and paint only where
 * their mask is opaque, but they do stay live while on screen — worth keeping
 * the count and the height small, and worth a second look if it ever shows up
 * on a scroll profile.
 *
 * Radii are the reference values, not a guessed curve: the steps are roughly
 * geometric (x1.7 each), which is what keeps the ramp reading as one gradient
 * rather than five discrete bands.
 */
const LAYERS = [
  { blur: 1.744, stops: "transparent 0%, #000 20%, #000 40%, transparent 60%" },
  { blur: 3.024, stops: "transparent 20%, #000 40%, #000 60%, transparent 80%" },
  { blur: 5.28, stops: "transparent 40%, #000 60%, #000 80%, transparent 100%" },
  { blur: 9.184, stops: "transparent 60%, #000 80%, #000 100%" },
  { blur: 16, stops: "transparent 80%, #000 100%" },
] as const;

type Props = {
  /** Which edge the strongest blur hugs. */
  edge?: "top" | "bottom";
  /** Strip height in px. */
  height?: number;
  className?: string;
};

export function ProgressiveBlur({
  edge = "top",
  height = 45,
  className = "",
}: Props) {
  // The stops are written strongest-last, so a bottom edge reads them as
  // written and a top edge reads them mirrored.
  const direction = edge === "top" ? "to top" : "to bottom";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${
        edge === "top" ? "top-0" : "bottom-0"
      } ${className}`}
      style={{ height }}
    >
      {LAYERS.map(({ blur, stops }) => {
        const mask = `linear-gradient(${direction}, ${stops})`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
