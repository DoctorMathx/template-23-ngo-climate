"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Sprout, X } from "lucide-react";
import { navItems } from "@/mock/navigation";
import type { NavItem } from "@/lib/types";
import { Logo } from "@/components/ui/logo";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus on route change (state-derived, no effect needed)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpen(null);
  }

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 on-dark transition-all ${
        scrolled ? "bg-[color:var(--forest)]/92 backdrop-blur-md shadow-[0_10px_30px_-20px_rgba(0,0,0,.6)]" : "bg-[color:var(--forest)]"
      }`}
    >
      <div className="container-x">
        <div className="flex items-center justify-between h-[72px] gap-3 sm:gap-6">
          <div className="shrink-0 min-w-0">
            <Logo />
          </div>
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Main">
            {navItems.map((item) => (
              <DesktopItem key={item.label} item={item} open={open === item.label} setOpen={setOpen} />
            ))}
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/plant" className="hidden md:inline-flex lg:hidden xl:inline-flex btn btn-ghost-light btn-sm">
              <Sprout className="w-4 h-4" strokeWidth={1.5} /> Plant trees
            </Link>
            <Link href="/donate" className="hidden sm:inline-flex btn btn-lime btn-sm">Donate</Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white border border-white/20"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[88%] max-w-[380px] bg-forest flex flex-col">
            <div className="flex items-center justify-between px-5 h-[72px] border-b border-dark">
              <Logo />
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu" className="w-11 h-11 rounded-full flex items-center justify-center text-white border border-white/20">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              {navItems.map((item) => (
                <MobileItem key={item.label} item={item} />
              ))}
            </nav>
            <div className="p-5 border-t border-dark grid grid-cols-2 gap-2">
              <Link href="/plant" className="btn btn-ghost-light">Plant trees</Link>
              <Link href="/donate" className="btn btn-lime">Donate</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function DesktopItem({ item, open, setOpen }: { item: NavItem; open: boolean; setOpen: (v: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  if (!item.children) {
    return (
      <Link href={item.href ?? "#"} className="px-3 xl:px-3.5 py-2.5 rounded-full text-[14.5px] font-medium text-on-dark-muted hover:text-white hover:bg-white/5 transition-colors">
        {item.label}
      </Link>
    );
  }
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(item.label)}
      onMouseLeave={() => setOpen(null)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(null);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(open ? null : item.label)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
        className="flex items-center gap-1 px-3 xl:px-3.5 py-2.5 rounded-full text-[14.5px] font-medium text-on-dark-muted hover:text-white hover:bg-white/5 transition-colors"
      >
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
          <div className="bg-forest-2 border border-dark rounded-3xl p-2.5 min-w-[320px] shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]">
            {item.children.map((c) => (
              <Link key={c.href} href={c.href} onClick={() => setOpen(null)} className="block px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="text-[14.5px] font-semibold text-white">{c.label}</div>
                {c.description && <div className="text-[13px] text-on-dark-muted mt-0.5">{c.description}</div>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileItem({ item }: { item: NavItem }) {
  const [ex, setEx] = useState(false);
  if (!item.children)
    return (
      <Link href={item.href ?? "#"} className="flex items-center min-h-[48px] px-3 text-[16px] font-medium text-white rounded-2xl hover:bg-white/5">
        {item.label}
      </Link>
    );
  return (
    <div>
      <button type="button" aria-expanded={ex} onClick={() => setEx(!ex)} className="w-full flex items-center justify-between min-h-[48px] px-3 text-[16px] font-medium text-white rounded-2xl hover:bg-white/5">
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${ex ? "rotate-180" : ""}`} />
      </button>
      {ex && (
        <div className="pl-3 pb-2">
          {item.children.map((c) => (
            <Link key={c.href} href={c.href} className="flex items-center min-h-[44px] px-3 text-[15px] text-on-dark-muted hover:text-white">
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
