/**
 * A YouTube player sized to the page.
 *
 * `autoplay` is honoured only alongside `mute=1` — every browser blocks
 * unmuted autoplay, and a player that silently refuses to start is worse than
 * one that never claimed it would. The controls stay on so the viewer can turn
 * the sound on, which is the whole point of muting it in the first place.
 *
 * Served from youtube-nocookie.com: same player, no tracking cookie set until
 * somebody actually presses play.
 *
 * The frame carries the aspect ratio rather than the iframe, so the space is
 * reserved before the player loads and the page does not jump.
 */
export function YouTubeEmbed({
  id,
  title,
  autoplay = false,
  className = "",
}: {
  id: string;
  /** Read aloud by screen readers in place of the player. */
  title: string;
  autoplay?: boolean;
  className?: string;
}) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...(autoplay ? { autoplay: "1", mute: "1", loop: "1", playlist: id } : {}),
  });

  return (
    <div
      className={`aspect-video overflow-hidden rounded-2xl border border-line bg-surface-deep ${className}`}
    >
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
        title={title}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
