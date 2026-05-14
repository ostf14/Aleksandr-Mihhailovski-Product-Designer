import { FadeIn } from "./FadeIn";

type Props = {
  label: string;
  caption?: string;
  aspect?: string;
  wide?: boolean;
  className?: string;
};

export function ImagePlaceholder({
  label,
  caption,
  aspect = "3/2",
  wide = false,
  className = "",
}: Props) {
  if (wide) {
    return (
      <FadeIn as="figure" className={`max-w-bleed mx-auto ${className}`}>
        <div
          className="w-full rounded-lg bg-stone-200 flex items-center justify-center px-6 text-center"
          style={{ aspectRatio: aspect }}
        >
          <span className="text-stone-500 text-sm md:text-base font-medium tracking-tight max-w-md">
            {label}
          </span>
        </div>
        {caption && (
          <figcaption className="mt-2.5 font-mono text-xs text-stone-500 text-left max-w-prose mx-auto">
            {caption}
          </figcaption>
        )}
      </FadeIn>
    );
  }

  return (
    <div className={`px-6 md:px-10 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <FadeIn as="figure" className="max-w-prose mx-auto">
          <div
            className="w-full rounded-lg bg-stone-200 flex items-center justify-center px-6 text-center"
            style={{ aspectRatio: aspect }}
          >
            <span className="text-stone-500 text-sm md:text-base font-medium tracking-tight max-w-md">
              {label}
            </span>
          </div>
          {caption && (
            <figcaption className="mt-2.5 font-mono text-xs text-stone-500 text-left">
              {caption}
            </figcaption>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
