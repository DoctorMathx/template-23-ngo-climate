import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { faqs } from "@/mock/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about donations, tax receipts, refunds, tree planting, carbon and volunteering with Green Canopy Trust.",
};

export default function FaqPage() {
  const groups = Array.from(new Set(faqs.map((f) => f.group)));
  return (
    <>
      <PageHero eyebrow="FAQ" title={<>Questions, <span className="text-lime">answered.</span></>} lede="Donations, tax, refunds, trees and volunteering. Can’t find it? WhatsApp us." compact />
      <Section tone="mist">
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <nav aria-label="FAQ sections" className="min-w-0 lg:sticky lg:top-24 self-start flex lg:flex-col gap-2 overflow-x-auto no-scrollbar">
            {groups.map((g) => (
              <a key={g} href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="tag tag-outline !bg-white shrink-0 min-h-[44px] !px-4 hover:!border-[color:var(--moss)]">{g}</a>
            ))}
          </nav>
          <div className="min-w-0 space-y-12">
            {groups.map((g) => (
              <section key={g} id={g.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold mb-4">{g}</h2>
                <div className="card px-6"><FaqAccordion items={faqs.filter((f) => f.group === g)} /></div>
              </section>
            ))}
            <div className="rounded-[28px] bg-forest on-dark p-7 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
              <p className="font-display text-xl text-white font-semibold">Still have a question?</p>
              <Link href="/contact" className="btn btn-lime">Contact us</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
