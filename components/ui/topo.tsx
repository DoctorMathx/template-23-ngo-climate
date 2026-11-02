// Topographic contour-line texture, generated deterministically (no images, no randomness at runtime).
type Peak = { cx: number; cy: number; rings: number; base: number; step: number; seed: number };

function ringPath(cx: number, cy: number, r: number, seed: number, k: number) {
  const pts: string[] = [];
  const n = 72;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const wobble =
      Math.sin(t * 3 + seed) * (6 + k * 0.9) +
      Math.sin(t * 5 + seed * 1.7) * (3 + k * 0.4) +
      Math.cos(t * 2 + seed * 0.6) * (8 + k * 1.2);
    const rr = r + wobble;
    const x = cx + Math.cos(t) * rr * 1.25;
    const y = cy + Math.sin(t) * rr;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ") + "Z";
}

const PRESETS: Record<string, Peak[]> = {
  a: [
    { cx: 260, cy: 220, rings: 11, base: 18, step: 24, seed: 1.2 },
    { cx: 980, cy: 520, rings: 13, base: 22, step: 26, seed: 2.9 },
  ],
  b: [
    { cx: 900, cy: 160, rings: 12, base: 16, step: 25, seed: 4.1 },
    { cx: 180, cy: 600, rings: 10, base: 20, step: 27, seed: 0.4 },
  ],
};

export function Topo({
  variant = "a",
  className = "",
  stroke = "currentColor",
  opacity = 0.14,
}: {
  variant?: "a" | "b";
  className?: string;
  stroke?: string;
  opacity?: number;
}) {
  const peaks = PRESETS[variant];
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g stroke={stroke} strokeOpacity={opacity} strokeWidth={1}>
        {peaks.map((p, pi) =>
          Array.from({ length: p.rings }).map((_, k) => (
            <path key={`${pi}-${k}`} d={ringPath(p.cx, p.cy, p.base + k * p.step, p.seed, k)} />
          ))
        )}
      </g>
    </svg>
  );
}
