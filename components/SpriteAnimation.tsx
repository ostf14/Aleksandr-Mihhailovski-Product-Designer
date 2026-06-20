"use client";

import { useEffect, useRef, useState } from "react";

export function SpriteAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  // Two infinite CSS animations (sprite stepping + traverse) composite a frame
  // forever otherwise — even with the footer far off-screen. Pause them unless
  // the strip is actually in view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playState = playing ? "running" : "paused";

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: 120 }}
    >
      <div
        className="sprite-walk-move absolute bottom-0 left-0"
        style={{ width: 120, height: 120, animationPlayState: playState }}
      >
        <div
          role="img"
          aria-label="Pushok walking"
          className="sprite-walking-cat"
          style={{
            width: 120,
            height: 120,
            backgroundImage: "url(/CAT_Player_walking.png)",
            backgroundSize: "1200px 120px",
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
            animationPlayState: playState,
          }}
        />
      </div>
    </div>
  );
}
