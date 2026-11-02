import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Building2, CalendarDays, Check, MapPin, Users } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { CampaignCard, ProgrammeCard, StoryCard } from "@/components/ui/cards";
import { NigeriaMap, MapLegend } from "@/components/ui/nigeria-map";
import { programmes } from "@/mock/programmes";
import { projects } from "@/mock/projects";
import { campaigns } from "@/mock/campaigns";
import { canopyTiers } from "@/mock/membership";
import { stories } from "@/mock/stories";
import { expeditions } from "@/mock/events";
import { perThousand } from "@/mock/financials";
import { IMG } from "@/mock/images";
import { formatDate, formatNaira, formatNumber } from "@/lib/utils";
import { Topo } from "@/components/ui/topo";

export function ProgrammesModule() {
  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="What we do"
        title="Five programmes. One living shield."
        lede="From the edge of the Sahara to the creeks of the Delta, we restore ecosystems in ways that pay communities to protect them."
        action={<Link href="/programmes" className="btn btn-outline">All programmes</Link>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programmes.map((p, i) => (
          <ProgrammeCard key={p.slug} p={p} index={i} />
        ))}
        <Link href="/get-involved" className="rounded-[28px] bg-forest on-dark p-8 flex flex-col justify-between relative overflow-hidden min-h-[320px]">
          <Topo variant="b" className="text-[color:var(--lime)]" opacity={0.12} />
          <div className="relative">
            <div className="eyebrow">Get involved</div>
            <p className="mt-4 font-display text-2xl text-white font-semibold leading-tight">Volunteer, fundraise or bring your school or company along.</p>
          </div>
          <span className="relative btn btn-lime self-start">Find your role <ArrowRight className="w-4 h-4" /></span>
        </Link>
      </div>
    </Section>
  );
}

export function ProjectMapModule() {
  return (
    <Section tone="forest" topo="a">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div className="card-dark p-4 md:p-8 relative">
          <NigeriaMap />
          <MapLegend className="mt-4 px-2" />
        </div>
        <div>
          <SectionHeader dark eyebrow="Project sites" title="Eight sites. Every tree on the map." lede="Hover a pin to explore. Each site page shows species planted, survival rates, local partners and funding progress." />
          <ul className="divide-y divide-[color:var(--forest-3)] border-y border-dark -mt-4">
            {projects.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="flex items-center justify-between gap-4 py-3.5 min-h-[56px] group">
                  <div>
                    <div className="font-display font-semibold text-white group-hover:text-lime transition-colors">{p.name}</div>
                    <div className="text-[13px] text-on-dark-muted flex items-center gap-1"><MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />{p.state} · {p.type}</div>
                  </div>
                  <div className="text-right text-[13px] text-on-dark-muted">
                    <div className="font-display text-lg text-white">{formatNumber(p.treesPlanted)}</div>trees
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/projects" className="btn btn-lime mt-8">Explore all sites <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </Section>
  );
}

export function CampaignsModule() {
  return (
    <Section tone="mist">
      <SectionHeader
        eyebrow="Live appeals"
        title="Campaigns that need you now"
        action={<Link href="/campaigns" className="btn btn-outline">All campaigns</Link>}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.slice(0, 3).map((c) => (
          <CampaignCard key={c.slug} c={c} />
        ))}
      </div>
    </Section>
  );
}

