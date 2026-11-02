"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, Check, Copy, CreditCard, Gift, Hash, Heart, Lock, TreePine } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn, formatNaira, formatNumber, parsePositiveInt } from "@/lib/utils";
import { shortCode } from "@/lib/hash";
import { designationGroups, designationLabel, isValidDesignation } from "@/lib/designations";
import { getCampaign } from "@/mock/campaigns";
import { getProject } from "@/mock/projects";

type Frequency = "one-time" | "monthly" | "annual";
type Method = "card" | "bank" | "ussd";

const D = siteConfig.donation;
const FREQ_SUFFIX: Record<Frequency, string> = { "one-time": "", monthly: "/month", annual: "/year" };

export function DonateClient() {
  const sp = useSearchParams();
  const router = useRouter();

  // ---- Prefill from query params ----
  const qAmount = parsePositiveInt(sp.get("amount"));
  const qFreq = sp.get("frequency");
  const qCampaign = sp.get("campaign");
  const qProgramme = sp.get("programme");
  const qDesignation = sp.get("designation");
  const initialDesignation = isValidDesignation(qDesignation)
    ? qDesignation
    : qCampaign && getCampaign(qCampaign)
      ? `campaign:${qCampaign}`
      : qProgramme && isValidDesignation(`programme:${qProgramme}`)
        ? `programme:${qProgramme}`
        : "general";
  const treeCount = parsePositiveInt(sp.get("trees"));
  const treeSite = getProject(sp.get("site") ?? "");
  const giftTo = sp.get("giftTo")?.slice(0, 48) ?? "";
  const giftFrom = sp.get("giftFrom")?.slice(0, 48) ?? "";
  const occasion = sp.get("occasion")?.slice(0, 24) ?? "";
  const giftMessage = sp.get("message")?.slice(0, 140) ?? "";

  const presetAmounts = D.presets.map((p) => p.amount) as number[];
  const [frequency, setFrequency] = useState<Frequency>(
    qFreq === "monthly" || qFreq === "annual" || qFreq === "one-time" ? qFreq : "one-time"
  );
  const [amount, setAmount] = useState<number | null>(qAmount ?? 25000);
  const [custom, setCustom] = useState(qAmount && !presetAmounts.includes(qAmount) ? String(qAmount) : "");
  const [designation, setDesignation] = useState(initialDesignation);
  const [coverFees, setCoverFees] = useState(true);
  const [tribute, setTribute] = useState(false);
  const [tributeType, setTributeType] = useState<"honour" | "memory">("honour");
  const [tributeName, setTributeName] = useState("");
  const [tributeNotify, setTributeNotify] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [donor, setDonor] = useState({ first: "", last: "", email: "", phone: "", updates: true });
  const [method, setMethod] = useState<Method>("card");
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [bankConfirmed, setBankConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fee = amount && coverFees ? Math.ceil(amount * D.feeRate) : 0;
  const total = (amount ?? 0) + fee;
  const reference = donor.email && amount ? `GCT-${shortCode(`${donor.email}|${amount}|${frequency}`)}` : "GCT-XXXXXX";
  const ussdCode = D.ussd.code.replace("*000*", `*${total || "AMOUNT"}*`);
  const presetImpact = D.presets.find((p) => p.amount === amount)?.impact;

  const onCustom = (v: string) => {
    setCustom(v);
    const cleaned = v.replace(/[,\s₦]/g, "");
    if (!cleaned) return setAmount(null);
    setAmount(/^\d+$/.test(cleaned) && parseInt(cleaned, 10) > 0 ? parseInt(cleaned, 10) : null);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard may be unavailable; still show feedback */
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!amount) e.amount = custom ? "Amount must be a positive whole number of naira." : "Choose or enter an amount.";
    else if (amount < D.minAmount) e.amount = `The minimum gift is ${formatNaira(D.minAmount)}.`;
    else if (amount > 100_000_000) e.amount = "For gifts above ₦100m please contact our partnerships team.";
    if (!donor.first.trim()) e.first = "First name is required.";
    if (!donor.last.trim()) e.last = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(donor.email.trim())) e.email = "Enter a valid email for your receipt.";
    if (donor.phone && !/^\+?[\d\s()-]{7,}$/.test(donor.phone)) e.phone = "Enter a valid phone number.";
    if (tribute && !tributeName.trim()) e.tributeName = "Who is this gift dedicated to?";
    if (tributeNotify && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(tributeNotify)) e.tributeNotify = "Enter a valid email or leave blank.";
    if (method === "card") {
      const digits = card.number.replace(/\s/g, "");
      if (!card.name.trim()) e.cardName = "Name on card is required.";
      if (!/^\d{16,19}$/.test(digits)) e.cardNumber = "Enter a valid 16–19 digit card number.";
      const m = card.expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
      if (!m || +m[1] < 1 || +m[1] > 12) e.cardExpiry = "Use MM/YY.";
      else {
        const exp = new Date(2000 + +m[2], +m[1], 0);
        if (exp < new Date()) e.cardExpiry = "This card has expired.";
      }
      if (!/^\d{3,4}$/.test(card.cvc)) e.cardCvc = "3 or 4 digits.";
    }
    if (method === "bank" && !bankConfirmed) e.bank = "Please confirm you’ll use the reference above.";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setSubmitting(true);
    const ref = `GCT-${shortCode(`${donor.email}|${total}|${Date.now()}`, 8)}`;
    const p = new URLSearchParams({
      ref,
      amount: String(total),
      gift: String(amount),
      fee: String(fee),
      frequency,
      designation,
      method,
      name: anonymous ? "Anonymous" : donor.first.trim(),
      email: donor.email.trim(),
    });
    if (tribute) {
      p.set("tribute", tributeType);
      p.set("tributeName", tributeName.trim());
    }
    if (treeCount && treeSite) {
      p.set("trees", String(treeCount));
      p.set("site", treeSite.slug);
      if (giftTo) {
        p.set("giftTo", giftTo);
        if (giftFrom) p.set("giftFrom", giftFrom);
        if (occasion) p.set("occasion", occasion);
        if (giftMessage) p.set("message", giftMessage);
      }
    }
    setTimeout(() => router.push(`/donate/thank-you?${p.toString()}`), 600);
  };

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-err`} className="field-error">{errors[k]}</p>
    ) : null;
  const aria = (k: string) => ({
    "data-field": k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <section className="bg-mist py-10 md:py-16">
      <form noValidate onSubmit={submit} className="container-x grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
        <div className="space-y-6">
          {treeCount && treeSite && (
            <div className="rounded-[24px] bg-forest on-dark p-5 flex gap-4 items-start">
              <span className="w-11 h-11 rounded-full bg-[color:var(--lime)] text-[color:var(--forest)] flex items-center justify-center shrink-0"><TreePine className="w-5 h-5" strokeWidth={1.5} /></span>
              <div className="text-[14.5px]">
                <div className="font-display font-semibold text-white text-lg">{formatNumber(treeCount)} trees at {treeSite.name}, {treeSite.state}</div>
                <div className="text-on-dark-muted">
                  ≈ {formatNumber(treeCount * treeSite.co2PerTree20y, 1)} t CO₂ over 20 years.
                  {giftTo && <> Gift certificate for <strong className="text-lime">{giftTo}</strong>{occasion ? ` (${occasion})` : ""}.</>}
                </div>
              </div>
            </div>
          )}

          {/* Amount */}
          <fieldset className="card p-6 md:p-8">
            <legend className="sr-only">Gift amount and frequency</legend>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold">Your gift</h2>
              <div className="inline-flex p-1 rounded-full bg-[color:var(--mist-2)]" role="radiogroup" aria-label="Frequency">
                {D.frequencies.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={frequency === f.id}
                    onClick={() => setFrequency(f.id as Frequency)}
                    className={cn("px-4 min-h-[40px] rounded-full text-[14px] font-semibold transition-colors", frequency === f.id ? "bg-forest text-white" : "text-ink-2 hover:text-[color:var(--forest)]")}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            {frequency !== "one-time" && (
              <p className="mt-3 text-[13.5px] text-moss font-medium">
                {frequency === "monthly" ? "Monthly" : "Annual"} givers keep nurseries running all year. Cancel any time by email or WhatsApp.
              </p>
            )}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-label="Preset amounts">
              {D.presets.map((p) => {
                const active = amount === p.amount && !custom;
                return (
                  <button
                    key={p.amount}
                    type="button"
                    aria-pressed={active}
                    onClick={() => { setAmount(p.amount); setCustom(""); }}
                    className={cn("rounded-[20px] border-2 px-4 py-3.5 text-left min-h-[64px] transition-colors", active ? "border-[color:var(--forest)] bg-forest text-white" : "border-line bg-white hover:border-[color:var(--moss)]")}
                  >
                    <span className="font-display text-xl font-semibold">{formatNaira(p.amount)}</span>
                    <span className={cn("text-[12px] ml-1", active ? "text-lime" : "text-muted")}>{FREQ_SUFFIX[frequency]}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <label htmlFor="custom-amount" className="label">Other amount (₦)</label>
              <div className="relative max-w-xs">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-muted">₦</span>
                <input id="custom-amount" inputMode="numeric" className="input !pl-9" placeholder="e.g. 40000" value={custom} onChange={(e) => onCustom(e.target.value)} {...aria("amount")} />
              </div>
              {err("amount")}
            </div>
            <div className="mt-5 rounded-[18px] bg-[color:var(--mist)] p-4 flex gap-3 text-[14.5px]" aria-live="polite">
              <Heart className="w-5 h-5 text-moss shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-ink-2">
                {amount ? (
                  presetImpact ? (
                    <><strong className="text-[color:var(--forest)]">{formatNaira(amount)}</strong> {presetImpact}.</>
                  ) : (
                    <><strong className="text-[color:var(--forest)]">{formatNaira(amount)}</strong> plants and protects about <strong>{formatNumber(Math.floor(amount / siteConfig.trees.pricePerTree))}</strong> trees for two years.</>
                  )
                ) : (
                  "Choose an amount to see what it makes possible."
                )}
              </p>
            </div>
          </fieldset>

          {/* Designation + options */}
          <fieldset className="card p-6 md:p-8 space-y-5">
            <legend className="sr-only">Designation and options</legend>
            <h2 className="font-display text-2xl font-semibold">Where should it go?</h2>
            <div>
              <label htmlFor="designation" className="label">Designation</label>
              <select id="designation" className="input" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                {designationGroups.map((g) => (
                  <optgroup key={g.group} label={g.group}>
                    {g.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </optgroup>
                ))}
              </select>
              <p className="text-[12.5px] text-muted mt-1.5">Restricted gifts are spent only on the purpose you choose.</p>
            </div>
            <Check2 id="fees" checked={coverFees} onChange={setCoverFees} label={<>Cover the {(D.feeRate * 100).toFixed(1)}% processing fee{amount ? <> (+{formatNaira(Math.ceil(amount * D.feeRate))})</> : null} so 100% of my gift reaches the field</>} />
            <Check2 id="anon" checked={anonymous} onChange={setAnonymous} label="Give anonymously — don’t show my name on public donor lists" />
            <Check2 id="tribute" checked={tribute} onChange={setTribute} label="Dedicate this gift in honour or memory of someone" />
            {tribute && (
              <div className="grid sm:grid-cols-2 gap-4 pl-0 sm:pl-9">
                <div className="sm:col-span-2 inline-flex p-1 rounded-full bg-[color:var(--mist-2)] w-fit" role="radiogroup" aria-label="Tribute type">
                  {(["honour", "memory"] as const).map((t) => (
                    <button key={t} type="button" role="radio" aria-checked={tributeType === t} onClick={() => setTributeType(t)} className={cn("px-4 min-h-[40px] rounded-full text-[14px] font-semibold", tributeType === t ? "bg-forest text-white" : "text-ink-2")}>
                      In {t} of
                    </button>
                  ))}
                </div>
                <div>
                  <label htmlFor="tributeName" className="label">Their name *</label>
                  <input id="tributeName" className="input" value={tributeName} onChange={(e) => setTributeName(e.target.value)} {...aria("tributeName")} />
                  {err("tributeName")}
                </div>
                <div>
                  <label htmlFor="tributeNotify" className="label">Notify someone (email, optional)</label>
                  <input id="tributeNotify" type="email" className="input" value={tributeNotify} onChange={(e) => setTributeNotify(e.target.value)} {...aria("tributeNotify")} />
                  {err("tributeNotify")}
                </div>
              </div>
            )}
          </fieldset>

          {/* Donor details */}
          <fieldset className="card p-6 md:p-8">
            <legend className="sr-only">Your details</legend>
            <h2 className="font-display text-2xl font-semibold">Your details</h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <Field id="first" label="First name *" value={donor.first} onChange={(v) => setDonor({ ...donor, first: v })} aria={aria("first")} err={err("first")} autoComplete="given-name" />
              <Field id="last" label="Last name *" value={donor.last} onChange={(v) => setDonor({ ...donor, last: v })} aria={aria("last")} err={err("last")} autoComplete="family-name" />
              <Field id="email" type="email" label="Email (for your receipt) *" value={donor.email} onChange={(v) => setDonor({ ...donor, email: v })} aria={aria("email")} err={err("email")} autoComplete="email" />
              <Field id="phone" type="tel" label="Phone / WhatsApp" value={donor.phone} onChange={(v) => setDonor({ ...donor, phone: v })} aria={aria("phone")} err={err("phone")} autoComplete="tel" placeholder="+234…" />
            </div>
            <div className="mt-4">
              <Check2 id="updates" checked={donor.updates} onChange={(v) => setDonor({ ...donor, updates: v })} label="Send me the monthly Canopy Report with photos and data from the sites I support" />
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset className="card p-6 md:p-8">
            <legend className="sr-only">Payment method</legend>
            <h2 className="font-display text-2xl font-semibold">Payment</h2>
            <div className="mt-5 grid grid-cols-3 gap-2" role="tablist" aria-label="Payment method">
              {([
                { id: "card", label: "Card", icon: CreditCard },
                { id: "bank", label: "Bank transfer", icon: Building2 },
                { id: "ussd", label: "USSD", icon: Hash },
              ] as const).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  id={`tab-${m.id}`}
                  aria-selected={method === m.id}
                  aria-controls={`panel-${m.id}`}
                  onClick={() => setMethod(m.id)}
                  className={cn("flex flex-col sm:flex-row items-center justify-center gap-2 rounded-[18px] border-2 min-h-[56px] px-2 text-[14px] font-semibold transition-colors", method === m.id ? "border-[color:var(--forest)] bg-forest text-white" : "border-line hover:border-[color:var(--moss)]")}
                >
                  <m.icon className="w-5 h-5" strokeWidth={1.5} />
                  {m.label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div id="panel-card" role="tabpanel" aria-labelledby="tab-card" className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field id="cardName" label="Name on card *" value={card.name} onChange={(v) => setCard({ ...card, name: v })} aria={aria("cardName")} err={err("cardName")} autoComplete="cc-name" />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    id="cardNumber"
                    label="Card number *"
                    inputMode="numeric"
                    value={card.number}
                    onChange={(v) => setCard({ ...card, number: v.replace(/[^\d]/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ") })}
                    aria={aria("cardNumber")}
                    err={err("cardNumber")}
                    autoComplete="cc-number"
                    placeholder="5399 0000 0000 0000"
                  />
                </div>
                <Field id="cardExpiry" label="Expiry (MM/YY) *" inputMode="numeric" value={card.expiry} onChange={(v) => { const d = v.replace(/[^\d]/g, "").slice(0, 4); setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d }); }} aria={aria("cardExpiry")} err={err("cardExpiry")} autoComplete="cc-exp" placeholder="08/28" />
                <Field id="cardCvc" label="CVC *" inputMode="numeric" value={card.cvc} onChange={(v) => setCard({ ...card, cvc: v.replace(/[^\d]/g, "").slice(0, 4) })} aria={aria("cardCvc")} err={err("cardCvc")} autoComplete="cc-csc" placeholder="123" />
                <p className="sm:col-span-2 text-[12.5px] text-muted flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" strokeWidth={1.5} /> Demo template — no card is charged. Verve, Mastercard & Visa accepted.</p>
              </div>
            )}

            {method === "bank" && (
              <div id="panel-bank" role="tabpanel" aria-labelledby="tab-bank" className="mt-6">
                <div className="rounded-[22px] bg-forest on-dark p-5 md:p-6 space-y-3">
                  {[
                    { k: "Bank", v: D.bank.bankName },
                    { k: "Account name", v: D.bank.accountName },
                    { k: "Account number", v: D.bank.accountNumber, copy: true },
                    { k: "Amount", v: total ? formatNaira(total) : "—" },
                    { k: "Reference", v: reference, copy: reference !== "GCT-XXXXXX" },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center justify-between gap-3 text-[14.5px]">
                      <span className="text-on-dark-muted">{r.k}</span>
                      <span className="flex items-center gap-2">
                        <span className="font-display font-semibold text-white tabular-nums">{r.v}</span>
                        {r.copy && (
                          <button type="button" onClick={() => copy(r.v, r.k)} className="w-11 h-11 -my-2 rounded-full flex items-center justify-center text-lime hover:bg-white/10" aria-label={`Copy ${r.k.toLowerCase()}`}>
                            {copied === r.k ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" strokeWidth={1.5} />}
                          </button>
                        )}
                      </span>
                    </div>
                  ))}
                  <p className="text-[12.5px] text-on-dark-muted pt-2 border-t border-dark" aria-live="polite">
                    {copied ? "Copied to clipboard." : reference === "GCT-XXXXXX" ? "Enter your email above to generate your unique reference." : "Use this reference so we can match your transfer and send your receipt."}
                  </p>
                </div>
                <p className="mt-3 text-[13px] text-muted">International donors: {D.bank.usdAccount}.</p>
                <div className="mt-4">
                  <Check2 id="bank" checked={bankConfirmed} onChange={setBankConfirmed} label="I’ll make the transfer using the reference above" />
                  {err("bank")}
                </div>
              </div>
            )}

            {method === "ussd" && (
              <div id="panel-ussd" role="tabpanel" aria-labelledby="tab-ussd" className="mt-6 rounded-[22px] bg-forest on-dark p-6 text-center">
                <div className="text-[13px] text-on-dark-muted">{D.ussd.label} — dial</div>
                <div className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-lime tracking-wide break-all">{ussdCode}</div>
                <button type="button" onClick={() => copy(ussdCode, "ussd")} className="btn btn-ghost-light btn-sm mt-4">
                  {copied === "ussd" ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" strokeWidth={1.5} /> Copy code</>}
                </button>
                <p className="mt-4 text-[12.5px] text-on-dark-muted max-w-md mx-auto">{D.ussd.hint}. Use reference <strong className="text-white">{reference}</strong> when prompted.</p>
              </div>
            )}
          </fieldset>
        </div>

        {/* Sticky summary */}
        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className="rounded-[28px] bg-forest on-dark p-6 md:p-7" aria-live="polite">
            <div className="eyebrow">Summary</div>
            <dl className="mt-5 space-y-3 text-[14.5px]">
              <Row k="Gift" v={amount ? `${formatNaira(amount)}${FREQ_SUFFIX[frequency]}` : "—"} />
              <Row k="Frequency" v={D.frequencies.find((f) => f.id === frequency)!.label} />
              <Row k="Designation" v={designationLabel(designation)} />
              {coverFees && amount ? <Row k="Processing fee" v={`+${formatNaira(fee)}`} /> : null}
              {tribute && tributeName && <Row k={`In ${tributeType} of`} v={tributeName} />}
              {anonymous && <Row k="Visibility" v="Anonymous" />}
              {treeCount && treeSite && <Row k="Trees" v={`${formatNumber(treeCount)} · ${treeSite.name}`} />}
              {giftTo && <Row k="Certificate for" v={giftTo} />}
            </dl>
            <div className="mt-5 pt-5 border-t border-dark flex items-baseline justify-between">
              <span className="font-semibold text-white">Total {frequency !== "one-time" && <span className="text-on-dark-muted font-normal">{FREQ_SUFFIX[frequency]}</span>}</span>
              <span className="font-display text-4xl font-semibold text-lime tabular-nums">{total ? formatNaira(total) : "₦0"}</span>
            </div>
            <button type="submit" className="btn btn-lime btn-lg w-full mt-6" disabled={submitting}>
              {submitting ? "Processing…" : method === "card" ? <>Donate {total ? formatNaira(total) : ""} <Lock className="w-4 h-4" /></> : "Confirm my gift"}
            </button>
            {Object.keys(errors).length > 0 && <p role="alert" className="mt-3 text-[13px] text-[#FFB4A8]">Please fix {Object.keys(errors).length} highlighted {Object.keys(errors).length === 1 ? "field" : "fields"}.</p>}
            <p className="mt-4 text-[12px] text-on-dark-muted">{D.receiptNote}</p>
          </div>
          <div className="card p-5 flex gap-3 items-start text-[13.5px] text-ink-2">
            <Gift className="w-5 h-5 text-moss shrink-0" strokeWidth={1.5} />
            <p>Want to give trees as a gift with a printable certificate? <Link href="/plant" className="font-semibold text-moss underline underline-offset-2">Use the tree planter</Link>.</p>
          </div>
        </aside>
      </form>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-on-dark-muted shrink-0">{k}</dt>
      <dd className="text-white text-right font-medium">{v}</dd>
    </div>
  );
}

function Check2({ id, checked, onChange, label }: { id: string; checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode }) {
  return (
    <label htmlFor={`cb-${id}`} className="flex items-start gap-3 text-[14.5px] text-ink-2 cursor-pointer min-h-[44px]">
      <input id={`cb-${id}`} data-field={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 w-5 h-5 accent-[color:var(--moss)] shrink-0" />
      <span>{label}</span>
    </label>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  aria,
  err,
  autoComplete,
  placeholder,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  aria: Record<string, unknown>;
  err: React.ReactNode;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <input id={id} type={type} className="input" value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} placeholder={placeholder} inputMode={inputMode} {...aria} />
      {err}
    </div>
  );
}
