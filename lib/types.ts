export type NavLink = { label: string; href: string; description?: string };
export type NavItem = { label: string; href?: string; children?: NavLink[] };

export type IconName =
  | "tree"
  | "sprout"
  | "waves"
  | "flame"
  | "wheat"
  | "recycle"
  | "cloud"
  | "map"
  | "users"
  | "leaf"
  | "sun"
  | "droplet";

export type ImpactStat = {
  id: string;
  label: string;
  value: number;
  unit?: string;
  goal: number;
  icon: IconName;
  note: string;
};

export type Programme = {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  image: string;
  summary: string;
  problem: string;
  approach: string[];
  outcomes: { value: string; label: string }[];
  regions: string[];
  costLine: string;
  suggestedAmount: number;
  sdgs: string[];
};

export type ProjectSite = {
  slug: string;
  name: string;
  state: string;
  region: string;
  programme: string; // programme slug
  type: "Sahel reforestation" | "Mangrove restoration" | "Rainforest buffer" | "Agroforestry" | "Urban & coastal";
  lon: number;
  lat: number;
  image: string;
  gallery: string[];
  summary: string;
  story: string[];
  hectares: number;
  treesPlanted: number;
  treesTarget: number;
  survivalRate: number; // %
  species: { name: string; local: string; role: string }[];
  partners: string[];
  raised: number;
  goal: number;
  co2PerTree20y: number; // tonnes CO₂ per tree over 20 years (survival-adjusted)
  treesPerHectare: number;
  jobDaysPer100Trees: number;
  started: number;
  plantingSeason: string;
};

export type CampaignUpdate = { date: string; title: string; body: string };
export type Donor = { name: string; amount: number; when: string; note?: string };

export type Campaign = {
  slug: string;
  title: string;
  kicker: string;
  image: string;
  summary: string;
  story: string[];
  raised: number;
  goal: number;
  donors: number;
  deadline: string;
  programme: string;
  site?: string;
  budget: { label: string; amount: number }[];
  updates: CampaignUpdate[];
  recentDonors: Donor[];
  suggested: number[];
};

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Field notes" | "News" | "Science" | "Community voices" | "Partners";
  date: string;
  readMins: number;
  author: string;
  image: string;
  body: string[];
  quote?: { text: string; by: string };
};

export type EventItem = {
  slug: string;
  title: string;
  kind: "Planting expedition" | "Clean-up" | "Talk" | "Fundraiser" | "Workshop";
  date: string;
  dates?: string[];
  location: string;
  state: string;
  image: string;
  summary: string;
  spotsLeft: number;
  price: number; // 0 = free
  includes?: string[];
  maxGroup?: number;
};

export type MembershipTier = {
  id: string;
  name: string;
  monthly: number;
  treesPerYear: number;
  tagline: string;
  perks: string[];
  featured?: boolean;
};

export type Partner = { name: string; type: string; since: number };

export type Package = {
  id: string;
  name: string;
  price: string;
  priceValue?: number;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export type Person = { name: string; role: string; bio: string; image?: string; initials: string };

export type Faq = { q: string; a: string; group: string };

export type FinanceSlice = { label: string; value: number; color: string; note?: string };
