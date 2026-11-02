# Green Canopy Trust — FinStore NGO Template 23 (Climate & Conservation)

A premium website template for climate and environmental NGOs: reforestation, mangrove restoration, clean cookstoves,
climate-smart farming and plastic clean-ups. The design language is **"immersive nature, data-forward"**: deep-forest
sections alternating with soft mist, an electric-lime accent used only on dark surfaces, full-bleed nature imagery,
glassy cards, pill buttons, CSS-only rolling counters and topographic contour-line textures.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. No backend: every form
is fully interactive client-side and sends nothing, and every payment is simulated.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Data-driven homepage (modules listed below) |
| `/plant` | Tree-planting calculator: ₦2,500/tree, presets 10/50/100/500 + custom, choice of project site, live CO₂ / hectares / job-days / car-years estimate, optional tree gift with a live printable e-certificate, then a prefilled donate flow |
| `/donate` | One-time/monthly/annual giving, preset amounts with an impact line for each, custom amount, designation (general / campaign / programme / site / Canopy Club), cover-fees, tribute, anonymous giving, donor details, Card / Bank transfer (copyable account + reference) / USSD tabs, sticky summary. Prefill: `?amount=&campaign=&frequency=&programme=&designation=&trees=&site=&giftTo=` |
| `/donate/thank-you` | Receipt (reference, amount, fee, frequency, designation, date, tax note), print, share, next steps, and the gift certificate if trees were gifted |
| `/impact` | Live impact dashboard (trees, hectares, tCO₂, mangroves, cookstoves, farmers) with progress towards 2030 goals, yearly growth chart, survival by site, outcomes, methodology |
| `/projects`, `/projects/[slug]` | Stylised SVG map of Nigeria with project pins; site pages showing species, survival rate, local partners, photos, funding and tree-target progress |
| `/business` | Carbon footprint estimator (employees, office m², diesel generator hours, fleet, flights → tCO₂e, suggested trees and ₦), partnership packages, employee planting days, co-branded reports, enquiry form |
| `/canopy-club` | Seedling / Sapling / Forest monthly membership tiers, comparison table, FAQs |
| `/events` | Volunteer planting expeditions with a registration form (event, date, group size, cost), plus clean-ups, talks and the gala |
| `/campaigns`, `/campaigns/[slug]` | Appeals showing raised vs goal, %, donors and days left; story, budget breakdown, updates timeline, recent donors, donate CTAs that prefill the donate flow |
| `/partnerships` | Funders & foundations: why partner, funding tiers, current funders, how grant funds are managed, proposal form |
| `/transparency` | Income and expense donuts (SVG), "of every ₦1,000", annual reports, governance and registration, board of trustees |
| `/programmes`, `/programmes/[slug]` | The five programmes |
| `/stories`, `/stories/[slug]` | Field notes, news, science and community voices |
| `/get-involved` | Volunteer application, fundraise-for-us form, partner routes |
| `/about` | Mission, vision, values, history timeline, team, board |
| `/contact` | Contact form, address, map placeholder, phone, WhatsApp |
| `/faq` | Grouped accordion: donations, tax and receipts, refunds, trees, volunteering |

The template also includes `opengraph-image`, `twitter-image`, `sitemap.xml`, `robots.txt` and a custom 404 page.

## Home modules

`siteConfig.home.modules` in `lib/site-config.ts` controls the homepage. Reorder the list or remove entries to change it:

`hero` · `impactTicker` · `dashboard` · `plantCta` · `programmes` · `projectMap` · `campaigns` · `canopyClub` ·
`business` · `stories` · `expeditions` · `transparency` · `finalCta`

## Customising

- **Brand, contact details, legal name, bank/USSD details, donation presets, fee rate, tree price, home modules**: `lib/site-config.ts`
- **Impact numbers and 2030 goals**: `mock/impact.ts`
- **Project sites (map coordinates, species, survival, CO₂ per tree, trees per hectare)**: `mock/projects.ts`
- **Programmes**: `mock/programmes.ts`
- **Campaigns (goal, raised, budget, updates, donors)**: `mock/campaigns.ts`
- **Stories**: `mock/stories.ts`
- **Events and expeditions**: `mock/events.ts`
- **Canopy Club tiers**: `mock/membership.ts`
- **Funders, funder tiers, business packages**: `mock/partners.ts`
- **Financials, reports, governance**: `mock/financials.ts`
- **Team, board, history, values**: `mock/team.ts`
- **FAQs**: `mock/faqs.ts` · **Navigation**: `mock/navigation.ts` · **Images**: `mock/images.ts`
- **Design tokens** (forest, mist, lime, moss, earth): `app/globals.css` `:root`
- **Carbon estimator factors**: `app/business/carbon-estimator.tsx` (`F` constant)

Fonts are Space Grotesk (headings) and Inter (body), loaded through `next/font/google`. The only environment variable is
`NEXT_PUBLIC_SITE_URL`, which sets the canonical URL and `metadataBase`.

## Run it

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. For a production build, run `npm run build && npm start`.
