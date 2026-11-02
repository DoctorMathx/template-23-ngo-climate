import { Cloud, Droplet, Flame, Leaf, Map, Recycle, Sprout, Sun, TreePine, Users, Waves, Wheat } from "lucide-react";
import type { IconName } from "@/lib/types";

const MAP = {
  tree: TreePine,
  sprout: Sprout,
  waves: Waves,
  flame: Flame,
  wheat: Wheat,
  recycle: Recycle,
  cloud: Cloud,
  map: Map,
  users: Users,
  leaf: Leaf,
  sun: Sun,
  droplet: Droplet,
} as const;

// Thin line icons throughout — strokeWidth 1.5 is part of the visual language.
export function Icon({ name, className = "w-5 h-5" }: { name: IconName; className?: string }) {
  const C = MAP[name];
  return <C className={className} strokeWidth={1.5} aria-hidden="true" />;
}
