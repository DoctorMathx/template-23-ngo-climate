import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { CampaignCard } from "@/components/ui/cards";
import { campaigns } from "@/mock/campaigns";
import { IMG } from "@/mock/images";
import { compactNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Live appeals from Green Canopy Trust — Great Green Wall trees, Niger Delta mangroves, clean cookstoves and Plastic-Free Lagos.",
};

export default function CampaignsPage() {
  const raised = campaigns.reduce((s, c) => s + c.raised, 0);
  const donors = campaigns.reduce((s, c) => s + c.donors, 0);
  return (
    <>
      <PageHero eyebrow="Campaigns" title={<>Live appeals. <span className="text-lime">Real-time progress.</span></>} lede={`${compactNaira(raised)} raised by ${donors.toLocaleString("en-NG")} donors across ${campaigns.length} live campaigns.`} image={IMG.savannaAcacia} compact />
      <Section tone="mist" topo="a">
        <div className="grid md:grid-cols-2 gap-6">
          {campaigns.map((c) => <CampaignCard key={c.slug} c={c} />)}
        </div>
      </Section>
    </>
  );
}
