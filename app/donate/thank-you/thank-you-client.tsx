"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Copy, Download, Printer, Share2, Sprout, Users } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { formatNaira, formatNumber, parsePositiveInt } from "@/lib/utils";
import { designationLabel } from "@/lib/designations";
import { getProject } from "@/mock/projects";
import { Topo } from "@/components/ui/topo";
import { Certificate } from "@/components/ui/certificate";
import { shortCode } from "@/lib/hash";

const METHOD: Record<string, string> = { card: "Card", bank: "Bank transfer", ussd: "USSD" };
const FREQ: Record<string, string> = { "one-time": "One-time", monthly: "Monthly", annual: "Annual" };

export function ThankYouClient() {
  const sp = useSearchParams();
  const [copied, setCopied] = useState(false);
  const total = parsePositiveInt(sp.get("amount"));
  const gift = parsePositiveInt(sp.get("gift")) ?? total;
  const fee = parsePositiveInt(sp.get("fee")) ?? 0;
  const ref = (sp.get("ref") ?? "").replace(/[^A-Z0-9-]/gi, "").slice(0, 20) || "GCT-PENDING";
  const frequency = sp.get("frequency") ?? "one-time";
  const method = sp.get("method") ?? "card";
  const name = (sp.get("name") ?? "").slice(0, 40) || "friend";
  const designation = sp.get("designation");
  const tribute = sp.get("tribute");
  const tributeName = sp.get("tributeName")?.slice(0, 48);
  const trees = parsePositiveInt(sp.get("trees"));
  const site = getProject(sp.get("site") ?? "");
  const giftTo = sp.get("giftTo")?.slice(0, 48);
  const date = new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

  if (!total) {
    return (
      <section className="bg-mist py-28">
        <div className="container-x max-w-xl text-center">
          <h1 className="font-display text-4xl font-semibold">No donation found</h1>
          <p className="lede mt-4">This receipt link is missing details. If you’ve just donated, check your email for your receipt — or start a new gift below.</p>
          <Link href="/donate" className="btn btn-forest btn-lg mt-8">Go to donate</Link>
        </div>
      </section>
    );
  }

  const shareText = `I just helped ${siteConfig.brand.name} restore Nigeria’s forests and mangroves. Join me:`;
  const shareUrl = `https://${siteConfig.brand.domain}/plant`;
  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: siteConfig.brand.name, text: shareText, url: shareUrl });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try { await navigator.clipboard.writeText(`${shareText} ${shareUrl}`); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-forest on-dark">
        <Topo variant="a" className="text-[color:var(--lime)]" opacity={0.12} />
        <div className="container-x relative py-16 md:py-24 text-center">
          <span className="mx-auto w-16 h-16 rounded-full bg-[color:var(--lime)] text-[color:var(--forest)] flex items-center justify-center fade-up"><Sprout className="w-8 h-8" strokeWidth={1.5} /></span>
          <h1 className="mt-6 font-display text-white text-[2.4rem] md:text-6xl font-semibold leading-[1.02] fade-up">Thank you, {name}.</h1>
          <p className="lede mt-5 max-w-xl mx-auto fade-up">
            {method === "card"
              ? "Your gift is confirmed. Something is about to grow."
              : "We’ve logged your pledge. As soon as your transfer lands we’ll email your official receipt."}
          </p>
        </div>
      </section>

      <section className="bg-mist py-12 md:py-16">
        <div className="container-x grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="card p-6 md:p-8 print-area">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">Donation receipt</div>
                  <div className="mt-2 font-display text-2xl font-semibold">{siteConfig.org.legalName}</div>
                  <div className="text-[13px] text-muted">{siteConfig.brand.address}</div>
                </div>
                <span className="tag shrink-0">{method === "card" ? "Paid" : "Pending transfer"}</span>
              </div>
              <dl className="mt-6 divide-y divide-[color:var(--line)] border-y border-line text-[14.5px]">
                {[
                  ["Reference", ref],
                  ["Date", date],
                  ["Donation", formatNaira(gift ?? total)],
                  ...(fee ? [["Processing fee covered", formatNaira(fee)]] : []),
                  ["Total", `${formatNaira(total)}${frequency === "monthly" ? " / month" : frequency === "annual" ? " / year" : ""}`],
                  ["Frequency", FREQ[frequency] ?? "One-time"],
                  ["Designation", designationLabel(designation)],
                  ["Payment method", METHOD[method] ?? "Card"],
                  ...(tribute && tributeName ? [[`In ${tribute === "memory" ? "memory" : "honour"} of`, tributeName]] : []),
                  ...(trees && site ? [["Trees", `${formatNumber(trees)} at ${site.name}, ${site.state}`]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[12.5px] text-muted leading-relaxed">{siteConfig.donation.receiptNote}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" onClick={() => window.print()} className="btn btn-outline btn-sm"><Printer className="w-4 h-4" strokeWidth={1.5} /> Print receipt</button>
                <a href="#" className="btn btn-outline btn-sm"><Download className="w-4 h-4" strokeWidth={1.5} /> Download PDF</a>
              </div>
            </div>

            {trees && site && giftTo && (
              <div className="card p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold mb-1">Your gift certificate</h2>
                <p className="text-[13.5px] text-muted mb-5">We’ve emailed a high-resolution copy{sp.get("giftEmail") ? " to the recipient" : ""}. Print it or save as PDF.</p>
                <Certificate
                  recipient={giftTo}
                  from={sp.get("giftFrom")?.slice(0, 48)}
                  trees={trees}
                  siteName={site.name}
                  siteState={site.state}
                  occasion={sp.get("occasion")?.slice(0, 24)}
                  message={sp.get("message")?.slice(0, 140)}
                  date={date}
                  certId={`${siteConfig.trees.certificatePrefix}-${shortCode(`${giftTo}|${trees}|${site.slug}`)}`}
                  co2={trees * site.co2PerTree20y}
                />
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] bg-forest on-dark p-6 md:p-7">
              <h2 className="font-display text-xl font-semibold text-white">Multiply your impact</h2>
              <p className="mt-2 text-[14.5px] text-on-dark-muted">Friends who hear about a gift are 3× more likely to give. Share the link — no amounts shown.</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button type="button" onClick={share} className="btn btn-lime">
                  {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Share2 className="w-4 h-4" strokeWidth={1.5} /> Share</>}
                </button>
                <a className="btn btn-ghost-light" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}>WhatsApp</a>
                <a className="btn btn-ghost-light" target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}>X / Twitter</a>
                <button type="button" className="btn btn-ghost-light" onClick={async () => { try { await navigator.clipboard.writeText(shareUrl); } catch { /* ignore */ } setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                  <Copy className="w-4 h-4" strokeWidth={1.5} /> Link
                </button>
              </div>
            </div>
            <div className="card p-6 md:p-7">
              <h2 className="font-display text-xl font-semibold">What happens next</h2>
              <ol className="mt-4 space-y-4 text-[14.5px] text-ink-2">
                {[
                  "Your receipt arrives by email within a few minutes.",
                  trees ? "Your trees are assigned to the next planting window and geotagged when planted." : "Your gift is allocated to the designation you chose within 7 days.",
                  "You’ll get a field update with photos and data from the site you support.",
                  frequency !== "one-time" ? "You can change or cancel your regular gift any time by email or WhatsApp." : "Consider joining the Canopy Club to keep nurseries running all year.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-[color:var(--mist-2)] text-moss font-display font-semibold text-[13px] flex items-center justify-center shrink-0">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/canopy-club" className="btn btn-forest">Join the Canopy Club <ArrowRight className="w-4 h-4" /></Link>
                <Link href="/get-involved" className="btn btn-outline"><Users className="w-4 h-4" strokeWidth={1.5} /> Fundraise or volunteer</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
