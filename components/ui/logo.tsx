import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#C6F432" />
      <path d="M20 8c6 4 8.5 9 8.5 13.5A8.5 8.5 0 0 1 20 30a8.5 8.5 0 0 1-8.5-8.5C11.5 17 14 12 20 8Z" fill="#0C2A1E" />
      <path d="M20 14v19M20 21l-4-3.2M20 25.5l4.4-3.6" stroke="#C6F432" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 min-h-[44px]" aria-label={`${siteConfig.brand.name} — home`}>
      <LogoMark />
      <span className={`font-display font-semibold text-[17px] leading-none tracking-tight ${dark ? "text-white" : "text-[color:var(--forest)]"}`}>
        Green Canopy
        <span className={`block text-[10px] font-medium tracking-[0.28em] uppercase mt-1 ${dark ? "text-lime" : "text-moss"}`}>Trust</span>
      </span>
    </Link>
  );
}