export function CanopyClubModule() {
  return (
    <Section tone="white" topo="b">
      <SectionHeader
        align="center"
        eyebrow="Canopy Club"
        title="Grow a forest, month by month."
        lede="Join 4,800 members whose monthly gifts plant geotagged trees all year round — and fund the guards who keep them alive."
      />
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {canopyTiers.map((t) => (
          <div key={t.id} className={t.featured ? "rounded-[28px] bg-forest on-dark p-7 relative overflow-hidden" : "card p-7"}>
            {t.featured && <span className="absolute top-6 right-6 tag tag-dark">Most popular</span>}
            <div className={t.featured ? "text-lime font-display font-semibold" : "text-moss font-display font-semibold"}>{t.name}</div>
            <div className={`mt-3 font-display text-4xl font-semibold ${t.featured ? "text-white" : ""}`}>
              {formatNaira(t.monthly)}<span className={`text-base font-normal ${t.featured ? "text-on-dark-muted" : "text-muted"}`}>/mo</span>
            </div>
            <p className={`mt-2 text-[14.5px] ${t.featured ? "text-on-dark-muted" : "text-ink-2"}`}>{t.tagline} · {t.treesPerYear} trees/yr</p>
            <Link href={`/donate?frequency=monthly&amount=${t.monthly}&designation=canopy-${t.id}`} className={`btn w-full mt-6 ${t.featured ? "btn-lime" : "btn-forest"}`}>
              Join as {t.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/canopy-club" className="inline-flex items-center gap-1.5 font-semibold text-moss hover:underline underline-offset-4 min-h-[44px]">Compare all membership perks <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </Section>
  );
}

export function BusinessModule() {
  return (
    <section className="relative overflow-hidden bg-forest on-dark">
      <Image src={IMG.canopyFromBelow} alt="" fill sizes="100vw" className="object-cover opacity-50" />
      <div className="absolute inset-0 img-shade-side" />
      <div className="container-x relative py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="eyebrow mb-4">For business</div>
          <h2 className="font-display text-[2.2rem] md:text-5xl font-semibold leading-[1.04] text-white">Climate action your staff, customers and auditors can see.</h2>
          <p className="lede mt-5 max-w-lg">Estimate your footprint in two minutes, then fund verified restoration with co-branded reporting and employee planting days.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/business#estimator" className="btn btn-lime btn-lg">Estimate your footprint</Link>
            <Link href="/business#packages" className="btn btn-ghost-light btn-lg">Partnership packages</Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: BarChart3, t: "Carbon estimator", d: "Staff, office, generator & fleet → tCO₂ and suggested trees." },
            { icon: Building2, t: "Co-branded reports", d: "ESG-ready data, GPS pins and photos for your annual report." },
            { icon: Users, t: "Employee planting days", d: "Lagos half-days to Sahel expeditions, fully managed." },
            { icon: Check, t: "Honest claims", d: "We help you avoid greenwashing — contribution, not ‘net zero’." },
          ].map((f) => (
            <div key={f.t} className="glass p-5">
              <f.icon className="w-6 h-6 text-lime" strokeWidth={1.5} />
              <div className="mt-4 font-display font-semibold">{f.t}</div>
              <p className="mt-1 text-[13.5px] text-white/75">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoriesModule() {
  return (
    <Section tone="mist">
      <SectionHeader eyebrow="Stories from the field" title="The people behind the numbers" action={<Link href="/stories" className="btn btn-outline">All stories</Link>} />
      <div className="grid md:grid-cols-3 gap-8">
        {stories.slice(0, 3).map((s) => (
          <StoryCard key={s.slug} s={s} />
        ))}
      </div>
    </Section>
  );
}

export function ExpeditionsModule() {
  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="Volunteer expeditions"
        title="Get your hands in the soil"
        lede="Join a planting day in Lagos or a multi-day expedition to the Sahel or the Delta. Bring friends, family or your whole team."
        action={<Link href="/events" className="btn btn-outline">All events</Link>}
      />
      <div className="grid md:grid-cols-3 gap-6">
        {expeditions.map((e) => (
          <Link key={e.slug} href={`/events#${e.slug}`} className="group card card-hover overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image src={e.image} alt={e.title} fill sizes="(min-width:1024px) 400px, 100vw" className="object-cover" />
              <span className="absolute top-4 left-4 glass !rounded-full px-3 py-1.5 text-[12.5px] font-semibold flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.5} /> Next: {formatDate(e.date, { day: "numeric", month: "short" })}
              </span>
            </div>
            <div className="p-6">
              <div className="text-[13px] text-muted flex items-center gap-1"><MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />{e.location}</div>
              <h3 className="mt-1.5 font-display text-xl font-semibold">{e.title}</h3>
              <div className="mt-4 flex items-center justify-between text-[14px]">
                <span className="font-semibold text-moss">{e.price ? `${formatNaira(e.price)} / person` : "Free"}</span>
                <span className="text-muted">{e.spotsLeft} spots left</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function TransparencyModule() {
  return (
    <Section tone="mist-2" topo="a">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
          <div className="eyebrow mb-4">Transparency</div>
          <h2 className="font-display text-[2.2rem] md:text-5xl font-semibold leading-[1.04]">Of every ₦1,000 you give…</h2>
          <p className="lede mt-5 max-w-md">Audited annually by Adeyemi Okafor & Co. Full accounts, methodology and board minutes are public.</p>
          <Link href="/transparency" className="btn btn-forest mt-8">See our financials <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="card p-6 md:p-8 space-y-5">
          {perThousand.map((p) => (
            <div key={p.label}>
              <div className="flex justify-between text-[15px] font-medium mb-2">
                <span>{p.label}</span>
                <span className="font-display font-semibold tabular-nums">₦{p.amount}</span>
              </div>
              <div className="bar"><span style={{ width: `${p.amount / 10}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function FinalCtaModule() {
  return (
    <section className="relative overflow-hidden bg-forest on-dark">
      <Image src={IMG.forestLight} alt="" fill sizes="100vw" className="object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--forest)]/40 to-[color:var(--forest)]" />
      <div className="container-x relative py-24 md:py-32 text-center">
        <h2 className="font-display text-white text-[2.4rem] md:text-6xl font-semibold leading-[1.02] max-w-4xl mx-auto">
          The best time to plant a tree was 20 years ago. <span className="text-lime">The second best is today.</span>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/plant" className="btn btn-lime btn-lg">Plant trees</Link>
          <Link href="/donate" className="btn btn-ghost-light btn-lg">Make a donation</Link>
          <Link href="/get-involved" className="btn btn-ghost-light btn-lg">Volunteer</Link>
        </div>
      </div>
    </section>
  );
}
