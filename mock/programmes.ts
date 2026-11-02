import type { Programme } from "@/lib/types";
import { IMG } from "./images";

export const programmes: Programme[] = [
  {
    slug: "great-green-wall",
    name: "Great Green Wall Reforestation",
    short: "Great Green Wall",
    icon: "tree",
    image: IMG.savannaAcacia,
    summary:
      "Community-run nurseries and drought-hardy tree belts that halt desert creep across Sokoto, Jigawa and Yobe — Nigeria’s stretch of the pan-African Great Green Wall.",
    problem:
      "Nigeria loses an estimated 350,000 hectares of land to desertification every year. In the far north, dunes advance on farmland and villages, wells dry up and young people migrate south.",
    approach: [
      "Women-led nurseries raise acacia, baobab, neem, moringa and doum palm seedlings from locally collected seed.",
      "Farmer-Managed Natural Regeneration (FMNR) revives living stumps already in the soil — the cheapest tree you can grow.",
      "Half-moon water-harvesting pits and zai holes capture scarce rain so seedlings survive the first dry season.",
      "Every tree is geotagged and monitored at 6, 12 and 24 months; dead seedlings are replaced at no extra cost.",
    ],
    outcomes: [
      { value: "1.62m", label: "trees in the ground" },
      { value: "78%", label: "24-month survival" },
      { value: "2,840 ha", label: "degraded land restored" },
    ],
    regions: ["Sokoto", "Jigawa", "Yobe"],
    costLine: "₦2,500 plants and protects one tree for two years",
    suggestedAmount: 25000,
    sdgs: ["SDG 13 Climate action", "SDG 15 Life on land", "SDG 1 No poverty"],
  },
  {
    slug: "mangrove-restoration",
    name: "Niger Delta Mangrove Restoration",
    short: "Mangroves",
    icon: "waves",
    image: IMG.forestRiver,
    summary:
      "Replanting red and white mangroves in oil-impacted creeks of Bayelsa and Rivers State with fishing communities who depend on them.",
    problem:
      "Decades of oil spills, dredging and over-harvesting have degraded vast areas of Niger Delta mangroves — Africa’s largest — destroying fish nurseries and coastal storm protection.",
    approach: [
      "Community ‘mangrove guardians’ collect propagules and run floating nurseries in the creeks.",
      "Planting follows hydrology surveys so seedlings sit at the right tidal elevation.",
      "Fisherfolk co-ops receive stipends for planting and monitoring, plus training in sustainable periwinkle and crab harvesting.",
      "Blue-carbon sampling with the University of Port Harcourt measures soil carbon each year.",
    ],
    outcomes: [
      { value: "612k", label: "mangrove propagules planted" },
      { value: "71%", label: "survival after 18 months" },
      { value: "4.3×", label: "carbon per ha vs. dryland forest" },
    ],
    regions: ["Bayelsa", "Rivers", "Lagos"],
    costLine: "₦12,500 restores 5 mangroves with 2 years of monitoring",
    suggestedAmount: 12500,
    sdgs: ["SDG 14 Life below water", "SDG 13 Climate action", "SDG 8 Decent work"],
  },
  {
    slug: "clean-cookstoves",
    name: "Clean Cookstoves for Families",
    short: "Cookstoves",
    icon: "flame",
    image: IMG.campfire,
    summary:
      "Efficient, locally fabricated cookstoves that halve firewood use, cut indoor smoke and take pressure off the last trees around northern towns.",
    problem:
      "Over 70% of Nigerian households cook with firewood or charcoal. Household smoke causes tens of thousands of deaths a year, and fuelwood collection strips woodlands bare.",
    approach: [
      "Stoves are built by trained artisans in Kano and Kaduna, creating local jobs.",
      "Families pay a subsidised ₦4,000 so stoves are valued and used; donors cover the rest.",
      "Community health volunteers run cooking demos and follow-up visits at 1 and 6 months.",
      "Stove usage is monitored with temperature sensors on a sample of households.",
    ],
    outcomes: [
      { value: "18,940", label: "stoves distributed" },
      { value: "52%", label: "less firewood per household" },
      { value: "2.1 t", label: "CO₂ avoided per stove / year" },
    ],
    regions: ["Kano", "Kaduna", "Jigawa"],
    costLine: "₦25,000 provides one stove for a family of six",
    suggestedAmount: 25000,
    sdgs: ["SDG 7 Clean energy", "SDG 3 Good health", "SDG 5 Gender equality"],
  },
  {
    slug: "climate-smart-farming",
    name: "Climate-Smart Farming",
    short: "Climate-smart farming",
    icon: "wheat",
    image: IMG.farmersField,
    summary:
      "Farmer field schools teaching agroforestry, drought-tolerant seed, composting and water harvesting so smallholders grow more on less land.",
    problem:
      "Erratic rains and degraded soils are pushing yields down while farmers clear more forest to compensate — a cycle that deepens both poverty and emissions.",
    approach: [
      "12-week field schools on demonstration plots run by lead farmers, at least 50% women.",
      "Fruit and fertiliser trees (moringa, mango, gliricidia) are intercropped with grains.",
      "Links to off-takers and village savings groups so farmers can invest in their land.",
      "Seasonal SMS weather and planting advisories in Hausa, Yoruba and Pidgin.",
    ],
    outcomes: [
      { value: "12,480", label: "farmers trained" },
      { value: "+38%", label: "average yield increase" },
      { value: "54%", label: "of participants are women" },
    ],
    regions: ["Kaduna", "Niger", "Plateau", "Ogun"],
    costLine: "₦50,000 trains one farmer for a full season",
    suggestedAmount: 50000,
    sdgs: ["SDG 2 Zero hunger", "SDG 13 Climate action", "SDG 15 Life on land"],
  },
  {
    slug: "plastic-free-lagos",
    name: "Plastic-Free Lagos",
    short: "Plastic clean-ups",
    icon: "recycle",
    image: IMG.beachCleanupTeam,
    summary:
      "Monthly beach, lagoon and creek clean-ups with schools and companies — plus recycling partnerships that turn collected plastic into income.",
    problem:
      "Lagos generates over 870,000 tonnes of plastic waste a year. Much of it blocks drains, worsens flooding and ends up in the lagoon and Atlantic.",
    approach: [
      "Monthly community clean-ups at Elegushi, Takwa Bay, Makoko and Lekki lagoon fronts.",
      "Waste is audited by brand and type — data we share with regulators and producers.",
      "Collected PET is sold to licensed recyclers; proceeds fund school eco-clubs.",
      "Mangrove buffer planting along cleaned shorelines in Lekki.",
    ],
    outcomes: [
      { value: "412 t", label: "plastic removed" },
      { value: "9,600", label: "volunteers mobilised" },
      { value: "64", label: "school eco-clubs" },
    ],
    regions: ["Lagos"],
    costLine: "₦250,000 runs a full clean-up day for 120 volunteers",
    suggestedAmount: 10000,
    sdgs: ["SDG 11 Sustainable cities", "SDG 12 Responsible consumption", "SDG 14 Life below water"],
  },
];

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);
