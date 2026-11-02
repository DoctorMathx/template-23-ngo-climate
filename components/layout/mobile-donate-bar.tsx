"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Sprout } from "lucide-react";

export function MobileDonateBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/donate")) return null;
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 p-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-gradient-to-t from-[color:var(--forest)]/40 to-transparent">
      <div className="flex gap-2 p-1.5 rounded-full bg-forest border border-dark shadow-[0_20px_40px_-12px_rgba(0,0,0,.6)]">
        <Link href="/plant" className="btn btn-ghost-light flex-1 !border-transparent">
          <Sprout className="w-4 h-4" strokeWidth={1.5} /> Plant
        </Link>
        <Link href="/donate" className="btn btn-lime flex-[1.4]">
          <Heart className="w-4 h-4" strokeWidth={1.75} /> Donate
        </Link>
      </div>
    </div>
  );
}
