// Central config — change these values (or swap the whole file) and the template rebrands.
// Brand, organisation, donation settings, tree-planting pricing and homepage modules all live here.

export type HomeModule =
  | "hero"
  | "impactTicker"
  | "dashboard"
  | "plantCta"
  | "programmes"
  | "projectMap"
  | "campaigns"
  | "canopyClub"
  | "business"
  | "stories"
  | "expeditions"
  | "transparency"
  | "finalCta";

export const siteConfig = {
  brand: {
    name: "Green Canopy Trust",
    short: "Green Canopy",
    tagline: "Regrowing Nigeria’s living shield — one measurable tree at a time.",
    description:
      "Green Canopy Trust restores degraded land across Nigeria — Great Green Wall reforestation in the Sahel, mangrove restoration in the Niger Delta, clean cookstoves, climate-smart farming and plastic clean-ups in Lagos.",
    domain: "greencanopytrust.org",
    email: "hello@greencanopytrust.org",
    partnershipsEmail: "partners@greencanopytrust.org",
    phone: "+234 813 555 0142",
    whatsapp: "+234 813 555 0142",
    whatsappLink: "https://wa.me/2348135550142",
    address: "14B Kofo Abayomi Street, Victoria Island, Lagos 101241",
    city: "Lagos, Nigeria",
    hours: "Mon–Fri, 9:00–17:00 WAT",
    social: {
      instagram: "https://instagram.com/greencanopytrust",
      twitter: "https://x.com/greencanopyng",
      youtube: "https://youtube.com/@greencanopytrust",
      linkedin: "https://linkedin.com/company/greencanopytrust",
    },
  },

  org: {
    legalName: "Green Canopy Trust (Incorporated Trustees)",
    founded: 2014,
    auditor: "Adeyemi Okafor & Co. (Chartered Accountants)",
  },

  donation: {
    currency: "₦",
    feeRate: 0.015,
    minAmount: 500,
    bank: {
      bankName: "Zenith Bank Plc",
      accountName: "Green Canopy Trust",
      accountNumber: "1014829307",
      usdAccount: "5071829306 (USD domiciliary)",
    },
    ussd: {
      code: "*966*000*1014829307#",
      label: "Zenith Bank USSD",
      hint: "Dial from any Nigerian bank line; replace 000 with your amount, e.g. *966*10000*1014829307#",
    },
    frequencies: [
      { id: "one-time", label: "One-time" },
      { id: "monthly", label: "Monthly" },
      { id: "annual", label: "Annual" },
    ],
    presets: [
      { amount: 5000, impact: "plants 2 Great Green Wall seedlings and protects them through their first dry season" },
      { amount: 12500, impact: "restores 5 mangrove propagules in the Niger Delta, with 2 years of monitoring" },
      { amount: 25000, impact: "funds one clean cookstove for a family in Kano, cutting firewood use by half" },
      { amount: 50000, impact: "trains a smallholder farmer in climate-smart, agroforestry techniques" },
      { amount: 125000, impact: "plants 50 trees — roughly 15 tonnes of CO₂ absorbed over 20 years" },
      { amount: 250000, impact: "sponsors a community plastic clean-up day on a Lagos beach or creek" },
    ],
    receiptNote:
      "Green Canopy Trust is a registered non-profit under Part F of CAMA 2020. Donations by companies may be deductible under Section 25 of the Companies Income Tax Act, subject to FIRS conditions. Keep this receipt for your records.",
  },

  trees: {
    pricePerTree: 2500,
    presets: [10, 50, 100, 500],
    certificatePrefix: "GCT-TREE",
  },

  goals: { year: 2030 },

  home: {
    // Reorder / toggle homepage modules per organisation.
    modules: [
      "hero",
      "impactTicker",
      "dashboard",
      "plantCta",
      "programmes",
      "projectMap",
      "campaigns",
      "canopyClub",
      "business",
      "stories",
      "expeditions",
      "transparency",
      "finalCta",
    ] as HomeModule[],
    heroCta: { label: "Plant trees", href: "/plant" },
    heroCtaSecondary: { label: "See live impact", href: "/impact" },
  },
} as const;
