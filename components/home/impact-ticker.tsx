import { extraStats, impactStats } from "@/mock/impact";
import { formatNumber } from "@/lib/utils";

export function ImpactTicker() {
  const items = [
    ...impactStats.slice(1).map((s) => ({ label: s.label, value: `${formatNumber(s.value)}${s.unit && s.unit !== "tCO₂" ? ` ${s.unit}` : ""}` })),
    ...extraStats,
  ];
  return (
    <section aria-label="Impact highlights" className="bg-[color:var(--lime)] text-[color:var(--forest)] overflow-hidden">
      <div className="container-x py-4 flex gap-8 overflow-x-auto no-scrollbar">
        {items.map((i) => (
          <div key={i.label} className="flex items-baseline gap-2 shrink-0">
            <span className="font-display text-xl font-semibold tabular-nums">{i.value}</span>
            <span className="text-[13px] font-medium opacity-80">{i.label}</span>
            <span className="ml-6 opacity-30" aria-hidden="true">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
