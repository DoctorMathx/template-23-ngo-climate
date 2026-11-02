import type { MembershipTier } from "@/lib/types";

export const canopyTiers: MembershipTier[] = [
  {
    id: "seedling",
    name: "Seedling",
    monthly: 5_000,
    treesPerYear: 24,
    tagline: "Your first grove — 2 trees a month.",
    perks: ["2 geotagged trees planted every month", "Quarterly impact postcard (digital)", "Canopy Club member badge", "Early access to Lagos planting days"],
  },
  {
    id: "sapling",
    name: "Sapling",
    monthly: 15_000,
    treesPerYear: 72,
    tagline: "A small forest that grows with you.",
    perks: ["6 trees every month + a mangrove bonus each quarter", "Personal grove map with GPS pins & photos", "Annual printed certificate", "10% off planting expeditions", "Members-only field briefings"],
    featured: true,
  },
  {
    id: "forest",
    name: "Forest",
    monthly: 50_000,
    treesPerYear: 240,
    tagline: "Restore a hectare every two years.",
    perks: ["20 trees every month — about half a hectare a year", "Name a grove in the Hadejia Green Belt", "Free seat on one expedition per year", "Invitation to the Canopy Gala", "Direct line to our field team"],
  },
];
