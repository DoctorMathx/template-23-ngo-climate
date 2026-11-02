import { cn, formatNaira, percent } from "@/lib/utils";

export function ProgressBar({ value, max, dark, label }: { value: number; max: number; dark?: boolean; label?: string }) {
  const pct = percent(value, max);
  return (
    <div
      className={cn("bar", dark && "bar-dark")}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label ?? `${pct}% complete`}
    >
      <span style={{ width: `${Math.max(pct, 2)}%` }} />
    </div>
  );
}

export function FundingProgress({
  raised,
  goal,
  donors,
  days,
  dark,
}: {
  raised: number;
  goal: number;
  donors?: number;
  days?: number;
  dark?: boolean;
}) {
  const pct = percent(raised, goal);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2.5">
        <div>
          <span className={cn("font-display text-xl font-semibold", dark ? "text-white" : "text-[color:var(--forest)]")}>
            {formatNaira(raised)}
          </span>
          <span className={cn("text-sm ml-1.5", dark ? "text-on-dark-muted" : "text-muted")}>of {formatNaira(goal)}</span>
        </div>
        <span className={cn("font-display font-semibold text-sm", dark ? "text-lime" : "text-moss")}>{pct}%</span>
      </div>
      <ProgressBar value={raised} max={goal} dark={dark} label={`${pct}% of ${formatNaira(goal)} raised`} />
      {(donors !== undefined || days !== undefined) && (
        <div className={cn("mt-2.5 flex justify-between text-[13px]", dark ? "text-on-dark-muted" : "text-muted")}>
          {donors !== undefined && <span>{donors.toLocaleString("en-NG")} donors</span>}
          {days !== undefined && <span>{days === 0 ? "Final day" : `${days} days left`}</span>}
        </div>
      )}
    </div>
  );
}
