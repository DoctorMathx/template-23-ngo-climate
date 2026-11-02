"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Briefcase, Cloud, Gift, Map as MapIcon, Printer, TreePine, Car } from "lucide-react";
import { projects } from "@/mock/projects";
import { siteConfig } from "@/lib/site-config";
import { cn, formatNaira, formatNumber, parsePositiveInt } from "@/lib/utils";
import { shortCode } from "@/lib/hash";
import { Certificate } from "@/components/ui/certificate";

const PRICE = siteConfig.trees.pricePerTree;
const MAX_TREES = 100_000;
const OCCASIONS = ["Birthday", "Wedding", "In memory", "Anniversary", "New baby", "Thank you", "Just because"];

export function PlantClient() {
  const sp = useSearchParams();
  const initialTrees = parsePositiveInt(sp.get("trees")) ?? 50;
  const initialSite = projects.find((p) => p.slug === sp.get("site"))?.slug ?? projects[0].slug;

  const [trees, setTrees] = useState<number>(Math.min(initialTrees, MAX_TREES));
  const [custom, setCustom] = useState<string>((siteConfig.trees.presets as readonly number[]).includes(initialTrees) ? "" : String(initialTrees));
  const [customError, setCustomError] = useState("");
  const [siteSlug, setSiteSlug] = useState(initialSite);
  const [gift, setGift] = useState(sp.get("gift") === "1");
  const [recipient, setRecipient] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [from, setFrom] = useState("");
  const [occasion, setOccasion] = useState("Birthday");
  const [message, setMessage] = useState("");
  const [giftErrors, setGiftErrors] = useState<Record<string, string>>({});

  const site = projects.find((p) => p.slug === siteSlug)!;
  const total = trees * PRICE;
  const co2 = trees * site.co2PerTree20y;
  const hectares = trees / site.treesPerHectare;
  const jobDays = (trees / 100) * site.jobDaysPer100Trees;
  const carYears = co2 / 4.6;

  const certId = useMemo(
    () => `${siteConfig.trees.certificatePrefix}-${shortCode(`${recipient}|${trees}|${siteSlug}`)}`,
    [recipient, trees, siteSlug]
  );
  const today = new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

  const onCustom = (v: string) => {
    setCustom(v);
    if (!v) return setCustomError("");
    if (!/^\d+$/.test(v)) return setCustomError("Enter a whole number of trees.");
    const n = parseInt(v, 10);
    if (n < 1) return setCustomError("Plant at least one tree.");
    if (n > MAX_TREES) return setCustomError(`For more than ${formatNumber(MAX_TREES)} trees, talk to our partnerships team.`);
    setCustomError("");
    setTrees(n);
  };

  const params = new URLSearchParams({
    amount: String(total),
    frequency: "one-time",
    designation: `site:${site.slug}`,
    trees: String(trees),
    site: site.slug,
  });
  if (gift) {
    params.set("giftTo", recipient.trim());
    if (from.trim()) params.set("giftFrom", from.trim());
    params.set("occasion", occasion);
    if (message.trim()) params.set("message", message.trim().slice(0, 140));
    if (recipientEmail.trim()) params.set("giftEmail", recipientEmail.trim());
  }
  const donateHref = `/donate?${params.toString()}`;

  const validateGift = () => {
    if (!gift) return true;
    const e: Record<string, string> = {};
    if (!recipient.trim()) e.recipient = "Add the recipient’s name for the certificate.";
    if (recipientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(recipientEmail)) e.recipientEmail = "Enter a valid email or leave blank.";
    setGiftErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <section className="bg-mist py-14 md:py-20">
      <div className="container-x grid lg:grid-cols-[1.45fr_1fr] gap-8 lg:gap-10 items-start">
        <div className="space-y-6">
          {/* Step 1 — how many */}
          <div className="card p-6 md:p-8">
            <StepTitle n={1} title="How many trees?" />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3" role="group" aria-label="Tree presets">
              {siteConfig.trees.presets.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={trees === n && !custom}
                  onClick={() => { setTrees(n); setCustom(""); setCustomError(""); }}
                  className={cn(
                    "rounded-[22px] border-2 p-4 text-left transition-colors min-h-[88px]",
                    trees === n && !custom ? "border-[color:var(--forest)] bg-forest text-white" : "border-line bg-white hover:border-[color:var(--moss)]"
                  )}
                >
                  <div className="font-display text-3xl font-semibold leading-none">{n}</div>
                  <div className={cn("mt-2 text-[13px]", trees === n && !custom ? "text-lime" : "text-moss")}>{formatNaira(n * PRICE)}</div>
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="custom-trees" className="label">Or enter a custom number</label>
              <div className="flex items-center gap-3">
                <input
                  id="custom-trees"
                  inputMode="numeric"
                  className="input max-w-[220px]"
                  placeholder="e.g. 250"
                  value={custom}
                  onChange={(e) => onCustom(e.target.value)}
                  aria-invalid={!!customError || undefined}
                  aria-describedby={customError ? "custom-trees-err" : undefined}
                />
                <span className="text-[14px] text-muted">× {formatNaira(PRICE)} per tree</span>
              </div>
              {customError && <p id="custom-trees-err" className="field-error">{customError}</p>}
            </div>
          </div>

          {/* Step 2 — site */}
          <div className="card p-6 md:p-8">
            <StepTitle n={2} title="Choose a project site" />
            <div className="mt-6 grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Project site">
              {projects.map((p) => {
                const active = p.slug === siteSlug;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSiteSlug(p.slug)}
                    className={cn(
                      "flex gap-3 items-center p-2.5 pr-4 rounded-[22px] border-2 text-left transition-colors",
                      active ? "border-[color:var(--moss)] bg-[color:var(--mist)]" : "border-line hover:border-[color:var(--moss)]/60"
                    )}
                  >
                    <span className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                      <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display font-semibold leading-tight">{p.name}</span>
                      <span className="block text-[12.5px] text-muted mt-0.5">{p.state} · {p.type}</span>
                      <span className="block text-[12px] text-moss mt-0.5 font-medium">{p.survivalRate}% survival · {p.co2PerTree20y} t CO₂/tree</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-[13.5px] text-ink-2">
              <strong>{site.name}:</strong> {site.summary} <Link href={`/projects/${site.slug}`} className="text-moss font-semibold underline underline-offset-2">View site</Link>
            </p>
          </div>

          {/* Step 3 — gift */}
          <div className="card p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <StepTitle n={3} title="Gift these trees? (optional)" />
              <button
                type="button"
                role="switch"
                aria-checked={gift}
                aria-label="Gift these trees to someone"
                onClick={() => setGift(!gift)}
                className={cn("relative w-14 h-8 rounded-full transition-colors shrink-0", gift ? "bg-[color:var(--moss)]" : "bg-[color:var(--line)]")}
              >
                <span className={cn("absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all", gift ? "left-7" : "left-1")} />
              </button>
            </div>
            <p className="mt-2 text-[14px] text-ink-2">Send a printable e-certificate with the site, number of trees and your message.</p>
            {gift && (
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="g-recipient" className="label">Recipient’s name *</label>
                  <input id="g-recipient" className="input" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Mama Ngozi Eze" aria-invalid={!!giftErrors.recipient || undefined} aria-describedby={giftErrors.recipient ? "g-recipient-err" : undefined} maxLength={48} />
                  {giftErrors.recipient && <p id="g-recipient-err" className="field-error">{giftErrors.recipient}</p>}
                </div>
                <div>
                  <label htmlFor="g-email" className="label">Recipient’s email (we’ll send the certificate)</label>
                  <input id="g-email" type="email" className="input" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="optional" aria-invalid={!!giftErrors.recipientEmail || undefined} />
                  {giftErrors.recipientEmail && <p className="field-error">{giftErrors.recipientEmail}</p>}
                </div>
                <div>
                  <label htmlFor="g-from" className="label">From</label>
                  <input id="g-from" className="input" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="e.g. Chidi & the kids" maxLength={48} />
                </div>
                <div>
                  <label htmlFor="g-occasion" className="label">Occasion</label>
                  <select id="g-occasion" className="input" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                    {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="g-msg" className="label">Message <span className="font-normal text-muted">({140 - message.length} characters left)</span></label>
                  <textarea id="g-msg" className="input !min-h-[90px]" maxLength={140} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Happy birthday! Here’s something that will outlive us both." />
                </div>
              </div>
            )}
          </div>

          {gift && (
            <div className="card p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-display text-xl font-semibold">Certificate preview</h3>
                  <p className="text-[13.5px] text-muted">Updates live. The final copy is emailed after your donation.</p>
                </div>
                <button type="button" onClick={() => window.print()} className="btn btn-outline btn-sm"><Printer className="w-4 h-4" strokeWidth={1.5} /> Print preview</button>
              </div>
              <div className="print-area">
                <Certificate
                  recipient={recipient}
                  from={from}
                  trees={trees}
                  siteName={site.name}
                  siteState={site.state}
                  occasion={occasion}
                  message={message}
                  date={today}
                  certId={certId}
                  co2={co2}
                />
              </div>
            </div>
          )}
        </div>

        {/* Impact sidebar */}
        <aside className="lg:sticky lg:top-24 rounded-[28px] bg-forest on-dark p-6 md:p-8 overflow-hidden relative" aria-live="polite">
          <div className="eyebrow">Your live impact estimate</div>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-5xl sm:text-6xl font-semibold text-white leading-none tabular-nums">{formatNumber(trees)}</span>
            <span className="text-on-dark-muted">{trees === 1 ? "tree" : "trees"} at {site.name}</span>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Metric icon={<Cloud className="w-5 h-5" strokeWidth={1.5} />} value={`${formatNumber(co2, co2 < 10 ? 1 : 0)} t`} label="CO₂ absorbed over 20 years" />
            <Metric icon={<MapIcon className="w-5 h-5" strokeWidth={1.5} />} value={`${formatNumber(hectares, hectares < 1 ? 2 : 1)} ha`} label="land restored" />
            <Metric icon={<Briefcase className="w-5 h-5" strokeWidth={1.5} />} value={formatNumber(jobDays, jobDays < 10 ? 1 : 0)} label="days of local work" />
            <Metric icon={<Car className="w-5 h-5" strokeWidth={1.5} />} value={formatNumber(carYears, carYears < 10 ? 1 : 0)} label="car-years of emissions" />
          </div>
          <p className="mt-4 text-[12px] text-on-dark-muted">Estimates use {site.name}’s species mix and its {site.survivalRate}% measured survival rate. <Link href="/impact#methodology" className="underline">Methodology</Link></p>

          <div className="mt-7 pt-6 border-t border-dark space-y-2 text-[14.5px]">
            <div className="flex justify-between"><span className="text-on-dark-muted">{formatNumber(trees)} × {formatNaira(PRICE)}</span><span className="text-white">{formatNaira(total)}</span></div>
            {gift && <div className="flex justify-between"><span className="text-on-dark-muted flex items-center gap-1.5"><Gift className="w-4 h-4" strokeWidth={1.5} /> E-certificate</span><span className="text-lime">Free</span></div>}
            <div className="flex justify-between items-baseline pt-3">
              <span className="font-semibold text-white">Total</span>
              <span className="font-display text-3xl font-semibold text-lime tabular-nums">{formatNaira(total)}</span>
            </div>
          </div>
          <Link
            href={donateHref}
            onClick={(e) => { if (customError || !validateGift()) e.preventDefault(); }}
            className={cn("btn btn-lime btn-lg w-full mt-6", customError && "pointer-events-none opacity-60")}
            aria-disabled={!!customError}
          >
            <TreePine className="w-5 h-5" strokeWidth={1.5} /> Continue to payment <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href={`/donate?frequency=monthly&amount=${Math.max(5000, Math.round(total / 12 / 500) * 500)}&designation=site:${site.slug}`} className="block text-center mt-3 text-[13.5px] text-on-dark-muted hover:text-white underline underline-offset-4 min-h-[44px] leading-[44px]">
            Or plant monthly instead
          </Link>
        </aside>
      </div>
    </section>
  );
}

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-xl md:text-2xl font-semibold">
      <span className="w-9 h-9 rounded-full bg-[color:var(--forest)] text-[color:var(--lime)] text-[15px] flex items-center justify-center">{n}</span>
      {title}
    </h2>
  );
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-[20px] bg-white/5 border border-white/10 p-4">
      <div className="text-lime">{icon}</div>
      <div className="mt-3 font-display text-2xl font-semibold text-white tabular-nums leading-none">{value}</div>
      <div className="mt-1.5 text-[12.5px] text-on-dark-muted">{label}</div>
    </div>
  );
}
