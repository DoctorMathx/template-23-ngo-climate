import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/home/hero";
import { ImpactTicker } from "@/components/home/impact-ticker";
import { DashboardModule } from "@/components/home/dashboard";
import { PlantCta } from "@/components/home/plant-cta";
import {
  BusinessModule,
  CampaignsModule,
  CanopyClubModule,
  ExpeditionsModule,
  FinalCtaModule,
  ProgrammesModule,
  ProjectMapModule,
  StoriesModule,
  TransparencyModule,
} from "@/components/home/modules";

// The homepage is data-driven — reorder or toggle modules in `siteConfig.home.modules`.
const MODULE_MAP = {
  hero: Hero,
  impactTicker: ImpactTicker,
  dashboard: DashboardModule,
  plantCta: PlantCta,
  programmes: ProgrammesModule,
  projectMap: ProjectMapModule,
  campaigns: CampaignsModule,
  canopyClub: CanopyClubModule,
  business: BusinessModule,
  stories: StoriesModule,
  expeditions: ExpeditionsModule,
  transparency: TransparencyModule,
  finalCta: FinalCtaModule,
} as const;

export default function HomePage() {
  return (
    <>
      {siteConfig.home.modules.map((key) => {
        const C = MODULE_MAP[key];
        return C ? <C key={key} /> : null;
      })}
    </>
  );
}
