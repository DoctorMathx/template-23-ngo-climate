import type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  {
    label: "Our work",
    children: [
      { label: "Programmes", href: "/programmes", description: "Reforestation, mangroves, cookstoves, farming, clean-ups" },
      { label: "Project sites", href: "/projects", description: "Explore our map of restoration sites" },
      { label: "Live impact", href: "/impact", description: "Trees, hectares, CO₂ and progress to 2030" },
      { label: "Stories", href: "/stories", description: "Field notes, science and community voices" },
    ],
  },
  {
    label: "Give",
    children: [
      { label: "Plant trees", href: "/plant", description: "₦2,500 per tree — gift one with a certificate" },
      { label: "Donate", href: "/donate", description: "One-time, monthly or annual" },
      { label: "Campaigns", href: "/campaigns", description: "Live appeals with real-time progress" },
      { label: "Canopy Club", href: "/canopy-club", description: "Monthly membership from ₦5,000" },
    ],
  },
  {
    label: "Partner",
    children: [
      { label: "Business & carbon", href: "/business", description: "Footprint estimator, packages, staff planting days" },
      { label: "Funders & foundations", href: "/partnerships", description: "Grants and institutional partnerships" },
      { label: "Transparency", href: "/transparency", description: "Financials, reports and governance" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Get involved", href: "/get-involved" },
  { label: "About", href: "/about" },
];

export const footerLinks = {
  work: [
    { label: "Programmes", href: "/programmes" },
    { label: "Project sites", href: "/projects" },
    { label: "Live impact", href: "/impact" },
    { label: "Stories", href: "/stories" },
    { label: "Events", href: "/events" },
  ],
  give: [
    { label: "Plant trees", href: "/plant" },
    { label: "Donate", href: "/donate" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "Canopy Club", href: "/canopy-club" },
    { label: "Get involved", href: "/get-involved" },
  ],
  org: [
    { label: "About us", href: "/about" },
    { label: "Business & carbon", href: "/business" },
    { label: "Funders", href: "/partnerships" },
    { label: "Transparency", href: "/transparency" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
};
