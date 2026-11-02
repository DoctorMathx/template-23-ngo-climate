import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getProgramme, programmes } from "@/mock/programmes";
import { projects } from "@/mock/projects";
import { campaigns } from "@/mock/campaigns";
import { Section, SectionHeader } from "@/components/ui/section";
import { CampaignCard, ProjectCard } from "@/components/ui/cards";
import { Icon } from "@/components/ui/icon";
import { formatNaira } from "@/lib/utils";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) return { title: "Programme not found" };
  return { title: p.name, description: p.summary, openGraph: { images: [p.image] } };
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();
  const sites = projects.filter((x) => x.programme === p.slug);
  const camps = campaigns.filter((c) => c.programme === p.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-forest on-dark min-h-[520px] flex items-end">
        <Image src={p.image} alt={p.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 img-shade" />
        <div className="container-x relative pb-14 pt-32 w-full">
          <Link href="/programmes" className="text-[13.5px] text-white/80 hover:text-white">← All programmes</Link>
          <div className="mt-4 flex items-center gap-2 text-lime"><Icon name={p.icon} className="w-6 h-6" /><span className="text-[13.5px] font-semibold">{p.regions.join(" · ")}</span></div>
          <h1 className="mt-3 font-display text-white text-[2.6rem] md:text-7xl font-semibold leading-[1] max-w-4xl">{p.name}</h1>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-3xl">
            {p.outcomes.map((o) => (
              <div key={o.label} className="glass min-w-0 p-3 sm:p-4"><div className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-lime">{o.value}</div><div className="text-[12.5px] text-white/75">{o.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          <div>
            <div className="eyebrow mb-4">The problem</div>
            <p className="font-display text-2xl md:text-3xl leading-snug font-medium">{p.problem}</p>
            <h2 className="mt-14 font-display text-3xl font-semibold">Our approach</h2>
            <ul className="mt-6 space-y-4">
              {p.approach.map((a) => (
                <li key={a} className="flex gap-3 text-[16px] text-ink-2"><CheckCircle2 className="w-6 h-6 text-moss shrink-0" strokeWidth={1.5} />{a}</li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-2">
              {p.sdgs.map((s) => <span key={s} className="tag tag-outline">{s}</span>)}
            </div>
          </div>
          <aside className="lg:sticky lg:top-24 rounded-[28px] bg-forest on-dark p-7">
            <div className="eyebrow">Fund this programme</div>
            <p className="mt-4 font-display text-2xl text-white font-semibold leading-snug">{p.costLine}.</p>
            <div className="mt-6 grid gap-2">
              <Link href={`/donate?programme=${p.slug}&amount=${p.suggestedAmount}`} className="btn btn-lime btn-lg">Give {formatNaira(p.suggestedAmount)}</Link>
              <Link href={`/donate?programme=${p.slug}&amount=${p.suggestedAmount}&frequency=monthly`} className="btn btn-ghost-light">Give monthly</Link>
              <Link href="/plant" className="btn btn-ghost-light">Plant trees instead</Link>
            </div>
          </aside>
        </div>
      </Section>

      {sites.length > 0 && (
        <Section tone="mist">
          <SectionHeader eyebrow="Where it happens" title="Project sites" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{sites.map((s) => <ProjectCard key={s.slug} p={s} />)}</div>
        </Section>
      )}
      {camps.length > 0 && (
        <Section tone="white">
          <SectionHeader eyebrow="Live appeals" title="Campaigns for this programme" />
          <div className="grid md:grid-cols-3 gap-6">{camps.map((c) => <CampaignCard key={c.slug} c={c} />)}</div>
        </Section>
      )}
    </>
  );
}
