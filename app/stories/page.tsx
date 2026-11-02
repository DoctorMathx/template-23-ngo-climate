import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { StoryCard } from "@/components/ui/cards";
import { stories } from "@/mock/stories";
import { IMG } from "@/mock/images";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Stories & news",
  description: "Field notes, science, news and community voices from Green Canopy Trust’s restoration sites across Nigeria.",
};

export default function StoriesPage() {
  const [lead, ...rest] = [...stories].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero eyebrow="Stories & news" title={<>Field notes from a <span className="text-lime">greening Nigeria.</span></>} image={IMG.mistyForest} compact />
      <Section tone="mist">
        <Link href={`/stories/${lead.slug}`} className="group grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center mb-16">
          <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden">
            <Image src={lead.image} alt={lead.title} fill sizes="(min-width:1024px) 700px, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div>
            <span className="tag">{lead.category}</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold leading-[1.05] group-hover:underline underline-offset-8 decoration-2">{lead.title}</h2>
            <p className="lede mt-4">{lead.excerpt}</p>
            <p className="mt-4 text-[13.5px] text-muted">{lead.author} · {formatDate(lead.date)} · {lead.readMins} min read</p>
          </div>
        </Link>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {rest.map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </Section>
    </>
  );
}
