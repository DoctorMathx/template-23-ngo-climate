"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { businessPackages } from "@/mock/partners";
import { formatNaira, formatNumber } from "@/lib/utils";

// Rough, transparent emission factors (tCO₂e per year) — tuned for Nigerian offices.
const F = {
  perEmployee: 1.1, // commuting, IT, paper, waste
  perOfficeM2: 0.045, // grid electricity ~105 kWh/m²/yr × 0.43 kg/kWh
  perGenHourPerDay: 3.1, // ~20 kVA diesel genset, ~4 L/hr × 2.68 kg/L × 290 days
  perVehicleKm: 0.00021, // average petrol/diesel fleet vehicle per km
  perFlight: 0.18, // domestic return flight per passenger
};
const TREE_T_20Y = 0.3; // average survival-adjusted CO₂ per tree over 20 years

type Inputs = { employees: string; office: string; gen: string; vehicles: string; km: string; flights: string };

const FIELDS: { key: keyof Inputs; label: string; suffix: string; help: string; max: number }[] = [
  { key: "employees", label: "Employees", suffix: "people", help: "Full-time staff across all offices", max: 100000 },
  { key: "office", label: "Office floor area", suffix: "m²", help: "Total across sites", max: 1000000 },
  { key: "gen", label: "Generator use", suffix: "hrs/day", help: "Average daily diesel generator hours", max: 24 },
  { key: "vehicles", label: "Fleet vehicles", suffix: "vehicles", help: "Cars, vans, trucks, bikes", max: 50000 },
  { key: "km", label: "Average distance", suffix: "km/month", help: "Per vehicle", max: 50000 },
  { key: "flights", label: "Business flights", suffix: "per year", help: "Return domestic flights", max: 100000 },
];

function n(v: string) {
  return /^\d+$/.test(v) ? parseInt(v, 10) : 0;
}

export function CarbonEstimator() {
  const [inp, setInp] = useState<Inputs>({ employees: "120", office: "1500", gen: "6", vehicles: "8", km: "1800", flights: "60" });
  const errors = Object.fromEntries(
    FIELDS.map((f) => {
      const v = inp[f.key];
      if (v === "") return [f.key, ""];
      if (!/^\d+$/.test(v)) return [f.key, "Whole numbers only"];
      if (parseInt(v, 10) > f.max) return [f.key, `Max ${formatNumber(f.max)}`];
      return [f.key, ""];
    })
  ) as Record<keyof Inputs, string>;

  const breakdown = [
    { label: "People & operations", t: n(inp.employees) * F.perEmployee, color: "#C6F432" },
    { label: "Grid electricity", t: n(inp.office) * F.perOfficeM2, color: "#7FC24A" },
    { label: "Diesel generators", t: Math.min(n(inp.gen), 24) * F.perGenHourPerDay, color: "#E7C27D" },
    { label: "Vehicle fleet", t: n(inp.vehicles) * n(inp.km) * 12 * F.perVehicleKm, color: "#5FD4C4" },
    { label: "Business flights", t: n(inp.flights) * F.perFlight, color: "#F2A65A" },
  ];
  const total = breakdown.reduce((s, b) => s + b.t, 0);
  const trees = Math.ceil(total / TREE_T_20Y);
  const cost = trees * siteConfig.trees.pricePerTree;
  const suggested = [...businessPackages].reverse().find((p) => (p.priceValue ?? 0) <= cost) ?? businessPackages[0];

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
      <div className="card p-6 md:p-8">
        <h3 className="font-display text-2xl font-semibold">Your organisation</h3>
        <p className="text-[14px] text-muted mt-1">Annual estimate. Change any value — results update instantly.</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label htmlFor={`ce-${f.key}`} className="label">{f.label}</label>
              <div className="relative">
                <input
                  id={`ce-${f.key}`}
                  inputMode="numeric"
                  className="input !pr-24"
                  value={inp[f.key]}
                  onChange={(e) => setInp({ ...inp, [f.key]: e.target.value.trim() })}
                  aria-invalid={!!errors[f.key] || undefined}
                  aria-describedby={`ce-${f.key}-h`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12.5px] text-muted pointer-events-none">{f.suffix}</span>
              </div>
              <p id={`ce-${f.key}-h`} className={errors[f.key] ? "field-error" : "text-[12px] text-muted mt-1.5"}>{errors[f.key] || f.help}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] bg-forest on-dark p-6 md:p-8" aria-live="polite">
        <div className="eyebrow">Estimated footprint</div>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-none tabular-nums">{formatNumber(total, total < 10 ? 1 : 0)}</span>
          <span className="text-on-dark-muted">tCO₂e / year</span>
        </div>
        <div className="mt-6 flex h-3 rounded-full overflow-hidden bg-white/10" aria-hidden="true">
          {breakdown.map((b) => (
            <span key={b.label} style={{ width: `${total ? (b.t / total) * 100 : 0}%`, background: b.color }} />
          ))}
        </div>
        <ul className="mt-5 space-y-2.5 text-[14px]">
          {breakdown.map((b) => (
            <li key={b.label} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-on-dark-muted"><span className="w-2.5 h-2.5 rounded-full" style={{ background: b.color }} />{b.label}</span>
              <span className="text-white tabular-nums">{formatNumber(b.t, b.t < 10 ? 1 : 0)} t</span>
            </li>
          ))}
        </ul>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-[20px] bg-white/5 border border-white/10 p-4">
            <div className="text-[12.5px] text-on-dark-muted">Suggested trees</div>
            <div className="font-display text-3xl font-semibold text-lime tabular-nums">{formatNumber(trees)}</div>
            <div className="text-[12px] text-on-dark-muted">to balance one year over 20 yrs of growth</div>
          </div>
          <div className="rounded-[20px] bg-white/5 border border-white/10 p-4">
            <div className="text-[12.5px] text-on-dark-muted">Contribution</div>
            <div className="font-display text-3xl font-semibold text-lime tabular-nums">{formatNaira(cost)}</div>
            <div className="text-[12px] text-on-dark-muted">at {formatNaira(siteConfig.trees.pricePerTree)} / tree</div>
          </div>
        </div>
        <div className="mt-5 rounded-[20px] border border-[color:var(--lime)]/30 p-4 text-[14px]">
          Suggested package: <strong className="text-lime">{suggested.name}</strong> ({suggested.price}) — plus a reduction roadmap for your generator and fleet emissions.
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="#enquire" className="btn btn-lime">Get a tailored proposal <ArrowRight className="w-4 h-4" /></Link>
          <Link href={`/plant?trees=${Math.min(trees, 100000)}`} className="btn btn-ghost-light">Plant now</Link>
        </div>
        <p className="mt-5 flex gap-2 text-[12px] text-on-dark-muted">
          <Info className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          Indicative only — not a GHG Protocol inventory. Trees are a contribution beyond your value chain, not a substitute for reducing emissions.
        </p>
      </div>
    </div>
  );
}
