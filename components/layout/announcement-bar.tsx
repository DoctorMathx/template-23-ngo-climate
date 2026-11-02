import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { campaigns } from "@/mock/campaigns";
import { percent } from "@/lib/utils";

export function AnnouncementBar() {
  const c = campaigns[0];
  return (
    <div className="bg-[color:var(--lime)] text-[color:var(--forest)]">
      <div className="container-x flex items-center justify-center gap-3 py-2 text-[13px] font-medium text-center">
        <span className="hidden sm:inline font-display font-semibold">{percent(c.raised, c.goal)}% funded</span>
        <span className="hidden sm:inline opacity-40">/</span>
        <span>{c.title}: every gift doubled until 31 March.</span>
        <Link href={`/campaigns/${c.slug}`} className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 min-h-[32px]">
          Give now <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
