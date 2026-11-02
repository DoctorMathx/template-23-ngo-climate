import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, HandHeart, Megaphone, Sprout } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { SmartForm } from "@/components/ui/smart-form";
import { IMG } from "@/mock/images";
import { programmes } from "@/mock/programmes";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Volunteer, fundraise, join a planting expedition or partner with Green Canopy Trust.",
};

const STATES = ["Lagos", "FCT Abuja", "Kano", "Kaduna", "Jigawa", "Sokoto", "Yobe", "Rivers", "Bayelsa", "Cross River", "Oyo", "Ogun", "Enugu", "Other / outside Nigeria"];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero eyebrow="Get involved" title={<>Bring your hands, <span className="text-lime">your voice, your crew.</span></>} lede="9,600 volunteers have planted, cleaned, taught and fundraised with us. There’s a role for you." image={IMG.volunteers} compact />

      <Section tone="mist" topo="a">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: HandHeart, t: "Volunteer", d: "Clean-ups, nursery days, events and skilled roles (data, design, comms).", href: "#volunteer", cta: "Apply" },
            { icon: Sprout, t: "Join an expedition", d: "Plant in the Sahel or the Delta, or join a Lagos planting day.", href: "/events", cta: "See dates" },
            { icon: Megaphone, t: "Fundraise for us", d: "Run, cycle, celebrate a birthday or challenge your office.", href: "#fundraise", cta: "Start" },
            { icon: Building2, t: "Partner", d: "Corporate CSR, carbon partnerships, foundations and schools.", href: "/business", cta: "Explore" },
          ].map((c) => (
            <Link key={c.t} href={c.href} className="card card-hover p-6 flex flex-col">
              <span className="w-12 h-12 rounded-full bg-forest text-lime flex items-center justify-center"><c.icon className="w-6 h-6" strokeWidth={1.5} /></span>
              <div className="mt-5 font-display text-xl font-semibold">{c.t}</div>
              <p className="mt-2 text-[14.5px] text-ink-2 flex-1">{c.d}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-moss">{c.cta} <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="white" id="volunteer">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <SectionHeader eyebrow="Volunteer application" title="Join the volunteer network" lede="We’ll match you with roles near you. Most volunteers start with a Lagos clean-up or nursery day." />
            <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden -mt-4">
              <Image src={IMG.volunteerShirt} alt="A volunteer wearing a volunteer t-shirt" fill sizes="(min-width:1024px) 500px, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="card p-6 md:p-8">
            <SmartForm
              submitLabel="Submit application"
              successTitle="Application received"
              successBody="Welcome to the canopy! Seun from our community team will WhatsApp you within a week with upcoming opportunities."
              fields={[
                { name: "first", label: "First name", required: true, half: true },
                { name: "last", label: "Last name", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, half: true },
                { name: "state", label: "State", type: "select", required: true, half: true, options: STATES.map((s) => ({ value: s, label: s })) },
                { name: "age", label: "Age range", type: "select", required: true, half: true, options: ["Under 18 (with guardian consent)", "18–24", "25–34", "35–49", "50+"].map((s) => ({ value: s, label: s })) },
                { name: "role", label: "I’m interested in", type: "select", required: true, options: ["Clean-ups & planting days", "Planting expeditions", "School eco-club mentoring", "Skilled volunteering (data, design, comms, finance)", "Event support", "Anything that helps"].map((s) => ({ value: s, label: s })) },
                { name: "programme", label: "Programme you care most about", type: "select", options: programmes.map((p) => ({ value: p.slug, label: p.name })) },
                { name: "availability", label: "Availability", type: "select", options: ["Weekends", "Weekdays", "Once a month", "Flexible"].map((s) => ({ value: s, label: s })) },
                { name: "why", label: "Why do you want to volunteer?", type: "textarea" },
                { name: "consent", label: "I agree to Green Canopy Trust’s volunteer code of conduct and safeguarding policy.", type: "checkbox", required: true },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="forest" id="fundraise" topo="b">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <SectionHeader dark eyebrow="Fundraise for us" title="Turn your milestone into a forest" lede="Birthdays, weddings, marathons, office challenges — we’ll set you up with a personal page, a tree counter and a fundraising pack." />
            <ul className="-mt-4 space-y-3 text-on-dark-muted text-[15px]">
              {["Personal fundraising page with live tree counter", "Printable posters, WhatsApp graphics and a sample message", "Certificate for every supporter who gives ₦2,500+", "A thank-you call from our field team"].map((x) => (
                <li key={x} className="flex gap-3"><Sprout className="w-5 h-5 text-lime shrink-0" strokeWidth={1.5} />{x}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6 md:p-8 text-[color:var(--forest)]">
            <SmartForm
              submitLabel="Start my fundraiser"
              successTitle="Your fundraiser is on its way"
              successBody="We’ll email your personal page link and fundraising pack within one working day."
              fields={[
                { name: "name", label: "Your name", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "type", label: "Fundraiser type", type: "select", required: true, half: true, options: ["Birthday / celebration", "Wedding", "Run / cycle / challenge", "School / university", "Workplace", "In memory"].map((s) => ({ value: s, label: s })) },
                { name: "target", label: "Target (₦)", type: "number", required: true, half: true, min: 10000, max: 100000000, placeholder: "e.g. 250000", help: "Every ₦2,500 = one tree" },
                { name: "date", label: "Fundraiser date", type: "date", half: true },
                { name: "story", label: "Why are you fundraising?", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
