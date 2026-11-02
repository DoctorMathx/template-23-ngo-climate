import { impactStats, impactAsOf } from "@/mock/impact";
import { siteConfig } from "@/lib/site-config";
import { formatNumber, percent } from "@/lib/utils";
import { Odometer } from "./odometer";
import { Icon } from "./icon";
import { ProgressBar } from "./progress";

export function ImpactDashboard({ showNotes = false }: { showNotes?: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6 text-[13px] text-on-dark-muted">
        <span className="inline-flex items-center gap-2 tag tag-dark">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[color:var(--lime)] pin-pulse" />
            <span className="relative w-2 h-2 rounded-full bg-[color:var(--lime)]" />
          </span>
          Live dashboard
        </span>
        <span>Verified to {impactAsOf} · goals for {siteConfig.goals.year}</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--forest-3)] rounded-[28px] overflow-hidden border border-dark">
        {impactStats.map((s) => {
          const pct = percent(s.value, s.goal);
          return (
            <div key={s.id} className="bg-forest p-6 md:p-8 flex flex-col">
              <div className="flex items-center justify-between text-on-dark-muted">
                <span className="text-[13.5px] font-medium">{s.label}</span>
                <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-lime">
                  <Icon name={s.icon} className="w-[18px] h-[18px]" />
                </span>
              </div>
              <div className="mt-5 font-display text-[2.6rem] md:text-5xl font-semibold text-white leading-none tracking-tight">
                <Odometer value={formatNumber(s.value)} />
                {s.unit && s.unit !== "tCO₂" && <span className="text-xl text-on-dark-muted ml-1.5">{s.unit}</span>}
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-[12.5px] text-on-dark-muted mb-2">
                  <span><span className="text-lime font-semibold">{pct}%</span> of {siteConfig.goals.year} goal</span>
                  <span>{formatNumber(s.goal)}</span>
                </div>
                <ProgressBar value={s.value} max={s.goal} dark label={`${s.label}: ${pct}% of ${siteConfig.goals.year} goal`} />
              </div>
              {showNotes && <p className="mt-4 text-[13px] text-on-dark-muted">{s.note}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
