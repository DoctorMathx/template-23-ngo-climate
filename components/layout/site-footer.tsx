import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { footerLinks } from "@/mock/navigation";
import { Logo } from "@/components/ui/logo";
import { Topo } from "@/components/ui/topo";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { impactStats } from "@/mock/impact";
import { formatNumber } from "@/lib/utils";

const social = [
  { label: "Instagram", href: siteConfig.brand.social.instagram, d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5v.01" },
  { label: "X (Twitter)", href: siteConfig.brand.social.twitter, d: "M4 4l7.5 10L4.6 20H8l5-5.6L17 20h3l-7.8-10.4L19.7 4H16l-4.6 5.2L8 4z" },
  { label: "YouTube", href: siteConfig.brand.social.youtube, d: "M5 6h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Zm5.5 3.5v5l4.5-2.5-4.5-2.5Z" },
  { label: "LinkedIn", href: siteConfig.brand.social.linkedin, d: "M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm2 7v7m0-10v.01M12 17v-4a2 2 0 0 1 4 0v4m-4-4v4" },
];

export function SiteFooter() {
  const trees = impactStats.find((s) => s.id === "trees")!;
  return (
    <footer className="relative overflow-hidden bg-forest on-dark pb-24 sm:pb-0">
      <Topo variant="a" className="text-[color:var(--lime)]" opacity={0.07} />
      <div className="container-x relative">
        <div className="py-14 md:py-16 grid gap-10 md:grid-cols-[1.3fr_1fr] items-end border-b border-dark">
          <div>
            <div className="eyebrow mb-4">The Canopy Report</div>
            <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.08] font-semibold text-white max-w-xl">
              {formatNumber(trees.value)} trees and counting. Get the field notes, monthly.
            </h2>
          </div>
          <NewsletterForm />
        </div>

        <div className="py-14 grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-4">
            <Logo />
            <p className="mt-5 text-[14.5px] text-on-dark-muted leading-relaxed max-w-sm">{siteConfig.brand.description}</p>
            <ul className="mt-6 space-y-2.5 text-[14px] text-on-dark-muted">
              <li className="flex gap-2.5"><MapPin className="w-4 h-4 mt-0.5 text-lime shrink-0" strokeWidth={1.5} />{siteConfig.brand.address}</li>
              <li className="flex gap-2.5"><Phone className="w-4 h-4 mt-0.5 text-lime shrink-0" strokeWidth={1.5} /><a href={`tel:${siteConfig.brand.phone.replace(/\s/g, "")}`} className="hover:text-white">{siteConfig.brand.phone}</a></li>
              <li className="flex gap-2.5"><Mail className="w-4 h-4 mt-0.5 text-lime shrink-0" strokeWidth={1.5} /><a href={`mailto:${siteConfig.brand.email}`} className="hover:text-white">{siteConfig.brand.email}</a></li>
            </ul>
          </div>
          <FooterCol title="Our work" items={footerLinks.work} />
          <FooterCol title="Give" items={footerLinks.give} />
          <FooterCol title="Organisation" items={footerLinks.org} />
          <div className="col-span-2 md:col-span-2">
            <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-white mb-4">Follow</h3>
            <div className="flex flex-wrap gap-2">
              {social.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-on-dark-muted hover:text-[color:var(--forest)] hover:bg-[color:var(--lime)] hover:border-transparent transition-colors">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-dark flex flex-col md:flex-row gap-3 md:items-center justify-between text-[12.5px] text-on-dark-muted">
          <p>
            © {new Date().getFullYear()} {siteConfig.org.legalName}. Registered with the Corporate Affairs Commission as an incorporated trustee.
          </p>
          <p>Built on FinStore · finstore.africa</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-white mb-4">{title}</h3>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="inline-flex items-center min-h-[36px] text-[14.5px] text-on-dark-muted hover:text-lime transition-colors">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
