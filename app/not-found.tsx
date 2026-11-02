import Link from "next/link";
import { Topo } from "@/components/ui/topo";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-forest on-dark min-h-[70vh] flex items-center">
      <Topo variant="a" className="text-[color:var(--lime)]" opacity={0.14} />
      <div className="container-x relative text-center py-24">
        <div className="font-display text-[7rem] md:text-[10rem] font-semibold leading-none text-lime">404</div>
        <h1 className="mt-2 font-display text-3xl md:text-5xl text-white font-semibold">This trail is overgrown.</h1>
        <p className="lede mt-4 max-w-md mx-auto">The page you’re looking for has moved or never took root.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-lime btn-lg">Back to home</Link>
          <Link href="/projects" className="btn btn-ghost-light btn-lg">Explore project sites</Link>
        </div>
      </div>
    </section>
  );
}
