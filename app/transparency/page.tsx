import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Donut, Legend } from "@/components/ui/donut";
import { expenses, financialYear, governance, incomeSources, perThousand, reports, totalExpenditure, totalIncome } from "@/mock/financials";
import { board } from "@/mock/team";
import { IMG } from "@/mock/images";
import { compactNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Transparency & financials",
  description: "Where our money comes from and where it goes: income, expenses, annual reports, audits, registration and board of trustees.",
};

export default function TransparencyPage() {
  const programmeShare = expenses.slice(0, 4).reduce((s, e) => s + e.value, 0);
  return (
    <>
      <PageHero eyebrow="Transparency" title={<>Every naira, <span className="text-lime">accounted for.</span></>} lede={`Audited financial year ${financialYear}: ${compactNaira(totalIncome)} raised, ${compactNaira(totalExpenditure)} spent — ${programmeShare}% of it directly on programmes.`} image={IMG.forestLight} compact />

      <Section tone="white">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold">Where our money comes from</h2>
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-8">
              <Donut data={incomeSources} center={compactNaira(totalIncome)} sub={`Income ${financialYear}`} />
              <div className="flex-1 w-full"><Legend data={incomeSources} /></div>
            </div>
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold">Where it goes</h2>
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-8">
              <Donut data={expenses} center={`${programmeShare}%`} sub="to programmes" />
              <div className="flex-1 w-full"><Legend data={expenses} /></div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="forest" topo="a">
        <SectionHeader dark eyebrow="Of every ₦1,000" title="What your ₦1,000 does" />
        <div className="grid gap-4">
          {perThousand.map((p) => (
            <div key={p.label} className="grid md:grid-cols-[240px_1fr_80px] items-center gap-3 md:gap-6">
              <span className="text-white font-medium">{p.label}</span>
              <div className="bar bar-dark !h-4"><span style={{ width: `${p.amount / 7.3}%` }} /></div>
              <span className="font-display text-2xl font-semibold text-lime tabular-nums md:text-right">₦{p.amount}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader eyebrow="Reports" title="Annual reports & audits" />
            <ul className="space-y-3 -mt-4">
              {reports.map((r) => (
                <li key={r.title} className="card !rounded-[20px] p-4 flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-[color:var(--mist-2)] text-moss flex items-center justify-center shrink-0"><FileText className="w-5 h-5" strokeWidth={1.5} /></span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[15px]">{r.title}</div>
                    <div className="text-[12.5px] text-muted">{r.size}</div>
                  </div>
                  <a href="#" className="btn btn-outline btn-sm shrink-0" aria-label={`Download ${r.title}`}><Download className="w-4 h-4" strokeWidth={1.5} /> <span className="hidden sm:inline">Download</span></a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Governance" title="Registration & oversight" />
            <dl className="card p-6 divide-y divide-[color:var(--line)] -mt-4">
              {governance.map((g) => (
                <div key={g.label} className="py-3.5 grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-4 text-[14.5px]">
                  <dt className="text-muted">{g.label}</dt>
                  <dd className="font-medium">{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader eyebrow="Board of trustees" title="Who holds us accountable" lede="Trustees are unpaid volunteers who serve three-year terms (maximum two)." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {board.map((b) => (
            <div key={b.name} className="card p-6">
              <div className="w-14 h-14 rounded-full bg-forest text-lime font-display font-semibold flex items-center justify-center text-lg">{b.initials}</div>
              <div className="mt-4 font-display font-semibold leading-tight">{b.name}</div>
              <div className="text-[13px] text-moss font-medium mt-1">{b.role}</div>
              <p className="text-[13.5px] text-ink-2 mt-2">{b.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
