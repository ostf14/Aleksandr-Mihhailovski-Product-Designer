export function SpriteAnimation() {
  return (
    <div
      className="sprite-walk-move"
      style={{ width: 120, height: 120 }}
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
        }}
      />
    </div>
  );
}
