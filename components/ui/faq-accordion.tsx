"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ items, dark }: { items: Pick<Faq, "q" | "a">[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className={`divide-y ${dark ? "divide-[color:var(--forest-3)]" : "divide-[color:var(--line)]"} border-y ${dark ? "border-dark" : "border-line"}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={`${uid}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`w-full flex items-center justify-between gap-6 py-5 min-h-[56px] text-left font-display text-lg font-medium ${dark ? "text-white" : ""}`}
              >
                {f.q}
                <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isOpen ? "rotate-45 bg-[color:var(--moss)] text-white" : dark ? "bg-white/10 text-lime" : "bg-[color:var(--mist-2)] text-moss"}`}>
                  <Plus className="w-4 h-4" strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} hidden={!isOpen} className={`pb-6 pr-12 text-[15px] leading-relaxed ${dark ? "text-on-dark-muted" : "text-ink-2"}`}>
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
