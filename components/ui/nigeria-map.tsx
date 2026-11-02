import Link from "next/link";
import { projects } from "@/mock/projects";
import { cn } from "@/lib/utils";

// Stylised, simplified outline of Nigeria (lon/lat → SVG). Good enough for orientation — not survey-grade.
const OUTLINE: [number, number][] = [
  [2.69, 6.37], [2.72, 7.1], [2.75, 7.9], [3.1, 8.9], [3.62, 9.95], [3.6, 10.6], [3.75, 11.35], [3.62, 11.7],
  [4.1, 12.9], [4.25, 13.5], [4.9, 13.75], [5.6, 13.85], [6.4, 13.6], [6.95, 13.1], [7.4, 13.08], [8.1, 13.3],
  [9.0, 12.82], [9.6, 12.8], [10.1, 13.25], [11.0, 13.38], [11.7, 13.32], [12.3, 13.08], [13.0, 13.55],
  [13.62, 13.72], [14.08, 13.08], [14.55, 12.2], [14.2, 11.25], [13.6, 10.65], [13.3, 10.15], [13.2, 9.55],
  [12.82, 8.75], [12.25, 8.4], [11.85, 7.08], [11.35, 6.55], [11.05, 6.45], [10.6, 7.05], [10.2, 6.9],
  [9.75, 6.45], [9.45, 6.0], [8.92, 5.1], [8.55, 4.75], [8.05, 4.5], [7.45, 4.43], [6.8, 4.33], [6.1, 4.28],
  [5.62, 4.75], [5.3, 5.3], [5.0, 5.75], [4.55, 6.2], [3.95, 6.4], [3.4, 6.42], [2.69, 6.37],
];

const LON0 = 2.4;
const LAT0 = 14.1;
const K = 48;
export const MAP_W = (15.0 - LON0) * K;
export const MAP_H = (LAT0 - 3.9) * K;

export function project(lon: number, lat: number) {
  return { x: (lon - LON0) * K, y: (LAT0 - lat) * K };
}

const outlinePath =
  OUTLINE.map(([lon, lat], i) => {
    const { x, y } = project(lon, lat);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ") + "Z";

// Rivers Niger & Benue (stylised) for orientation
const NIGER: [number, number][] = [[3.6, 11.7], [4.4, 10.9], [4.8, 9.9], [5.5, 9.0], [6.7, 8.7], [6.75, 7.8], [6.7, 6.6], [6.4, 5.6], [6.2, 4.9]];
const BENUE: [number, number][] = [[6.75, 7.8], [7.6, 8.0], [8.6, 7.9], [9.6, 8.6], [10.6, 9.1], [11.6, 9.3], [12.5, 9.3], [13.2, 9.55]];
const line = (pts: [number, number][]) =>
  pts.map(([lon, lat], i) => {
    const { x, y } = project(lon, lat);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

const TYPE_COLOR: Record<string, string> = {
  "Sahel reforestation": "#C6F432",
  "Mangrove restoration": "#5FD4C4",
  "Rainforest buffer": "#7FC24A",
  Agroforestry: "#E7C27D",
  "Urban & coastal": "#F2A65A",
};

export const mapLegend = Object.entries(TYPE_COLOR);

const CITIES: { name: string; lon: number; lat: number }[] = [
  { name: "Lagos", lon: 3.38, lat: 6.52 },
  { name: "Abuja", lon: 7.49, lat: 9.06 },
  { name: "Kano", lon: 8.52, lat: 12.0 },
  { name: "Port Harcourt", lon: 7.0, lat: 4.82 },
];

export function NigeriaMap({ active, className, showLabels = true }: { active?: string; className?: string; showLabels?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      className={cn("w-full h-auto", className)}
      role="img"
      aria-label="Map of Nigeria showing Green Canopy Trust project sites"
    >
      <defs>
        <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(198,244,50,.07)" strokeWidth="1" />
        </pattern>
        <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B5A3F" stopOpacity=".55" />
          <stop offset="1" stopColor="#1B4A37" stopOpacity=".85" />
        </linearGradient>
      </defs>
      <rect width={MAP_W} height={MAP_H} fill="url(#map-grid)" />
      {/* Sahel band hint */}
      <path d={outlinePath} fill="url(#land)" stroke="#C6F432" strokeOpacity=".55" strokeWidth="1.5" strokeLinejoin="round" />
      <path d={line(NIGER)} fill="none" stroke="#7FD1E0" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      <path d={line(BENUE)} fill="none" stroke="#7FD1E0" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      {CITIES.map((c) => {
        const { x, y } = project(c.lon, c.lat);
        return (
          <g key={c.name} aria-hidden="true">
            <rect x={x - 2.5} y={y - 2.5} width="5" height="5" fill="#E8F0E6" opacity=".6" transform={`rotate(45 ${x} ${y})`} />
            {showLabels && (
              <text x={x + 7} y={y + 4} fontSize="11" fill="#A9BDB0" fontFamily="var(--font-sans)">
                {c.name}
              </text>
            )}
          </g>
        );
      })}
      {projects.map((p) => {
        const { x, y } = project(p.lon, p.lat);
        const color = TYPE_COLOR[p.type];
        const isActive = active === p.slug;
        return (
          <Link key={p.slug} href={`/projects/${p.slug}`} aria-label={`${p.name}, ${p.state}`}>
            <g className="group cursor-pointer">
              <circle cx={x} cy={y} r="10" fill={color} opacity=".35" className="pin-pulse" />
              <circle cx={x} cy={y} r={isActive ? 9 : 6.5} fill={color} stroke="#0C2A1E" strokeWidth="2" />
              <circle cx={x} cy={y} r="18" fill="transparent" />
              {showLabels && (
                <g className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                  <rect x={x + 12} y={y - 26} rx="10" height="22" width={p.name.length * 6.6 + 18} fill="#0C2A1E" stroke={color} strokeOpacity=".6" />
                  <text x={x + 21} y={y - 11} fontSize="11.5" fontWeight="600" fill="#fff" fontFamily="var(--font-sans)">
                    {p.name}
                  </text>
                </g>
              )}
              {isActive && (
                <text x={x + 14} y={y + 4} fontSize="13" fontWeight="700" fill="#C6F432" fontFamily="var(--font-display)">
                  {p.name}
                </text>
              )}
            </g>
          </Link>
        );
      })}
    </svg>
  );
}

export function MapLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-on-dark-muted", className)}>
      {mapLegend.map(([label, color]) => (
        <li key={label} className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
          {label}
        </li>
      ))}
    </ul>
  );
}
