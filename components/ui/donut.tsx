import type { FinanceSlice } from "@/lib/types";

// Pure SVG donut — no chart library.
export function Donut({ data, center, sub, size = 220 }: { data: FinanceSlice[]; center: string; sub: string; size?: number }) {
  const r = 80;
  const c = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  const arcs = data.reduce<{ d: FinanceSlice; len: number; offset: number }[]>((acc, d) => {
    const prev = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].len : 0;
    acc.push({ d, len: (d.value / total) * c, offset: prev });
    return acc;
  }, []);
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="max-w-full h-auto shrink-0" role="img" aria-label={`${sub}: ${data.map((d) => `${d.label} ${d.value}%`).join(", ")}`}>
      <g transform="rotate(-90 100 100)">
        <circle cx="100" cy="100" r={r} fill="none" stroke="#E1EADF" strokeWidth="26" />
        {arcs.map(({ d, len, offset }) => (
          <circle
            key={d.label}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={d.color}
            strokeWidth="26"
            strokeDasharray={`${Math.max(len - 2, 0)} ${c}`}
            strokeDashoffset={-offset}
          />
        ))}
      </g>
      <text x="100" y="98" textAnchor="middle" fontSize="26" fontWeight="700" fill="#0C2A1E" fontFamily="var(--font-display)">
        {center}
      </text>
      <text x="100" y="120" textAnchor="middle" fontSize="11" fill="#5A6B62">
        {sub}
      </text>
    </svg>
  );
}

export function Legend({ data }: { data: FinanceSlice[] }) {
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label} className="flex items-start gap-3">
          <span className="mt-1.5 w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
          <div className="flex-1">
            <div className="flex justify-between gap-4 text-[15px] font-medium">
              <span>{d.label}</span>
              <span className="font-display tabular-nums">{d.value}%</span>
            </div>
            {d.note && <div className="text-[13px] text-muted">{d.note}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}
