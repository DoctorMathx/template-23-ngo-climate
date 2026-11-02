"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { events, getEvent } from "@/mock/events";
import { formatDate, formatNaira } from "@/lib/utils";

export function Registration() {
  const sp = useSearchParams();
  const initial = getEvent(sp.get("event") ?? "")?.slug ?? events[0].slug;
  const [slug, setSlug] = useState(initial);
  const [lastParam, setLastParam] = useState(sp.get("event"));
  const ev = getEvent(slug)!;
  const dates = ev.dates ?? [ev.date];
  const [date, setDate] = useState(dates[0]);
  const [size, setSize] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", org: "", notes: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  // Follow ?event= changes when users click "Register" on another card
  const param = sp.get("event");
  if (param !== lastParam) {
    setLastParam(param);
    const e = getEvent(param ?? "");
    if (e) {
      setSlug(e.slug);
      setDate((e.dates ?? [e.date])[0]);
      setSize(1);
      setDone(false);
    }
  }

  const max = Math.min(ev.maxGroup ?? 10, ev.spotsLeft);
  const total = ev.price * size;

  const changeEvent = (s: string) => {
    const e = getEvent(s)!;
    setSlug(s);
    setDate((e.dates ?? [e.date])[0]);
    setSize((n) => Math.min(n, Math.min(e.maxGroup ?? 10, e.spotsLeft)));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er.name = "Your name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) er.email = "Enter a valid email.";
    if (!/^\+?[\d\s()-]{7,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number (for on-the-day logistics).";
    if (size < 1 || size > max) er.size = `Group size must be between 1 and ${max}.`;
    if (!form.consent) er.consent = "Please accept the safety & photo policy.";
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`reg-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    setDone(true);
  };

  if (done)
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <CheckCircle2 className="w-12 h-12 mx-auto text-moss" strokeWidth={1.5} />
        <h3 className="mt-4 font-display text-2xl font-semibold">You’re registered!</h3>
        <p className="mt-2 text-ink-2 max-w-md mx-auto">
          {size} {size === 1 ? "place" : "places"} held for <strong>{ev.title}</strong> on {formatDate(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}.
          {ev.price ? ` We’ve emailed payment details for ${formatNaira(total)} — your spots are held for 72 hours.` : " See you there!"}
        </p>
        <button type="button" className="btn btn-outline btn-sm mt-6" onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", org: "", notes: "", consent: false }); setSize(1); }}>
          Register another group
        </button>
      </div>
    );

  const errP = (k: string) => (errors[k] ? <p id={`reg-${k}-err`} className="field-error">{errors[k]}</p> : null);
  const a = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `reg-${k}-err` : undefined });

  return (
    <form noValidate onSubmit={submit} className="grid sm:grid-cols-2 gap-x-4 gap-y-5">
      <div className="sm:col-span-2">
        <label htmlFor="reg-event" className="label">Event *</label>
        <select id="reg-event" className="input" value={slug} onChange={(e) => changeEvent(e.target.value)}>
          {events.map((e) => <option key={e.slug} value={e.slug}>{e.title} — {e.location}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="reg-date" className="label">Date *</label>
        <select id="reg-date" className="input" value={date} onChange={(e) => setDate(e.target.value)}>
          {dates.map((d) => <option key={d} value={d}>{formatDate(d, { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</option>)}
        </select>
      </div>
      <div>
        <span className="label" id="reg-size-label">Group size * <span className="font-normal text-muted">(max {max})</span></span>
        <div className="flex items-center gap-2" role="group" aria-labelledby="reg-size-label">
          <button type="button" className="w-12 h-12 rounded-full border-2 border-line flex items-center justify-center disabled:opacity-40" onClick={() => setSize((n) => Math.max(1, n - 1))} disabled={size <= 1} aria-label="Decrease group size"><Minus className="w-4 h-4" /></button>
          <input
            id="reg-size"
            className="input !w-20 text-center font-display font-semibold text-lg"
            inputMode="numeric"
            value={size}
            onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setSize(v ? Math.min(parseInt(v, 10), 999) : 0); }}
            aria-label="Group size"
            {...a("size")}
          />
          <button type="button" className="w-12 h-12 rounded-full border-2 border-line flex items-center justify-center disabled:opacity-40" onClick={() => setSize((n) => Math.min(max, n + 1))} disabled={size >= max} aria-label="Increase group size"><Plus className="w-4 h-4" /></button>
        </div>
        {errP("size")}
      </div>
      <div>
        <label htmlFor="reg-name" className="label">Lead contact name *</label>
        <input id="reg-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" {...a("name")} />
        {errP("name")}
      </div>
      <div>
        <label htmlFor="reg-email" className="label">Email *</label>
        <input id="reg-email" type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" {...a("email")} />
        {errP("email")}
      </div>
      <div>
        <label htmlFor="reg-phone" className="label">Phone / WhatsApp *</label>
        <input id="reg-phone" type="tel" className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" placeholder="+234…" {...a("phone")} />
        {errP("phone")}
      </div>
      <div>
        <label htmlFor="reg-org" className="label">School / company (optional)</label>
        <input id="reg-org" className="input" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="reg-notes" className="label">Dietary needs, accessibility or questions</label>
        <textarea id="reg-notes" className="input !min-h-[90px]" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </div>
      <label htmlFor="reg-consent" className="sm:col-span-2 flex items-start gap-3 text-[14px] text-ink-2 cursor-pointer min-h-[44px]">
        <input id="reg-consent" type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-0.5 w-5 h-5 accent-[color:var(--moss)] shrink-0" {...a("consent")} />
        <span>I accept the volunteer safety guidelines and understand photos may be taken on the day.</span>
      </label>
      {errors.consent && <p id="reg-consent-err" className="field-error sm:col-span-2 -mt-3">{errors.consent}</p>}
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[20px] bg-[color:var(--mist)] p-4">
        <div>
          <div className="text-[13px] text-muted">{size || 0} × {ev.price ? formatNaira(ev.price) : "Free"}</div>
          <div className="font-display text-2xl font-semibold">{ev.price ? formatNaira(total) : "Free"}</div>
        </div>
        <button type="submit" className="btn btn-forest btn-lg">Register {size > 1 ? `${size} people` : ""}</button>
      </div>
    </form>
  );
}
