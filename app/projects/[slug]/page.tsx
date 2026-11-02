import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Handshake, MapPin, Sprout } from "lucide-react";
import { getProject, projects } from "@/mock/projects";
import { getProgramme } from "@/mock/programmes";
import { campaigns } from "@/mock/campaigns";
import { Section, SectionHeader } from "@/components/ui/section";
import { NigeriaMap } from "@/components/ui/nigeria-map";
import { FundingProgress, ProgressBar } from "@/components/ui/progress";
import { ProjectCard } from "@/components/ui/cards";
import { Topo } from "@/components/ui/topo";
import { formatNumber, percent } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Site not found" };
  return { title: `${p.name}, ${p.state}`, description: p.summary, openGraph: { images: [p.image] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const programme = getProgramme(p.programme);
  const campaign = campaigns.find((c) => c.site === p.slug);
  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-forest on-dark min-h-[560px] flex items-end">
        <Image src={p.image} alt={`${p.name}, ${p.state}`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 img-shade" />
        <div className="container-x relative pb-12 pt-32 w-full">
          <Link href="/projects" className="text-[13.5px] text-white/80 hover:text-white">← All project sites</Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="tag tag-dark">{p.type}</span>
            <span className="tag tag-dark"><MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />{p.state} · {p.region}</span>
          </div>
          <h1 className="mt-4 font-display text-white text-[2.6rem] md:text-7xl font-semibold leading-[1]">{p.name}</h1>
          <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl">{p.summary}</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {[
              { v: formatNumber(p.treesPlanted), l: "trees planted" },
              { v: `${p.survivalRate}%`, l: "24-month survival" },
              { v: `${formatNumber(p.hectares)} ha`, l: "restored" },
              { v: String(p.started), l: "since" },
            ].map((s) => (
              <div key={s.l} className="glass p-4">
                <div className="font-display text-2xl md:text-3xl font-semibold text-lime">{s.v}</div>
                <div className="text-[12.5px] text-white/75">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          <div>
            <div className="eyebrow mb-4">The story</div>
            <div className="space-y-5 text-[17px] leading-relaxed text-ink-2">
              {p.story.map((para, i) => <p key={i}>{para}</p>)}
            </div>

            <h2 className="mt-14 font-display text-3xl font-semibold">Species planted</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {p.species.map((s) => (
                <div key={s.name} className="rounded-[22px] bg-mist p-5 border border-line">
                  <div className="flex items-center gap-2 text-moss"><Sprout className="w-5 h-5" strokeWidth={1.5} /><span className="text-[13px] font-semibold">{s.local}</span></div>
                  <div className="mt-2 font-display text-lg font-semibold italic">{s.name}</div>
                  <div className="text-[14px] text-ink-2 mt-1">{s.role}</div>
                </div>
              ))}
            </div>

            <h2 className="mt-14 font-display text-3xl font-semibold">From the field</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {p.gallery.map((g, i) => (
                <div key={g} className={`relative rounded-[22px] overflow-hidden ${i === 0 ? "col-span-2 aspect-[16/8]" : "aspect-[4/3]"}`}>
                  <Image src={g} alt={`${p.name} — field photo ${i + 1}`} fill sizes="(min-width:1024px) 700px, 100vw" className="object-cover" />
                </div>
              ))}
            </div>

            <h2 className="mt-14 font-display text-3xl font-semibold">Local partners</h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {p.partners.map((x) => (
                <li key={x} className="flex items-center gap-3 rounded-[18px] border border-line p-4 text-[14.5px] font-medium">
                  <Handshake className="w-5 h-5 text-moss shrink-0" strokeWidth={1.5} />{x}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 space-y-5">
            <div className="rounded-[28px] bg-forest on-dark p-6 md:p-7 relative overflow-hidden">
              <Topo variant="b" className="text-[color:var(--lime)]" opacity={0.08} />
              <div className="relative">
                <div className="eyebrow">Funding progress</div>
                <div className="mt-4"><FundingProgress raised={p.raised} goal={p.goal} dark /></div>
                <div className="mt-6">
                  <div className="flex justify-between text-[13px] text-on-dark-muted mb-2">
                    <span>Tree target</span>
                    <span className="text-white">{formatNumber(p.treesPlanted)} / {formatNumber(p.treesTarget)}</span>
                  </div>
                  <ProgressBar value={p.treesPlanted} max={p.treesTarget} dark label={`${percent(p.treesPlanted, p.treesTarget)}% of tree target`} />
                </div>
                <div className="mt-5 flex items-center gap-2 text-[13.5px] text-on-dark-muted"><CalendarDays className="w-4 h-4 text-lime" strokeWidth={1.5} /> Planting season: {p.plantingSeason}</div>
                <div className="mt-6 grid gap-2">
                  <Link href={`/plant?site=${p.slug}&trees=50`} className="btn btn-lime">Plant trees here</Link>
                  <Link href={`/donate?designation=site:${p.slug}&amount=25000`} className="btn btn-ghost-light">Donate to this site</Link>
                </div>
              </div>
            </div>
            <div className="card-dark p-4">
              <NigeriaMap active={p.slug} showLabels={false} />
            </div>
            {programme && (
              <Link href={`/programmes/${programme.slug}`} className="card card-hover p-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[12.5px] text-muted">Part of</div>
                  <div className="font-display font-semibold">{programme.name}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-moss" />
              </Link>
            )}
            {campaign && (
              <Link href={`/campaigns/${campaign.slug}`} className="card card-hover p-5 block">
                <div className="text-[12.5px] text-muted">Live campaign</div>
                <div className="font-display font-semibold">{campaign.title}</div>
                <div className="mt-3"><ProgressBar value={campaign.raised} max={campaign.goal} /></div>
              </Link>
            )}
          </aside>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeader eyebrow="More sites" title="Explore other landscapes" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {others.map((x) => <ProjectCard key={x.slug} p={x} />)}
        </div>
      </Section>
    </>
  );
}
