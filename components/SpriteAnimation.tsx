export function SpriteAnimation() {
  return (
    <div
      role="img"
      aria-label="Pushok idle animation"
      className="sprite-pushok"
      style={{
        width: 120,
        height: 120,
        backgroundImage: "url(/CAT_Player_CUTE_idle.png)",
        backgroundSize: "120px 1440px",
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
      }}
    />
  );
}
