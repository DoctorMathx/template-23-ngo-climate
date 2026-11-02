import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { programmes } from "@/mock/programmes";
import { IMG } from "@/mock/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Great Green Wall reforestation, Niger Delta mangroves, clean cookstoves, climate-smart farming and Plastic-Free Lagos.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero eyebrow="Programmes" title={<>Five ways we <span className="text-lime">regrow Nigeria.</span></>} lede="Each programme tackles a root cause of land degradation — and pays the communities who do the work." image={IMG.workerPlanting} compact />
      <Section tone="mist" topo="a">
        <div className="space-y-8">
          {programmes.map((p, i) => (
            <article key={p.slug} className="card overflow-hidden grid lg:grid-cols-2">
              <div className={cn("relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]", i % 2 === 1 && "lg:order-2")}>
                <Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 620px, 100vw" className="object-cover" />
                <span className="absolute top-5 left-5 glass !rounded-full px-3.5 py-1.5 font-display font-semibold text-sm">0{i + 1}</span>
              </div>
              <div className="p-7 md:p-10 flex flex-col">
                <div className="flex items-center gap-2 text-moss"><Icon name={p.icon} className="w-6 h-6" /><span className="text-[13px] font-semibold">{p.regions.join(" · ")}</span></div>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">{p.name}</h2>
                <p className="mt-3 text-[16px] text-ink-2">{p.summary}</p>
                <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4 border-y border-line py-5">
                  {p.outcomes.map((o) => (
                    <div key={o.label} className="min-w-0"><div className="font-display text-xl sm:text-2xl font-semibold">{o.value}</div><div className="text-[12.5px] text-muted">{o.label}</div></div>
                  ))}
                </div>
                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                  <Link href={`/programmes/${p.slug}`} className="btn btn-forest">Explore programme <ArrowRight className="w-4 h-4" /></Link>
                  <Link href={`/donate?programme=${p.slug}&amount=${p.suggestedAmount}`} className="btn btn-outline">Fund this</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
