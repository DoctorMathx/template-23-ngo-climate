import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { IMG } from "@/mock/images";
import { impactStats, yearlyTrees } from "@/mock/impact";
import { Topo } from "@/components/ui/topo";
import { Odometer } from "@/components/ui/odometer";
import { formatNumber } from "@/lib/utils";

export function Hero() {
  const trees = impactStats.find((s) => s.id === "trees")!;
  const co2 = impactStats.find((s) => s.id === "co2")!;
  const max = Math.max(...yearlyTrees.map((y) => y.value));
  return (
    <section className="relative overflow-hidden bg-forest on-dark min-h-[calc(100svh-110px)] flex items-end">
      <Image src={IMG.aerialForestRiver} alt="Aerial view of dense forest canopy around a river" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--forest)] via-[color:var(--forest)]/55 to-[color:var(--forest)]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--forest)]/85 via-[color:var(--forest)]/30 to-transparent" />
      <Topo variant="a" className="text-[color:var(--lime)] drift" opacity={0.12} />

      <div className="container-x relative w-full pt-24 pb-14 md:pb-20">
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 items-end">
          <div className="fade-up min-w-0">
            <span className="tag tag-dark mb-6"><MapPin className="w-3.5 h-3.5" strokeWidth={1.5} /> Sahel · Niger Delta · Lagos</span>
            <h1 className="font-display text-white font-semibold text-[2.5rem] min-[400px]:text-[2.9rem] leading-[0.98] sm:text-6xl lg:text-[5.4rem] tracking-[-0.035em]">
              Regrow the land.<br />
              <span className="text-lime">Measure</span> every tree.
            </h1>
            <p className="lede mt-7 text-lg md:text-xl max-w-xl">
              {siteConfig.brand.name} restores Nigeria’s drylands, mangroves and coastlines with the communities who live there — and shows you the data behind every naira.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={siteConfig.home.heroCta.href} className="btn btn-lime btn-lg max-w-full whitespace-normal text-center sm:whitespace-nowrap">
                {siteConfig.home.heroCta.label} — ₦{siteConfig.trees.pricePerTree.toLocaleString("en-NG")}/tree <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={siteConfig.home.heroCtaSecondary.href} className="btn btn-ghost-light btn-lg">
                {siteConfig.home.heroCtaSecondary.label}
              </Link>
            </div>
          </div>

          <div className="glass p-5 sm:p-6 md:p-7 fade-up min-w-0" style={{ animationDelay: ".15s" }}>
            <div className="flex items-center justify-between text-[13px] text-white/75">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[color:var(--lime)]" /> Trees in the ground
              </span>
              <span>since 2014</span>
            </div>
            <div className="mt-3 font-display text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-white leading-none tracking-tight">
              <Odometer value={formatNumber(trees.value)} />
            </div>
            <div className="mt-6 flex items-end gap-1.5 h-20" aria-hidden="true">
              {yearlyTrees.map((y, i) => (
                <div key={y.year} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-md bg-[color:var(--lime)] origin-bottom fade-up"
                    style={{ height: `${(y.value / max) * 64}px`, opacity: 0.35 + (i / yearlyTrees.length) * 0.65, animationDelay: `${0.3 + i * 0.08}s` }}
                  />
                  <span className="text-[10px] text-white/60">{y.year.slice(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-white/15 grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <div className="font-display text-2xl font-semibold text-lime">{formatNumber(co2.value / 1000)}k t</div>
                <div className="text-white/70">CO₂ projected over 20 yrs</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-lime">78%</div>
                <div className="text-white/70">verified 24-month survival</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
