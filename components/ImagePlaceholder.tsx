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

function Media({ src, label, aspect }: { src?: string; label: string; aspect: string }) {
  if (src && isVideo(src)) {
    return (
      <video
        src={src}
        aria-label={label}
        className="w-full h-auto rounded-lg object-cover"
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
        className="w-full h-auto rounded-lg object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <div
      className="w-full rounded-lg bg-surface-deep flex items-center justify-center px-6 text-center"
      style={{ aspectRatio: aspect }}
    >
      <span className="text-muted text-sm md:text-base font-medium tracking-tight max-w-md">
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
          <figcaption className="shell-prose mt-2.5 font-mono text-xs text-muted text-left">
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
            <figcaption className="mt-2.5 font-mono text-xs text-muted text-left">
              {caption}
            </figcaption>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
