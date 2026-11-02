import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStory, stories } from "@/mock/stories";
import { Section, SectionHeader } from "@/components/ui/section";
import { StoryCard } from "@/components/ui/cards";
import { Topo } from "@/components/ui/topo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) return { title: "Story not found" };
  return { title: s.title, description: s.excerpt, openGraph: { type: "article", images: [s.image] } };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();
  const more = stories.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden bg-forest on-dark">
        <Topo variant="b" className="text-[color:var(--lime)]" opacity={0.1} />
        <div className="container-x relative pt-14 pb-10 md:pt-20 max-w-4xl">
          <Link href="/stories" className="text-[13.5px] text-on-dark-muted hover:text-white">← All stories</Link>
          <div className="mt-5"><span className="tag tag-dark">{s.category}</span></div>
          <h1 className="mt-4 font-display text-white text-[2.3rem] md:text-6xl font-semibold leading-[1.04]">{s.title}</h1>
          <p className="mt-5 text-on-dark-muted">By {s.author} · {formatDate(s.date, { day: "numeric", month: "long", year: "numeric" })} · {s.readMins} min read</p>
        </div>
      </section>
      <div className="bg-forest">
        <div className="container-x max-w-5xl">
          <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden translate-y-10 md:translate-y-16">
            <Image src={s.image} alt={s.title} fill priority sizes="(min-width:1024px) 1000px, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
      <article className="bg-white pt-20 md:pt-28 pb-16">
        <div className="container-x max-w-3xl">
          <p className="font-display text-2xl leading-snug font-medium">{s.excerpt}</p>
          <div className="mt-8 space-y-6 text-[17.5px] leading-[1.75] text-ink-2">
            {s.body.map((p, i) => (
              <div key={i}>
                <p>{p}</p>
                {i === 1 && s.quote && (
                  <blockquote className="my-10 border-l-4 border-[color:var(--moss)] pl-6">
                    <p className="font-display text-2xl md:text-3xl leading-snug text-[color:var(--forest)] font-semibold">“{s.quote.text}”</p>
                    <footer className="mt-3 text-[14px] text-muted">— {s.quote.by}</footer>
                  </blockquote>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-[28px] bg-forest on-dark p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div><div className="font-display text-xl font-semibold text-white">Inspired? Plant a tree in under a minute.</div><div className="text-on-dark-muted text-[14.5px] mt-1">₦2,500 per tree, geotagged and protected for two years.</div></div>
            <Link href="/plant" className="btn btn-lime shrink-0">Plant trees</Link>
          </div>
        </div>
      </article>
      <Section tone="mist">
        <SectionHeader eyebrow="Keep reading" title="More stories" />
        <div className="grid md:grid-cols-3 gap-8">{more.map((x) => <StoryCard key={x.slug} s={x} />)}</div>
      </Section>
    </>
  );
}
