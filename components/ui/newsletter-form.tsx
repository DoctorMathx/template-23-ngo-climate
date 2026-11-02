"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm({ dark = true, compact }: { dark?: boolean; compact?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setState("error");
    setState("done");
  };
  if (state === "done")
    return (
      <p role="status" className={`flex items-center gap-2 text-sm font-medium ${dark ? "text-lime" : "text-moss"}`}>
        <Check className="w-4 h-4" /> You’re in. Watch for our monthly “Canopy Report”.
      </p>
    );
  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor={id} className="sr-only">Email address</label>
      <div className={`flex gap-2 rounded-full p-1.5 ${dark ? "bg-white/8 border border-white/15" : "bg-white border border-line"} ${compact ? "" : "max-w-md"}`}>
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
          placeholder="you@example.com"
          aria-invalid={state === "error" || undefined}
          aria-describedby={state === "error" ? `${id}-err` : undefined}
          className={`flex-1 min-w-0 bg-transparent px-4 text-[15px] outline-none ${dark ? "text-white placeholder:text-white/50" : "text-[color:var(--forest)]"}`}
        />
        <button type="submit" className={`btn btn-sm ${dark ? "btn-lime" : "btn-forest"}`} aria-label="Subscribe">
          Subscribe <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      {state === "error" && <p id={`${id}-err`} className={`mt-2 text-[13px] ${dark ? "text-[#FFB4A8]" : "field-error"}`}>Please enter a valid email address.</p>}
    </form>
  );
}
