import type { Metadata } from "next";
import { Check, FileSearch, Landmark, LineChart, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { SmartForm } from "@/components/ui/smart-form";
import { funders, funderTiers } from "@/mock/partners";
import { programmes } from "@/mock/programmes";
import { IMG } from "@/mock/images";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Funders & partnerships",
  description: "Partner with Green Canopy Trust: programme grants, landscape partnerships and core funding for foundations, multilaterals and corporates.",
};

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Funders & foundations"
        title={<>Fund restoration that <span className="text-lime">stays restored.</span></>}
        lede="We partner with foundations, bilateral and multilateral agencies, family offices and corporate foundations to restore whole landscapes — with the data to prove it."
        image={IMG.handshake}
      >
        <a href="#proposal" className="btn btn-lime btn-lg">Request our funding prospectus</a>
      </PageHero>

      <Section tone="white">
        <SectionHeader eyebrow="Why partner with us" title="Built for institutional rigour" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: LineChart, t: "Evidence-led", d: "Survival audits at 6/12/24 months, satellite canopy change and third-party verification." },
            { icon: Landmark, t: "Government aligned", d: "Formal MoUs with the Great Green Wall agency and five state ministries of environment." },
            { icon: ShieldCheck, t: "Safeguarded", d: "FPIC, safeguarding and grievance mechanisms in every community we work with." },
            { icon: FileSearch, t: "Clean audits", d: "Unqualified audit opinions every year since 2015. Restricted funds ring-fenced." },
          ].map((f) => (
            <div key={f.t} className="card p-6">
              <f.icon className="w-7 h-7 text-moss" strokeWidth={1.5} />
              <div className="mt-4 font-display text-lg font-semibold">{f.t}</div>
              <p className="mt-1.5 text-[14.5px] text-ink-2">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist" topo="a">
        <SectionHeader eyebrow="Partnership tiers" title="Ways to fund" />
        <div className="grid md:grid-cols-3 gap-6">
          {funderTiers.map((t) => (
            <div key={t.id} className={cn("p-7 flex flex-col", t.featured ? "rounded-[28px] bg-forest on-dark" : "card")}>
              <div className={cn("font-display text-xl font-semibold", t.featured && "text-white")}>{t.name}</div>
              <div className={cn("mt-2 font-display text-2xl font-semibold", t.featured ? "text-lime" : "text-moss")}>{t.price}</div>
              <p className={cn("mt-2 text-[14.5px]", t.featured ? "text-on-dark-muted" : "text-ink-2")}>{t.blurb}</p>
              <ul className="mt-6 space-y-3 text-[14.5px] flex-1">
                {t.features.map((f) => <li key={f} className="flex gap-2.5"><Check className={cn("w-5 h-5 shrink-0", t.featured ? "text-lime" : "text-moss")} strokeWidth={1.75} />{f}</li>)}
              </ul>
              <a href="#proposal" className={cn("btn mt-7", t.featured ? "btn-lime" : "btn-forest")}>Discuss a {t.name.toLowerCase()}</a>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader eyebrow="Our funders & partners" title="In good company" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[color:var(--line)] rounded-[24px] overflow-hidden border border-line">
          {funders.map((f) => (
            <div key={f.name} className="bg-white p-6 min-h-[120px] flex flex-col justify-between">
              <span className="font-display text-[17px] font-semibold leading-tight tracking-tight">{f.name}</span>
              <span className="text-[12px] text-muted mt-3">{f.type} · since {f.since}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="forest" topo="b">
        <div className="grid lg:grid-cols-2 gap-12">
          <SectionHeader dark eyebrow="Grant management" title="How we manage your funds" lede="Restricted grants are tracked in separate cost centres from proposal to final report." />
          <ol className="space-y-4">
            {[
              ["Co-design", "Logframe, budget and KPIs agreed with you and the communities before funds move."],
              ["Ring-fencing", "Each grant gets its own cost code; spend is reconciled monthly by our Finance & Audit Committee."],
              ["Reporting", "Quarterly narrative + financial reports, geotagged tree data and photos; annual satellite canopy report."],
              ["Assurance", "Annual external audit and grant-specific audits on request. Unspent funds returned or reallocated with consent."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-[22px] border border-dark p-5">
                <span className="w-10 h-10 rounded-full bg-[color:var(--lime)] text-[color:var(--forest)] font-display font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
                <div><div className="font-display text-lg font-semibold text-white">{t}</div><p className="text-[14.5px] text-on-dark-muted mt-1">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="mist" id="proposal">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <SectionHeader eyebrow="Enquiry / proposal" title="Start a conversation" lede={`We’ll send our funding prospectus and a tailored concept note. Or email ${siteConfig.brand.partnershipsEmail}.`} />
          <div className="card p-6 md:p-8">
            <SmartForm
              submitLabel="Send enquiry"
              successTitle="Thank you"
              successBody="Our Head of Partnerships will reply within two working days with our prospectus and next steps."
              fields={[
                { name: "name", label: "Full name", required: true, half: true },
                { name: "org", label: "Organisation", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "type", label: "Organisation type", type: "select", required: true, half: true, options: ["Foundation / trust", "Bilateral / multilateral", "Corporate foundation / CSR", "Family office / philanthropist", "Government agency", "Other"].map((v) => ({ value: v, label: v })) },
                { name: "focus", label: "Area of interest", type: "select", options: [{ value: "any", label: "Open / whole portfolio" }, ...programmes.map((p) => ({ value: p.slug, label: p.name }))] },
                { name: "range", label: "Indicative range", type: "select", half: true, options: ["Under ₦50m", "₦50m–₦250m", "₦250m–₦1bn", "₦1bn+"].map((v) => ({ value: v, label: v })) },
                { name: "timeline", label: "Funding timeline", type: "select", half: true, options: ["Next 3 months", "3–12 months", "12+ months"].map((v) => ({ value: v, label: v })) },
                { name: "message", label: "Your priorities", type: "textarea", placeholder: "Tell us about your strategy, geography or reporting needs." },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
