import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import type { Campaign, Programme, ProjectSite, Story } from "@/lib/types";
import { daysLeft, formatDate, formatNumber } from "@/lib/utils";
import { FundingProgress } from "./progress";
import { Icon } from "./icon";

export function CampaignCard({ c }: { c: Campaign }) {
  return (
    <article className="card card-hover overflow-hidden flex flex-col">
      <Link href={`/campaigns/${c.slug}`} className="relative block aspect-[16/10]">
        <Image src={c.image} alt={c.title} fill sizes="(min-width:1024px) 400px, 100vw" className="object-cover" />
        <span className="absolute top-4 left-4 tag tag-dark !bg-[color:var(--forest)]/80 backdrop-blur">{c.kicker}</span>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-semibold leading-tight">
          <Link href={`/campaigns/${c.slug}`} className="hover:text-[color:var(--moss)]">{c.title}</Link>
        </h3>
        <p className="mt-2 text-[15px] text-ink-2 line-clamp-2">{c.summary}</p>
        <div className="mt-auto pt-6">
          <FundingProgress raised={c.raised} goal={c.goal} donors={c.donors} days={daysLeft(c.deadline)} />
          <div className="mt-5 flex gap-2">
            <Link href={`/donate?campaign=${c.slug}&amount=${c.suggested[1]}`} className="btn btn-forest btn-sm flex-1">Donate</Link>
            <Link href={`/campaigns/${c.slug}`} className="btn btn-outline btn-sm">Details</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function StoryCard({ s, dark }: { s: Story; dark?: boolean }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/stories/${s.slug}`} className="relative block aspect-[4/3] rounded-[28px] overflow-hidden">
        <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 380px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute top-4 left-4 tag !bg-white/90">{s.category}</span>
      </Link>
      <div className="pt-5">
        <div className={`text-[13px] flex items-center gap-3 ${dark ? "text-on-dark-muted" : "text-muted"}`}>
          <span>{formatDate(s.date)}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" strokeWidth={1.5} />{s.readMins} min</span>
        </div>
        <h3 className={`mt-2 font-display text-xl font-semibold leading-snug ${dark ? "text-white" : ""}`}>
          <Link href={`/stories/${s.slug}`} className="hover:underline underline-offset-4 decoration-2">{s.title}</Link>
        </h3>
        <p className={`mt-2 text-[15px] line-clamp-2 ${dark ? "text-on-dark-muted" : "text-ink-2"}`}>{s.excerpt}</p>
      </div>
    </article>
  );
}

export function ProjectCard({ p }: { p: ProjectSite }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group relative block aspect-[4/5] rounded-[28px] overflow-hidden">
      <Image src={p.image} alt={`${p.name}, ${p.state}`} fill sizes="(min-width:1024px) 300px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 img-shade" />
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        <span className="tag tag-dark !bg-[color:var(--forest)]/70 backdrop-blur">{p.type}</span>
        <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white group-hover:bg-[color:var(--lime)] group-hover:text-[color:var(--forest)] transition-colors">
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
        </span>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-4">
        <div className="glass p-4">
          <div className="text-[12px] flex items-center gap-1 text-white/80"><MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />{p.state} · {p.region}</div>
          <div className="font-display text-lg font-semibold mt-1">{p.name}</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[12px] text-white/80">
            <div><div className="font-display text-base text-lime font-semibold">{formatNumber(p.treesPlanted / 1000)}k</div>trees</div>
            <div><div className="font-display text-base text-lime font-semibold">{p.survivalRate}%</div>survival</div>
            <div><div className="font-display text-base text-lime font-semibold">{formatNumber(p.hectares)}</div>hectares</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProgrammeCard({ p, index }: { p: Programme; index: number }) {
  return (
    <Link href={`/programmes/${p.slug}`} className="group card card-hover overflow-hidden flex flex-col">
      <div className="relative aspect-[16/11]">
        <Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 380px, 100vw" className="object-cover" />
        <span className="absolute top-4 left-4 font-display text-sm font-semibold text-white glass !rounded-full px-3 py-1">0{index + 1}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-moss">
          <Icon name={p.icon} />
          <span className="text-[13px] font-semibold">{p.regions.join(" · ")}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-tight">{p.name}</h3>
        <p className="mt-2 text-[15px] text-ink-2 line-clamp-3">{p.summary}</p>
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-line">
          <span className="text-[13px] font-medium text-earth pt-4">{p.costLine}</span>
          <ArrowUpRight className="w-5 h-5 mt-4 text-moss group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
