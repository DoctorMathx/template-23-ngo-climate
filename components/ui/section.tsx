import { cn } from "@/lib/utils";
import { Topo } from "./topo";

export function Section({
  children,
  className,
  tone = "mist",
  pad = "lg",
  id,
  topo,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "mist" | "white" | "forest" | "mist-2";
  pad?: "sm" | "md" | "lg";
  id?: string;
  topo?: "a" | "b";
}) {
  const tones = {
    mist: "bg-mist",
    "mist-2": "bg-mist-2",
    white: "bg-white",
    forest: "bg-forest on-dark",
  } as const;
  const pads = { sm: "py-14", md: "py-16 md:py-20", lg: "py-16 md:py-28" } as const;
  return (
    <section id={id} className={cn("relative overflow-hidden", tones[tone], pads[pad], className)}>
      {topo && (
        <Topo
          variant={topo}
          className={tone === "forest" ? "text-[color:var(--lime)]" : "text-[color:var(--moss)]"}
          opacity={tone === "forest" ? 0.1 : 0.16}
        />
      )}
      <div className="container-x relative">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  action,
  dark,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  dark?: boolean;
}) {
  const center = align === "center";
  return (
    <div className={cn("mb-12 md:mb-14 flex flex-col gap-4", center && "items-center text-center max-w-3xl mx-auto")}>
      <div className={cn("w-full flex flex-col md:flex-row md:items-end justify-between gap-6", center && "md:flex-col md:items-center")}>
        <div className={cn(center && "mx-auto")}>
          {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
          <h2
            className={cn(
              "font-display text-[2rem] md:text-5xl font-semibold leading-[1.05] max-w-3xl",
              dark ? "text-white" : "text-[color:var(--forest)]"
            )}
          >
            {title}
          </h2>
          {lede && <p className={cn("lede mt-4 max-w-2xl", center && "mx-auto")}>{lede}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
