import Image from "next/image";
import { Topo } from "./topo";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  children,
  align = "left",
  compact,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  image?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-forest on-dark">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 img-shade-side" />
        </>
      )}
      <Topo variant="b" className="text-[color:var(--lime)]" opacity={0.12} />
      <div className={cn("container-x relative", compact ? "pt-16 pb-14 md:pt-20 md:pb-16" : "pt-20 pb-20 md:pt-28 md:pb-24")}>
        <div className={cn("max-w-3xl fade-up", align === "center" && "mx-auto text-center")}>
          <div className="eyebrow mb-5">{eyebrow}</div>
          <h1 className="font-display text-white text-[2.5rem] leading-[1.02] md:text-6xl lg:text-7xl font-semibold">{title}</h1>
          {lede && <p className={cn("lede mt-6 text-lg md:text-xl max-w-2xl", align === "center" && "mx-auto")}>{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
