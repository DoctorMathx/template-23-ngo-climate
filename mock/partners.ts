import type { Package, Partner } from "@/lib/types";

export const funders: Partner[] = [
  { name: "Sahel Futures Fund", type: "Foundation", since: 2019 },
  { name: "Meridian Trust Bank", type: "Corporate", since: 2021 },
  { name: "Okavango Climate Alliance", type: "Foundation", since: 2020 },
  { name: "Delta Blue Carbon Initiative", type: "Multilateral", since: 2023 },
  { name: "Northbridge Telecom", type: "Corporate", since: 2022 },
  { name: "Kanem Energy", type: "Corporate", since: 2024 },
  { name: "EU Green Partnership Facility", type: "Bilateral", since: 2022 },
  { name: "Adire Ventures", type: "Corporate", since: 2025 },
  { name: "Lagos Climate Collective", type: "Coalition", since: 2017 },
  { name: "Harmattan Family Trust", type: "Family office", since: 2018 },
];

export const funderTiers: Package[] = [
  {
    id: "programme-grant",
    name: "Programme grant",
    price: "From ₦50m / $35k",
    blurb: "Restricted funding for one programme or site, with a shared results framework.",
    features: ["Co-designed logframe & KPIs", "Quarterly narrative + financial reports", "Site visits with our field team", "Geotagged tree & survival data access"],
  },
  {
    id: "landscape-partner",
    name: "Landscape partner",
    price: "From ₦250m / $175k",
    blurb: "Multi-year funding for a whole restoration landscape — the most efficient way to fund impact.",
    features: ["3–5 year commitment", "Dedicated landscape lead & MEL officer", "Satellite canopy-change reporting", "Joint learning publications", "Board-level relationship"],
    featured: true,
  },
  {
    id: "core-support",
    name: "Core / unrestricted",
    price: "Any amount",
    blurb: "Flexible funding that lets us respond to droughts, floods and opportunities fast.",
    features: ["Annual audited accounts", "Annual impact briefing", "Recognition in annual report", "Strongest leverage for every naira"],
  },
];

export const businessPackages: Package[] = [
  {
    id: "grove",
    name: "Grove",
    price: "₦2.5m / year",
    priceValue: 2_500_000,
    blurb: "For SMEs starting their climate journey.",
    features: ["1,000 geotagged trees", "Co-branded impact certificate", "Social media impact kit", "Annual impact summary"],
  },
  {
    id: "canopy",
    name: "Canopy",
    price: "₦12.5m / year",
    priceValue: 12_500_000,
    blurb: "Our most popular package for mid-size companies.",
    features: ["5,000 trees in a named site", "One employee planting day (up to 40 staff)", "Co-branded impact dashboard", "Quarterly progress reports with photos", "Logo on partner wall"],
    featured: true,
  },
  {
    id: "landscape",
    name: "Landscape",
    price: "From ₦50m / year",
    priceValue: 50_000_000,
    blurb: "For corporates restoring a whole landscape.",
    features: ["20,000+ trees or 40 ha of mangroves", "Expedition for leadership team", "Satellite monitoring & ESG-ready data", "Co-branded annual impact report", "Featured case study & media"],
  },
];

export const employeeDayFeatures = [
  { title: "Half-day Lagos planting", body: "Lekki mangrove planting or beach clean-up for 20–150 staff. Transport, kit, lunch and safety included.", from: "₦45,000 per person" },
  { title: "Weekend Sahel expedition", body: "Two-night trip to the Hadejia Green Belt for leadership teams. Fully managed logistics and security.", from: "₦285,000 per person" },
  { title: "Office green day", body: "We come to you: climate talk, seedling potting, waste audit and a pledge wall.", from: "₦1.2m per session" },
];
