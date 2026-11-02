import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { events, expeditions } from "@/mock/events";
import { IMG } from "@/mock/images";
import { formatDate, formatNaira } from "@/lib/utils";
import { Registration } from "./registration";

export const metadata: Metadata = {
  title: "Events & planting expeditions",
  description: "Join volunteer planting expeditions to the Sahel and Niger Delta, Lagos planting days, beach clean-ups, talks and our annual Canopy Gala.",
};

export default function EventsPage() {
  const others = events.filter((e) => e.kind !== "Planting expedition");
  return (
    <>
      <PageHero eyebrow="Events & expeditions" title={<>Leave the city. <span className="text-lime">Plant a forest.</span></>} lede="Volunteer planting expeditions, Lagos clean-ups, talks and fundraisers. Bring friends, family or your whole team." image={IMG.savannaSunset} compact />

      <Section tone="mist" topo="a">
        <SectionHeader eyebrow="Volunteer planting expeditions" title="Expeditions" lede="Choose a date and group size below — every expedition includes training, kit, meals and a planting certificate." />
        <div className="space-y-6">
          {expeditions.map((e) => (
            <article key={e.slug} id={e.slug} className="card overflow-hidden grid md:grid-cols-[1fr_1.3fr] scroll-mt-28">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                <Image src={e.image} alt={e.title} fill sizes="(min-width:768px) 500px, 100vw" className="object-cover" />
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex flex-wrap gap-2">
                  <span className="tag">{e.kind}</span>
                  <span className="tag tag-earth">{e.spotsLeft} spots left</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold">{e.title}</h3>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-muted">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" strokeWidth={1.5} />{e.location}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" strokeWidth={1.5} />Groups up to {e.maxGroup}</span>
                </div>
                <p className="mt-3 text-[15px] text-ink-2">{e.summary}</p>
                {e.includes && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {e.includes.map((x) => <li key={x} className="tag tag-outline">{x}</li>)}
                  </ul>
                )}
                <div className="mt-5 flex flex-wrap gap-2 text-[13px]">
                  {e.dates?.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--mist)] px-3 py-1.5 font-medium"><CalendarDays className="w-3.5 h-3.5 text-moss" strokeWidth={1.5} />{formatDate(d, { day: "numeric", month: "short", year: "numeric" })}</span>
                  ))}
                </div>
                <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                  <div><span className="font-display text-2xl font-semibold">{formatNaira(e.price)}</span> <span className="text-muted text-[13.5px]">/ person</span></div>
                  <Link href={`/events?event=${e.slug}#register`} className="btn btn-forest">Register</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader eyebrow="More events" title="Clean-ups, talks & fundraisers" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {others.map((e) => (
            <article key={e.slug} id={e.slug} className="card overflow-hidden flex flex-col scroll-mt-28">
              <div className="relative aspect-[16/10]">
                <Image src={e.image} alt={e.title} fill sizes="(min-width:1024px) 300px, 100vw" className="object-cover" />
                <span className="absolute top-3 left-3 glass !rounded-2xl px-3 py-2 text-center leading-none">
                  <span className="block font-display text-xl font-semibold">{formatDate(e.date, { day: "numeric" })}</span>
                  <span className="block text-[11px] uppercase tracking-wider mt-1">{formatDate(e.date, { month: "short" })}</span>
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[12.5px] font-semibold text-moss">{e.kind}</span>
                <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{e.title}</h3>
                <p className="mt-1 text-[13px] text-muted flex items-center gap-1"><MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />{e.location}</p>
                <p className="mt-2 text-[14px] text-ink-2 line-clamp-3">{e.summary}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="font-semibold text-[14px]">{e.price ? formatNaira(e.price) : "Free"}</span>
                  <Link href={`/events?event=${e.slug}#register`} className="btn btn-outline btn-sm">Register</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="forest" id="register" topo="b">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <SectionHeader dark eyebrow="Registration" title="Save your spot" lede="Pick an event, a date and your group size. We’ll email joining instructions, a kit list and payment details within 24 hours." />
          <div className="card p-6 md:p-8 text-[color:var(--forest)]">
            <Suspense fallback={<p className="text-muted">Loading form…</p>}>
              <Registration />
            </Suspense>
          </div>
        </div>
      </Section>
    </>
  );
}
