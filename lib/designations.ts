import { programmes } from "@/mock/programmes";
import { campaigns } from "@/mock/campaigns";
import { projects } from "@/mock/projects";
import { canopyTiers } from "@/mock/membership";

export type DesignationGroup = { group: string; options: { value: string; label: string }[] };

export const designationGroups: DesignationGroup[] = [
  { group: "Where it’s needed most", options: [{ value: "general", label: "General fund — where it’s needed most" }] },
  { group: "Campaigns", options: campaigns.map((c) => ({ value: `campaign:${c.slug}`, label: c.title })) },
  { group: "Programmes", options: programmes.map((p) => ({ value: `programme:${p.slug}`, label: p.name })) },
  { group: "Tree planting — project site", options: projects.map((p) => ({ value: `site:${p.slug}`, label: `${p.name} (${p.state})` })) },
  { group: "Canopy Club membership", options: canopyTiers.map((t) => ({ value: `canopy:${t.id}`, label: `Canopy Club — ${t.name}` })) },
];

const ALL = designationGroups.flatMap((g) => g.options);

export function designationLabel(value: string | null | undefined) {
  return ALL.find((o) => o.value === value)?.label ?? "General fund — where it’s needed most";
}

export function isValidDesignation(value: string | null | undefined): value is string {
  return !!value && ALL.some((o) => o.value === value);
}
