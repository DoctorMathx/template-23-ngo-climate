import type { Metadata } from "next";
import Image from "next/image";
import { Check, FileBarChart2, MapPinned, Megaphone, Users } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { SmartForm } from "@/components/ui/smart-form";
import { CarbonEstimator } from "./carbon-estimator";
import { businessPackages, employeeDayFeatures, funders } from "@/mock/partners";
import { IMG } from "@/mock/images";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Business & carbon partnerships",
  description: "Estimate your company’s carbon footprint, fund verified reforestation, run employee planting days and get co-branded impact reports.",
};

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Business & carbon partnerships"
        title={<>Climate commitments, <span className="text-lime">rooted in proof.</span></>}
        lede="For banks, telcos, FMCGs and startups who want sustainability that staff believe, customers see and auditors can verify."
        image={IMG.canopyFromBelow}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#estimator" className="btn btn-lime btn-lg">Estimate your footprint</a>
          <a href="#enquire" className="btn btn-ghost-light btn-lg">Talk to our team</a>
        </div>
      </PageHero>

      <section className="bg-white border-b border-line">
        <div className="container-x py-8 flex flex-wrap items-center gap-x-10 gap-y-4">
          <span className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-muted">Trusted by</span>
          {funders.filter((f) => f.type === "Corporate").map((f) => (
            <span key={f.name} className="font-display text-lg font-semibold text-ink-2/80 tracking-tight">{f.name}</span>
          ))}
        </div>
      </section>

      <Section tone="mist" id="estimator" topo="a">
        <SectionHeader eyebrow="Carbon footprint estimator" title="What’s your company’s footprint?" lede="A two-minute, Nigeria-specific estimate — including the diesel generators most footprint tools forget." />
        <CarbonEstimator />
      </Section>

      <Section tone="white" id="packages">
        <SectionHeader align="center" eyebrow="Sustainability partnerships" title="Packages that grow with you" lede="All packages include geotagged trees, survival monitoring and honest, claim-ready language for your reports." />
        <div className="grid md:grid-cols-3 gap-6">
          {businessPackages.map((p) => (
            <div key={p.id} className={cn("p-7 flex flex-col", p.featured ? "rounded-[28px] bg-forest on-dark" : "card")}>
              <div className="flex items-center justify-between">
                <span className={cn("font-display text-xl font-semibold", p.featured ? "text-white" : "")}>{p.name}</span>
                {p.featured && <span className="tag tag-dark">Popular</span>}
              </div>
              <div className={cn("mt-3 font-display text-3xl font-semibold", p.featured ? "text-lime" : "text-moss")}>{p.price}</div>
              <p className={cn("mt-2 text-[14.5px]", p.featured ? "text-on-dark-muted" : "text-ink-2")}>{p.blurb}</p>
              <ul className="mt-6 space-y-3 text-[14.5px] flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5"><Check className={cn("w-5 h-5 shrink-0", p.featured ? "text-lime" : "text-moss")} strokeWidth={1.75} />{f}</li>
                ))}
              </ul>
              <a href="#enquire" className={cn("btn mt-7", p.featured ? "btn-lime" : "btn-forest")}>Enquire about {p.name}</a>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="forest" topo="b">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden">
            <Image src={IMG.manPlanting} alt="A volunteer planting seedlings" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeader dark eyebrow="Employee planting days" title="Get your team’s hands dirty" lede="The most-loved part of every partnership. Fully managed: transport, kit, safety, meals and a photographer." />
            <div className="space-y-4 -mt-4">
              {employeeDayFeatures.map((f) => (
                <div key={f.title} className="rounded-[22px] border border-dark p-5">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-display font-semibold text-white text-lg">{f.title}</span>
                    <span className="text-lime text-[13.5px] font-semibold">{f.from}</span>
                  </div>
                  <p className="mt-1.5 text-[14.5px] text-on-dark-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeader eyebrow="Co-branded impact reports" title="Reporting your board will actually read" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: MapPinned, t: "GPS-pinned groves", d: "Every tree batch mapped with photos, species and planting date." },
            { icon: FileBarChart2, t: "ESG-ready data", d: "Trees, survival, hectares and CO₂ in CSV for GRI / ISSB disclosures." },
            { icon: Megaphone, t: "Comms toolkit", d: "Co-branded social assets, press copy and claim-safe wording." },
            { icon: Users, t: "Staff dashboard", d: "A private page showing your company grove growing in real time." },
          ].map((f) => (
            <div key={f.t} className="card p-6">
              <f.icon className="w-7 h-7 text-moss" strokeWidth={1.5} />
              <div className="mt-4 font-display text-lg font-semibold">{f.t}</div>
              <p className="mt-1.5 text-[14.5px] text-ink-2">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" id="enquire">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <SectionHeader eyebrow="Enquire" title="Let’s design your partnership" lede={`Our partnerships team replies within two working days. Prefer email? ${siteConfig.brand.partnershipsEmail}`} />
          </div>
          <div className="card p-6 md:p-8">
            <SmartForm
              submitLabel="Send enquiry"
              successTitle="Enquiry received"
              successBody="Temi from our partnerships team will be in touch within two working days with a tailored proposal."
              fields={[
                { name: "name", label: "Your name", required: true, half: true },
                { name: "role", label: "Job title", half: true },
                { name: "company", label: "Company", required: true, half: true },
                { name: "email", label: "Work email", type: "email", required: true, half: true },
                { name: "phone", label: "Phone", type: "tel", half: true },
                { name: "size", label: "Company size", type: "select", half: true, options: ["1–50", "51–250", "251–1,000", "1,000+"].map((v) => ({ value: v, label: v })) },
                { name: "interest", label: "Interested in", type: "select", required: true, options: [...businessPackages.map((p) => ({ value: p.id, label: `${p.name} package` })), { value: "planting-day", label: "Employee planting day" }, { value: "custom", label: "Custom / not sure yet" }] },
                { name: "budget", label: "Indicative annual budget", type: "select", options: ["Under ₦5m", "₦5m–₦25m", "₦25m–₦100m", "₦100m+"].map((v) => ({ value: v, label: v })) },
                { name: "message", label: "Tell us about your goals", type: "textarea", placeholder: "e.g. We want to engage 300 staff and report restoration in our 2027 sustainability report." },
                { name: "consent", label: "I agree to be contacted about this enquiry.", type: "checkbox", required: true },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
