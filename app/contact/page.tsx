import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SmartForm } from "@/components/ui/smart-form";
import { Topo } from "@/components/ui/topo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.brand.name} in Lagos — phone, WhatsApp, email and office address.`,
};

export default function ContactPage() {
  const b = siteConfig.brand;
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let’s talk <span className="text-lime">trees.</span></>} lede="Questions about a donation, a partnership, volunteering or the press — we reply within two working days." compact />
      <Section tone="mist">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-start">
          <div className="space-y-5">
            <div className="card p-6 space-y-5">
              {[
                { icon: MapPin, k: "Head office", v: b.address },
                { icon: Phone, k: "Phone", v: b.phone, href: `tel:${b.phone.replace(/\s/g, "")}` },
                { icon: MessageCircle, k: "WhatsApp", v: b.whatsapp, href: b.whatsappLink },
                { icon: Mail, k: "Email", v: b.email, href: `mailto:${b.email}` },
                { icon: Mail, k: "Partnerships", v: b.partnershipsEmail, href: `mailto:${b.partnershipsEmail}` },
                { icon: Clock, k: "Office hours", v: b.hours },
              ].map((r) => (
                <div key={r.k} className="flex gap-4">
                  <span className="w-11 h-11 rounded-full bg-[color:var(--mist-2)] text-moss flex items-center justify-center shrink-0"><r.icon className="w-5 h-5" strokeWidth={1.5} /></span>
                  <div>
                    <div className="text-[12.5px] text-muted">{r.k}</div>
                    {r.href ? <a href={r.href} className="font-medium hover:text-moss break-all">{r.v}</a> : <div className="font-medium">{r.v}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden bg-forest" role="img" aria-label={`Map placeholder showing ${b.address}`}>
              <Topo variant="a" className="text-[color:var(--lime)]" opacity={0.25} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="relative inline-flex">
                    <span className="absolute inset-0 rounded-full bg-[color:var(--lime)] pin-pulse" />
                    <span className="relative w-12 h-12 rounded-full bg-[color:var(--lime)] text-[color:var(--forest)] flex items-center justify-center"><MapPin className="w-6 h-6" strokeWidth={1.75} /></span>
                  </span>
                  <div className="mt-3 glass px-4 py-2 text-[13px]">Victoria Island, Lagos</div>
                </div>
              </div>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 btn btn-lime btn-sm">Open in Maps</a>
            </div>
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">Send us a message</h2>
            <SmartForm
              submitLabel="Send message"
              fields={[
                { name: "name", label: "Full name", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "phone", label: "Phone", type: "tel", half: true },
                { name: "topic", label: "Topic", type: "select", required: true, half: true, options: ["Donation or receipt", "Monthly giving / Canopy Club", "Business partnership", "Foundation / grant", "Volunteering & events", "Media & press", "Something else"].map((v) => ({ value: v, label: v })) },
                { name: "message", label: "Message", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
