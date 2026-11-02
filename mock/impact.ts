import type { ImpactStat } from "@/lib/types";

export const impactAsOf = "30 September 2026";

// Live-style dashboard numbers. Update each quarter from your monitoring system.
export const impactStats: ImpactStat[] = [
  { id: "trees", label: "Trees planted", value: 2_418_560, goal: 10_000_000, icon: "tree", note: "Geotagged & monitored at 6, 12 and 24 months" },
  { id: "hectares", label: "Hectares restored", value: 4_612, unit: "ha", goal: 15_000, icon: "map", note: "Degraded drylands, creeks and forest edges" },
  { id: "co2", label: "Tonnes CO₂ (20-yr projected)", value: 612_400, unit: "tCO₂", goal: 2_000_000, icon: "cloud", note: "Survival-adjusted, verified by third-party sampling" },
  { id: "mangroves", label: "Mangroves planted", value: 661_660, goal: 2_000_000, icon: "waves", note: "Bayelsa, Rivers and Lagos coastline" },
  { id: "cookstoves", label: "Cookstoves distributed", value: 18_940, goal: 60_000, icon: "flame", note: "Kano, Kaduna and Jigawa households" },
  { id: "farmers", label: "Farmers trained", value: 12_480, goal: 40_000, icon: "wheat", note: "54% women, through farmer field schools" },
];

export const extraStats = [
  { label: "Plastic removed", value: "412 t" },
  { label: "Volunteers mobilised", value: "9,600" },
  { label: "Communities partnered", value: "214" },
  { label: "Average tree survival", value: "78%" },
];

export const outcomes = [
  { title: "Farm yields up 38%", body: "Across 3,000 agroforestry farms in Kaduna and Niger, measured against control plots over three seasons." },
  { title: "Fish catch up 30%", body: "In restored Brass creeks, based on co-op landing records versus 2021 baselines." },
  { title: "Firewood use halved", body: "Households using our stoves burn 52% less wood — and women save 9 hours a week on collection." },
  { title: "1,340 green jobs", body: "Nursery workers, guardians, stove artisans and monitors — 61% women and youth." },
];

export const yearlyTrees = [
  { year: "2019", value: 142_000 },
  { year: "2020", value: 228_000 },
  { year: "2021", value: 301_400 },
  { year: "2022", value: 366_900 },
  { year: "2023", value: 412_300 },
  { year: "2024", value: 448_960 },
  { year: "2025", value: 519_000 },
];

export const methodology = [
  "Trees counted only after planting — not seedlings raised. Each planting batch is geotagged and photographed.",
  "Survival audits at 6, 12 and 24 months by independent field monitors; dead trees replaced and not double-counted.",
  "CO₂ figures use species- and site-specific growth curves over 20 years, multiplied by measured survival rates.",
  "Annual third-party verification by an accredited auditor; satellite imagery (Sentinel-2) used for canopy change.",
];
