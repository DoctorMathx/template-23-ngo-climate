import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { NigeriaMap, MapLegend } from "@/components/ui/nigeria-map";
import { ProjectCard } from "@/components/ui/cards";
import { projects } from "@/mock/projects";
import { IMG } from "@/mock/images";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Project sites",
  description: "Explore Green Canopy Trust’s restoration sites across Nigeria — Sahel reforestation, Niger Delta mangroves, rainforest buffers, agroforestry and Lagos coast.",
};

export default function ProjectsPage() {
  const totalTrees = projects.reduce((s, p) => s + p.treesPlanted, 0);
  const totalHa = projects.reduce((s, p) => s + p.hectares, 0);
  return (
    <>
      <PageHero eyebrow="Project sites" title={<>Eight landscapes. <span className="text-lime">One map.</span></>} lede="From the dunes of Yobe to the creeks of Bayelsa — explore where your trees grow." image={IMG.greenHills} compact />
      <Section tone="forest" topo="b">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div className="card-dark p-4 md:p-8">
            <NigeriaMap />
            <MapLegend className="mt-4 px-2" />
          </div>
          <div>
            <SectionHeader dark eyebrow="At a glance" title="Where we work" lede="Tap a pin or a card to see species, survival rates, partners and funding." />
            <div className="grid grid-cols-2 gap-4 -mt-4">
              {[
                { v: String(projects.length), l: "active sites" },
                { v: formatNumber(totalTrees), l: "trees across sites" },
                { v: `${formatNumber(totalHa)} ha`, l: "under restoration" },
                { v: String(new Set(projects.map((p) => p.state)).size), l: "states" },
              ].map((s) => (
                <div key={s.l} className="rounded-[22px] border border-dark p-5">
                  <div className="font-display text-2xl md:text-3xl font-semibold text-lime">{s.v}</div>
                  <div className="text-[13px] text-on-dark-muted mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <SectionHeader eyebrow="All sites" title="Choose a landscape" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </Section>
    </>
  );
}
