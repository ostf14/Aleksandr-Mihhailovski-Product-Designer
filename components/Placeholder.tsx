/**
 * Visible content holes.
 *
 * Every spot on the new section pages that is waiting for real copy renders
 * one of these instead of invented filler, so the gaps are countable by
 * eye rather than by grepping for TODO comments.
 */

export function PlaceholderBlock({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-dashed border-stone-300 bg-cream-warm px-5 py-6 ${className}`}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-terracotta mb-2">
        Placeholder
      </div>
      <p className="font-mono text-[12px] leading-[1.6] text-charcoal/70">
        {label}
      </p>
    </div>
  );
}

/**
 * Solid fill carrying its own dimensions — never a stock photo, so there is
 * no chance of a placeholder image quietly shipping as if it were real.
 */
export function PlaceholderImage({
  width,
  height,
  className = "",
}: {
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-cream-deep ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <span className="font-mono text-[11px] text-charcoal/70">
        {width}×{height}
      </span>
    </div>
  );
}
