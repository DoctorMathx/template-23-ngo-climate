import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { Section } from "@/components/ui/section";
import { IMG } from "@/mock/images";
import { siteConfig } from "@/lib/site-config";
import { formatNaira } from "@/lib/utils";

export function PlantCta() {
  const price = siteConfig.trees.pricePerTree;
  return (
    <Section tone="mist" topo="a">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[36px] overflow-hidden">
          <Image src={IMG.sproutInSand} alt="A seedling sprouting from sandy soil" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
          <div className="absolute left-5 right-5 bottom-5 glass p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[color:var(--lime)] text-[color:var(--forest)] flex items-center justify-center shrink-0"><Gift className="w-5 h-5" strokeWidth={1.5} /></div>
            <div>
              <div className="font-display font-semibold">Gift a grove</div>
              <div className="text-[13.5px] text-white/80">Send trees with a printable e-certificate — birthdays, weddings, in memory.</div>
            </div>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-4">Plant trees</div>
          <h2 className="font-display text-[2.2rem] md:text-5xl font-semibold leading-[1.04]">
            {formatNaira(price)} grows a tree <br className="hidden md:block" />— and keeps it alive.
          </h2>
          <p className="lede mt-5 max-w-xl">
            Choose a site, pick how many trees, and see your live impact estimate: CO₂ absorbed over 20 years, land restored and days of local work created.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {siteConfig.trees.presets.map((n) => (
              <Link key={n} href={`/plant?trees=${n}`} className="card card-hover p-4 text-center !rounded-[22px]">
                <div className="font-display text-2xl font-semibold">{n}</div>
                <div className="text-[12.5px] text-muted">trees</div>
                <div className="mt-1 text-[13px] font-semibold text-moss">{formatNaira(n * price)}</div>
              </Link>
            ))}
          </div>
          <Link href="/plant" className="btn btn-forest btn-lg mt-8">Open the tree calculator <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </Section>
  );
}
