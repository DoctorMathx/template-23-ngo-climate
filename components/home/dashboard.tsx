import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ImpactDashboard } from "@/components/ui/impact-dashboard";

export function DashboardModule() {
  return (
    <Section tone="forest" topo="b">
      <SectionHeader
        dark
        eyebrow="Live impact"
        title={<>Progress you can audit, <span className="text-lime">not just admire.</span></>}
        lede="Every number below is counted after planting, checked by independent monitors and updated each quarter."
        action={<Link href="/impact" className="btn btn-ghost-light">Full dashboard <ArrowRight className="w-4 h-4" /></Link>}
      />
      <ImpactDashboard />
    </Section>
  );
}
