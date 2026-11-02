import type { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck, FileCheck2, Leaf } from "lucide-react";
import { DonateClient } from "./donate-client";
import { Topo } from "@/components/ui/topo";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give once, monthly or annually to restore Nigeria’s forests, mangroves and coastlines. Card, bank transfer or USSD.",
};

export default function DonatePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest on-dark">
        <Topo variant="b" className="text-[color:var(--lime)]" opacity={0.1} />
        <div className="container-x relative pt-14 pb-12 md:pt-16 md:pb-14">
          <div className="eyebrow mb-4">Donate</div>
          <h1 className="font-display text-white text-[2.4rem] md:text-6xl font-semibold leading-[1.02] max-w-3xl">Put roots in the ground.</h1>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-on-dark-muted">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-lime" strokeWidth={1.5} /> Secure, encrypted payment</span>
            <span className="flex items-center gap-2"><FileCheck2 className="w-4 h-4 text-lime" strokeWidth={1.5} /> Instant receipt by email</span>
            <span className="flex items-center gap-2"><Leaf className="w-4 h-4 text-lime" strokeWidth={1.5} /> 82% spent directly on programmes</span>
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="container-x py-24 text-muted">Loading donation form…</div>}>
        <DonateClient />
      </Suspense>
    </>
  );
}
