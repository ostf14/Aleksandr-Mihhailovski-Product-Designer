import { FadeIn } from "./FadeIn";

type Props = {
  label: string;
  caption?: string;
  aspect?: string;
  wide?: boolean;
  className?: string;
  src?: string;
};

function isVideo(src?: string) {
  if (!src) return false;
  const noQuery = src.split("?")[0].toLowerCase();
  return /\.(mp4|webm|mov|m4v)$/.test(noQuery);
}

function Media({
  src,
  label,
  aspect,
}: {
  src?: string;
  label: string;
  aspect: string;
}) {
  if (src && isVideo(src)) {
    return (
      <video
        src={src}
        aria-label={label}
        className="h-auto w-full rounded-lg object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={label}
        className="h-auto w-full rounded-lg object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <div
      className="flex w-full items-center justify-center rounded-lg bg-surface-deep px-6 text-center"
      style={{ aspectRatio: aspect }}
    >
      <span className="max-w-md text-sm font-medium tracking-tight text-muted md:text-base">
        {label}
      </span>
    </div>
  );
}

export function ImagePlaceholder({
  label,
  caption,
  aspect = "3/2",
  wide = false,
  className = "",
  src,
}: Props) {
  if (wide) {
    return (
      <FadeIn as="figure" className={`shell ${className}`}>
        <Media src={src} label={label} aspect={aspect} />
        {caption && (
          <figcaption className="shell-prose mt-2.5 text-left font-mono text-xs text-muted">
            {caption}
          </figcaption>
        )}
      </FadeIn>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="shell">
        <FadeIn as="figure" className="shell-prose">
          <Media src={src} label={label} aspect={aspect} />
          {caption && (
            <figcaption className="mt-2.5 text-left font-mono text-xs text-muted">
              {caption}
            </figcaption>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
