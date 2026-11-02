import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Leaf, Minus, Sprout, TreePine } from "lucide-react";

const TIER_ICONS = [Sprout, Leaf, TreePine];
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { canopyTiers } from "@/mock/membership";
import { IMG } from "@/mock/images";
import { cn, formatNaira, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Canopy Club — monthly membership",
  description: "Join the Canopy Club: Seedling, Sapling or Forest monthly membership. Plant geotagged trees every month and follow your grove grow.",
};

const COMPARE: { label: string; values: (string | boolean)[] }[] = [
  { label: "Trees planted per year", values: canopyTiers.map((t) => formatNumber(t.treesPerYear)) },
  { label: "Geotagged grove map", values: [false, true, true] },
  { label: "Quarterly impact postcard", values: [true, true, true] },
  { label: "Printed annual certificate", values: [false, true, true] },
  { label: "Expedition discount", values: ["—", "10%", "1 free seat"] },
  { label: "Name a grove", values: [false, false, true] },
  { label: "Canopy Gala invitation", values: [false, false, true] },
];

export default function CanopyClubPage() {
  return (
    <>
      <PageHero eyebrow="Canopy Club" title={<>Grow a forest, <span className="text-lime">month by month.</span></>} lede="Monthly members are the roots of everything we do — steady funding that keeps nurseries watered and guards paid through the dry season." image={IMG.forestPath} compact />
      <Section tone="mist" topo="a">
        <div className="grid md:grid-cols-3 gap-6">
          {canopyTiers.map((t, i) => (
            <div key={t.id} className={cn("p-8 flex flex-col relative overflow-hidden", t.featured ? "rounded-[28px] bg-forest on-dark md:-translate-y-3 shadow-[0_40px_80px_-40px_rgba(12,42,30,.7)]" : "card")}>
              <div className="flex items-center justify-between">
                <span className={cn("tag", t.featured && "tag-dark")}>{(() => { const I = TIER_ICONS[i]; return <I className="w-3.5 h-3.5" strokeWidth={1.75} />; })()} {t.name}</span>
                {t.featured && <span className="text-[12px] text-lime font-semibold">Most popular</span>}
              </div>
              <div className={cn("mt-6 font-display text-5xl font-semibold", t.featured && "text-white")}>
                {formatNaira(t.monthly)}<span className={cn("text-lg font-normal", t.featured ? "text-on-dark-muted" : "text-muted")}>/month</span>
              </div>
              <p className={cn("mt-2", t.featured ? "text-on-dark-muted" : "text-ink-2")}>{t.tagline}</p>
              <ul className="mt-6 space-y-3 text-[14.5px] flex-1">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2.5"><Check className={cn("w-5 h-5 shrink-0", t.featured ? "text-lime" : "text-moss")} strokeWidth={1.75} />{p}</li>
                ))}
              </ul>
              <Link href={`/donate?frequency=monthly&amount=${t.monthly}&designation=canopy:${t.id}`} className={cn("btn btn-lg mt-8", t.featured ? "btn-lime" : "btn-forest")}>
                Become a {t.name}
              </Link>
              <Link href={`/donate?frequency=annual&amount=${t.monthly * 11}&designation=canopy:${t.id}`} className={cn("mt-3 text-center text-[13.5px] underline underline-offset-4 min-h-[44px] leading-[44px]", t.featured ? "text-on-dark-muted hover:text-white" : "text-muted hover:text-[color:var(--forest)]")}>
                Pay annually — {formatNaira(t.monthly * 11)} (1 month free)
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader eyebrow="Compare" title="What each tier includes" />
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full min-w-[620px] text-[14.5px]">
            <caption className="sr-only">Canopy Club tier comparison</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="text-left py-4 font-medium text-muted">Benefit</th>
                {canopyTiers.map((t) => <th key={t.id} scope="col" className="py-4 font-display text-lg">{t.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.label} className="border-b border-line">
                  <th scope="row" className="text-left py-4 font-medium">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td key={i} className="text-center py-4">
                      {v === true ? <Check className="w-5 h-5 text-moss mx-auto" aria-label="Included" /> : v === false ? <Minus className="w-5 h-5 text-[color:var(--line)] mx-auto" aria-label="Not included" /> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="forest" topo="b">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader dark eyebrow="Member voices" title="“I check my grove map more than Instagram.”" lede="— Ifeoluwa A., Sapling member since 2023, Ibadan" />
            <div className="-mt-4 grid grid-cols-3 gap-3 sm:gap-4">
              {[{ v: "4,800", l: "members" }, { v: "312k", l: "member trees" }, { v: "94%", l: "renew each year" }].map((s) => (
                <div key={s.l} className="min-w-0"><div className="font-display text-2xl sm:text-3xl font-semibold text-lime">{s.v}</div><div className="text-[13px] text-on-dark-muted">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden">
            <Image src={IMG.handsPlant} alt="Hands holding a young plant over soil" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section tone="mist" pad="md">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <SectionHeader eyebrow="Questions" title="Membership FAQs" />
          <FaqAccordion items={[
            { q: "Can I pause or cancel?", a: "Yes, any time — email or WhatsApp us with your donor reference. No penalties, no questions." },
            { q: "Where are member trees planted?", a: "Member trees go to the site with the greatest need each planting season. Sapling and Forest members can choose a preferred site." },
            { q: "Can I gift a membership?", a: "Yes. Choose the tier, tick ‘dedicate this gift’ on the donate page and add the recipient’s name — we’ll send them a welcome pack." },
            { q: "Can companies join?", a: "Companies should look at our business partnership packages, which include co-branded reporting and employee planting days." },
          ]} />
        </div>
      </Section>
    </>
  );
}
