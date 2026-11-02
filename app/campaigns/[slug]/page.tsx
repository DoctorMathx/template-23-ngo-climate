import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Heart, MapPin } from "lucide-react";
import { campaigns, getCampaign } from "@/mock/campaigns";
import { getProgramme } from "@/mock/programmes";
import { getProject } from "@/mock/projects";
import { Section, SectionHeader } from "@/components/ui/section";
import { FundingProgress } from "@/components/ui/progress";
import { CampaignCard } from "@/components/ui/cards";
import { daysLeft, formatDate, formatNaira } from "@/lib/utils";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) return { title: "Campaign not found" };
  return { title: c.title, description: c.summary, openGraph: { images: [c.image] } };
}

const BUDGET_COLORS = ["#3E7B4F", "#7FB069", "#0C2A1E", "#A57C52", "#C7B299"];

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) notFound();
  const programme = getProgramme(c.programme);
  const site = c.site ? getProject(c.site) : undefined;
  const budgetTotal = c.budget.reduce((s, b) => s + b.amount, 0);
  const days = daysLeft(c.deadline);

  return (
    <>
      <section className="relative overflow-hidden bg-forest on-dark">
        <Image src={c.image} alt={c.title} fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 img-shade-side" />
        <div className="container-x relative pt-20 pb-16 md:pt-28 md:pb-20 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
          <div>
            <Link href="/campaigns" className="text-[13.5px] text-white/80 hover:text-white">← All campaigns</Link>
            <div className="mt-4"><span className="tag tag-dark">{c.kicker}</span></div>
            <h1 className="mt-4 font-display text-white text-[2.6rem] md:text-7xl font-semibold leading-[1]">{c.title}</h1>
            <p className="mt-5 text-lg md:text-xl text-white/85 max-w-xl">{c.summary}</p>
          </div>
          <div className="glass p-6 md:p-7">
            <FundingProgress raised={c.raised} goal={c.goal} donors={c.donors} days={days} dark />
            <div className="mt-6 grid grid-cols-3 gap-2">
              {c.suggested.map((a) => (
                <Link key={a} href={`/donate?campaign=${c.slug}&amount=${a}`} className="btn btn-ghost-light btn-sm !px-2 min-w-0">{formatNaira(a)}</Link>
              ))}
            </div>
            <Link href={`/donate?campaign=${c.slug}&amount=${c.suggested[1]}`} className="btn btn-lime btn-lg w-full mt-3"><Heart className="w-4 h-4" /> Donate to this campaign</Link>
            <Link href={`/donate?campaign=${c.slug}&amount=${c.suggested[0]}&frequency=monthly`} className="block text-center mt-3 text-[13.5px] text-white/80 underline underline-offset-4 min-h-[44px] leading-[44px]">Give monthly instead</Link>
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          <div>
            <div className="eyebrow mb-4">The story</div>
            <div className="space-y-5 text-[17px] leading-relaxed text-ink-2">
              {c.story.map((p, i) => <p key={i} className={i === 0 ? "text-xl text-[color:var(--forest)] font-medium" : ""}>{p}</p>)}
            </div>

            <h2 className="mt-14 font-display text-3xl font-semibold">How funds are used</h2>
            <div className="mt-6 card p-6">
              <div className="flex h-4 rounded-full overflow-hidden" aria-hidden="true">
                {c.budget.map((b, i) => <span key={b.label} style={{ width: `${(b.amount / budgetTotal) * 100}%`, background: BUDGET_COLORS[i % 5] }} />)}
              </div>
              <ul className="mt-6 space-y-3">
                {c.budget.map((b, i) => (
                  <li key={b.label} className="flex items-center justify-between gap-4 text-[15px]">
                    <span className="flex items-center gap-2.5"><span className="w-3 h-3 rounded-full" style={{ background: BUDGET_COLORS[i % 5] }} />{b.label}</span>
                    <span className="tabular-nums"><span className="font-semibold">{formatNaira(b.amount)}</span> <span className="text-muted">· {Math.round((b.amount / budgetTotal) * 100)}%</span></span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-line flex justify-between font-semibold"><span>Total budget</span><span>{formatNaira(budgetTotal)}</span></div>
            </div>

            <h2 className="mt-14 font-display text-3xl font-semibold">Updates</h2>
            <ol className="mt-6 relative border-l-2 border-[color:var(--line)] ml-2 space-y-8">
              {c.updates.map((u) => (
                <li key={u.date} className="pl-7 relative">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[color:var(--moss)] ring-4 ring-white" />
                  <div className="text-[13px] font-semibold text-moss">{formatDate(u.date, { day: "numeric", month: "long", year: "numeric" })}</div>
                  <div className="mt-1 font-display text-lg font-semibold">{u.title}</div>
                  <p className="mt-1 text-[15px] text-ink-2">{u.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:sticky lg:top-24 space-y-5">
            <div className="card p-6">
              <h2 className="font-display text-xl font-semibold">Recent donors</h2>
              <ul className="mt-4 divide-y divide-[color:var(--line)]">
                {c.recentDonors.map((d, i) => (
                  <li key={i} className="py-3.5 flex gap-3">
                    <span className="w-10 h-10 rounded-full bg-[color:var(--mist-2)] text-moss font-display font-semibold flex items-center justify-center shrink-0 text-[14px]">{d.name === "Anonymous" ? "?" : d.name.charAt(0)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 text-[14.5px]"><span className="font-semibold">{d.name}</span><span className="font-semibold text-moss">{formatNaira(d.amount)}</span></div>
                      <div className="text-[12.5px] text-muted">{d.when}</div>
                      {d.note && <p className="text-[13.5px] text-ink-2 mt-1 italic">“{d.note}”</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {site && (
              <Link href={`/projects/${site.slug}`} className="card card-hover overflow-hidden block">
                <div className="relative aspect-[16/9]"><Image src={site.image} alt={site.name} fill sizes="400px" className="object-cover" /></div>
                <div className="p-5">
                  <div className="text-[12.5px] text-muted flex items-center gap-1"><MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />Project site · {site.state}</div>
                  <div className="font-display font-semibold mt-1 flex items-center justify-between">{site.name}<ArrowRight className="w-4 h-4 text-moss" /></div>
                </div>
              </Link>
            )}
            {programme && (
              <Link href={`/programmes/${programme.slug}`} className="card card-hover p-5 flex items-center justify-between">
                <div><div className="text-[12.5px] text-muted">Programme</div><div className="font-display font-semibold">{programme.name}</div></div>
                <ArrowRight className="w-5 h-5 text-moss" />
              </Link>
            )}
          </aside>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeader eyebrow="Other appeals" title="More ways to help" />
        <div className="grid md:grid-cols-3 gap-6">
          {campaigns.filter((x) => x.slug !== c.slug).map((x) => <CampaignCard key={x.slug} c={x} />)}
        </div>
      </Section>
    </>
  );
}
