import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Satellite, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { ImpactDashboard } from "@/components/ui/impact-dashboard";
import { StoryCard } from "@/components/ui/cards";
import { extraStats, methodology, outcomes, yearlyTrees, impactAsOf } from "@/mock/impact";
import { projects } from "@/mock/projects";
import { stories } from "@/mock/stories";
import { IMG } from "@/mock/images";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Live impact dashboard",
  description: "Trees planted, hectares restored, tonnes of CO₂, mangroves, cookstoves and farmers trained — with progress towards our 2030 goals.",
};

export default function ImpactPage() {
  const max = Math.max(...yearlyTrees.map((y) => y.value));
  const bySurvival = [...projects].sort((a, b) => b.survivalRate - a.survivalRate);
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title={<>Numbers that <span className="text-lime">grow roots.</span></>}
        lede={`Our live dashboard — verified to ${impactAsOf}. Every figure is counted after planting and audited by independent monitors.`}
        image={IMG.mistyForestAerial}
        compact
      />
      <Section tone="forest" topo="a">
        <ImpactDashboard showNotes />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {extraStats.map((s) => (
            <div key={s.label} className="rounded-[22px] border border-dark p-5">
              <div className="font-display text-3xl font-semibold text-lime">{s.value}</div>
              <div className="text-[13.5px] text-on-dark-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader eyebrow="Growth" title="Trees planted per year" lede="Planting accelerated as nursery groups matured and survival improved." />
            <div className="flex items-end gap-3 h-64" role="img" aria-label={`Trees planted per year: ${yearlyTrees.map((y) => `${y.year} ${formatNumber(y.value)}`).join(", ")}`}>
              {yearlyTrees.map((y) => (
                <div key={y.year} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                  <span className="text-[11.5px] font-semibold text-moss tabular-nums">{Math.round(y.value / 1000)}k</span>
                  <div className="w-full rounded-t-[14px] bg-gradient-to-t from-[color:var(--moss)] to-[#7FB069] origin-bottom" style={{ height: `${(y.value / max) * 85}%` }} />
                  <span className="text-[12.5px] text-muted">{y.year}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Survival" title="24-month survival by site" lede="We publish survival for every site — including the hard ones." />
            <ul className="space-y-4">
              {bySurvival.map((p) => (
                <li key={p.slug}>
                  <div className="flex justify-between text-[14.5px] mb-1.5">
                    <Link href={`/projects/${p.slug}`} className="font-medium hover:text-moss">{p.name} <span className="text-muted">· {p.state}</span></Link>
                    <span className="font-display font-semibold">{p.survivalRate}%</span>
                  </div>
                  <div className="bar"><span style={{ width: `${p.survivalRate}%` }} /></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="mist" topo="b">
        <SectionHeader eyebrow="Outcomes" title="Beyond trees: what changes for people" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {outcomes.map((o) => (
            <div key={o.title} className="card p-6">
              <div className="font-display text-2xl font-semibold leading-tight">{o.title}</div>
              <p className="mt-3 text-[14.5px] text-ink-2">{o.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" id="methodology">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[5/4] rounded-[32px] overflow-hidden">
            <Image src={IMG.seedlingPots} alt="Seedlings in pots at a community nursery" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
            <div className="absolute left-5 bottom-5 glass p-4 flex items-center gap-3">
              <Satellite className="w-6 h-6 text-lime" strokeWidth={1.5} />
              <span className="text-[13.5px]">Sentinel-2 canopy monitoring on every site</span>
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Methodology" title="How we count" />
            <ul className="space-y-4 -mt-4">
              {methodology.map((m) => (
                <li key={m} className="flex gap-3 text-[15px] text-ink-2">
                  <ShieldCheck className="w-5 h-5 text-moss shrink-0 mt-0.5" strokeWidth={1.5} />
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/stories/how-we-count-a-tree" className="btn btn-forest">Read: How we count a tree</Link>
              <Link href="/transparency" className="btn btn-outline">Reports & audits</Link>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeader eyebrow="Impact stories" title="Behind the dashboard" action={<Link href="/stories" className="btn btn-outline">All stories <ArrowRight className="w-4 h-4" /></Link>} />
        <div className="grid md:grid-cols-3 gap-8">
          {stories.filter((s) => s.category !== "News").slice(0, 3).map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </Section>
    </>
  );
}
