import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { IMG } from "@/mock/images";
import { PlantClient } from "./plant-client";
import { siteConfig } from "@/lib/site-config";
import { formatNaira } from "@/lib/utils";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { faqs } from "@/mock/faqs";

export const metadata: Metadata = {
  title: "Plant trees",
  description: `Plant geotagged trees in Nigeria for ${formatNaira(siteConfig.trees.pricePerTree)} each. Choose a project site, see your CO₂ impact and gift trees with a printable e-certificate.`,
};

export default function PlantPage() {
  return (
    <>
      <PageHero
        eyebrow="Plant trees"
        title={<>Plant a grove. <span className="text-lime">Watch it grow.</span></>}
        lede={`${formatNaira(siteConfig.trees.pricePerTree)} plants one tree and protects it for two years — seedling, water-harvesting pit, planting labour, community guards and replacement if it doesn’t make it.`}
        image={IMG.seedlingTray}
        compact
      />
      <Suspense fallback={<div className="container-x py-24 text-muted">Loading calculator…</div>}>
        <PlantClient />
      </Suspense>
      <Section tone="white" pad="md">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <SectionHeader eyebrow="Good to know" title="Tree-planting FAQs" />
          <FaqAccordion items={faqs.filter((f) => f.group === "Trees & impact")} />
        </div>
      </Section>
    </>
  );
}
