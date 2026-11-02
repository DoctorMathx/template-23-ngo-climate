import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { board, history, mission, team, values, vision } from "@/mock/team";
import { IMG } from "@/mock/images";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About us",
  description: "Our mission, vision, values, history, team and board. Green Canopy Trust has restored Nigerian land with communities since 2014.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>Started on a beach. <span className="text-lime">Growing to the Sahara.</span></>} lede={`Founded in Lagos in ${siteConfig.org.founded}, ${siteConfig.brand.name} is a Nigerian climate and conservation charity restoring land, forests and coastlines with the people who depend on them.`} image={IMG.handsOnTrunk} />

      <Section tone="white">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-[28px] bg-forest on-dark p-8 md:p-10">
            <div className="eyebrow">Mission</div>
            <p className="mt-4 font-display text-2xl md:text-3xl text-white font-semibold leading-snug">{mission}</p>
          </div>
          <div className="rounded-[28px] bg-mist-2 p-8 md:p-10">
            <div className="eyebrow">Vision</div>
            <p className="mt-4 font-display text-2xl md:text-3xl font-semibold leading-snug">{vision}</p>
          </div>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <div key={v.title} className="card p-6">
              <div className="font-display text-sm font-semibold text-moss">0{i + 1}</div>
              <div className="mt-3 font-display text-xl font-semibold">{v.title}</div>
              <p className="mt-2 text-[14.5px] text-ink-2">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="forest" topo="a">
        <SectionHeader dark eyebrow="Our history" title="Twelve years of growth rings" />
        <ol className="grid md:grid-cols-3 lg:grid-cols-6 gap-px bg-[color:var(--forest-3)] rounded-[28px] overflow-hidden border border-dark">
          {history.map((h) => (
            <li key={h.year} className="bg-forest p-6">
              <div className="font-display text-4xl font-semibold text-lime">{h.year}</div>
              <div className="mt-4 font-display font-semibold text-white">{h.title}</div>
              <p className="mt-2 text-[14px] text-on-dark-muted">{h.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="mist">
        <SectionHeader eyebrow="Team" title="The people on the ground" lede="62 staff, 70% based at project sites — plus 1,340 community nursery workers, guardians and monitors." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((t) => (
            <div key={t.name} className="card p-6 flex gap-4">
              <div className="w-16 h-16 rounded-full bg-forest text-lime font-display font-semibold flex items-center justify-center text-xl shrink-0">{t.initials}</div>
              <div>
                <div className="font-display text-lg font-semibold">{t.name}</div>
                <div className="text-[13px] text-moss font-medium">{t.role}</div>
                <p className="mt-2 text-[14px] text-ink-2">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          <div>
            <SectionHeader eyebrow="Board of trustees" title="Governance" lede={`${siteConfig.org.legalName} · Registered not-for-profit, audited annually`} />
            <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden -mt-4">
              <Image src={IMG.meeting} alt="Hands around a meeting table" fill sizes="(min-width:1024px) 500px, 100vw" className="object-cover" />
            </div>
          </div>
          <ul className="divide-y divide-[color:var(--line)] border-y border-line">
            {board.map((b) => (
              <li key={b.name} className="py-5 flex gap-4">
                <span className="w-12 h-12 rounded-full bg-[color:var(--mist-2)] text-moss font-display font-semibold flex items-center justify-center shrink-0">{b.initials}</span>
                <div>
                  <div className="font-display font-semibold text-lg">{b.name}</div>
                  <div className="text-[13px] text-moss font-medium">{b.role}</div>
                  <p className="text-[14px] text-ink-2 mt-1">{b.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/transparency" className="btn btn-forest">Financials & reports</Link>
          <Link href="/contact" className="btn btn-outline">Contact us</Link>
        </div>
      </Section>
    </>
  );
}
