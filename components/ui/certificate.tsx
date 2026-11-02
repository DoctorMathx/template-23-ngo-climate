import { LogoMark } from "./logo";
import { Topo } from "./topo";
import { siteConfig } from "@/lib/site-config";

export type CertificateProps = {
  recipient: string;
  from?: string;
  trees: number;
  siteName: string;
  siteState: string;
  occasion?: string;
  message?: string;
  date: string;
  certId: string;
  co2?: number;
};

// Printable e-certificate (A4 landscape proportions). Use with `.print-area` + window.print().
export function Certificate(p: CertificateProps) {
  return (
    <div className="relative aspect-[1.414/1] w-full rounded-[18px] overflow-hidden bg-[#FBFCF7] text-[color:var(--forest)] border border-[#D9E4D4] shadow-[0_30px_60px_-30px_rgba(12,42,30,.45)] @container">
      <Topo variant="a" className="text-[color:var(--moss)]" opacity={0.18} />
      <div className="absolute inset-[3.2%] rounded-[12px] border-2 border-[color:var(--forest)]/80" />
      <div className="absolute inset-[4.4%] rounded-[8px] border border-[color:var(--moss)]/40" />
      <div className="relative h-full flex flex-col items-center justify-between text-center px-[9%] py-[7%]">
        <div className="flex items-center gap-2">
          <LogoMark className="w-[clamp(20px,4.5cqw,40px)] h-[clamp(20px,4.5cqw,40px)]" />
          <span className="font-display font-semibold text-[clamp(10px,2.1cqw,18px)] tracking-tight">{siteConfig.brand.name}</span>
        </div>
        <div>
          <div className="text-[clamp(7px,1.35cqw,12px)] font-semibold tracking-[0.3em] uppercase text-[color:var(--moss-ink)]">
            Certificate of tree planting{p.occasion ? ` · ${p.occasion}` : ""}
          </div>
          <div className="mt-[1.5cqw] text-[clamp(8px,1.6cqw,14px)] text-[color:var(--ink-2)]">This certifies that</div>
          <div className="font-display font-semibold leading-none mt-[1.2cqw] text-[clamp(18px,6cqw,56px)] tracking-[-0.03em] break-words">
            {p.recipient || "Recipient’s name"}
          </div>
          <div className="mt-[2cqw] text-[clamp(8px,1.75cqw,16px)] text-[color:var(--ink-2)] max-w-[80cqw] mx-auto leading-snug">
            has <strong className="text-[color:var(--forest)]">{p.trees.toLocaleString("en-NG")} {p.trees === 1 ? "tree" : "trees"}</strong> growing at{" "}
            <strong className="text-[color:var(--forest)]">{p.siteName}, {p.siteState}</strong>
            {p.from ? <> — a gift from <strong className="text-[color:var(--forest)]">{p.from}</strong></> : null}.
            {p.co2 ? <> Together they will absorb an estimated {p.co2.toLocaleString("en-NG", { maximumFractionDigits: 1 })} tonnes of CO₂ over 20 years.</> : null}
          </div>
          {p.message && <div className="mt-[1.5cqw] italic text-[clamp(7px,1.5cqw,14px)] text-[color:var(--earth-ink)] max-w-[70cqw] mx-auto line-clamp-2">“{p.message}”</div>}
        </div>
        <div className="w-full flex items-end justify-between text-[clamp(6px,1.2cqw,11px)] text-[color:var(--ink-2)]">
          <div className="text-left">
            <div className="font-display font-semibold text-[color:var(--forest)] text-[clamp(8px,1.6cqw,14px)]">Adaeze Okonkwo</div>
            Executive Director
          </div>
          <div className="w-[11cqw] h-[11cqw] rounded-full bg-[color:var(--forest)] text-[color:var(--lime)] flex flex-col items-center justify-center font-display font-semibold leading-none shadow-inner">
            <span className="text-[clamp(8px,2.4cqw,22px)]">{p.trees.toLocaleString("en-NG")}</span>
            <span className="text-[clamp(5px,0.9cqw,9px)] tracking-[0.2em] uppercase mt-[0.4cqw]">trees</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-[color:var(--forest)]">{p.certId}</div>
            {p.date}
          </div>
        </div>
      </div>
    </div>
  );
}
