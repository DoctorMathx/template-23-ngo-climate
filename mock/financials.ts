import type { FinanceSlice } from "@/lib/types";

export const financialYear = "2025";
export const totalIncome = 1_486_000_000;
export const totalExpenditure = 1_402_000_000;

export const incomeSources: FinanceSlice[] = [
  { label: "Individual donors & Canopy Club", value: 34, color: "#3E7B4F" },
  { label: "Foundations & trusts", value: 28, color: "#0C2A1E" },
  { label: "Corporate partnerships (CSR)", value: 22, color: "#A57C52" },
  { label: "Bilateral & multilateral grants", value: 12, color: "#7FB069" },
  { label: "Events & other income", value: 4, color: "#C7B299" },
];

export const expenses: FinanceSlice[] = [
  { label: "Reforestation & mangroves", value: 52, color: "#3E7B4F", note: "Nurseries, planting, guards, replacement" },
  { label: "Cookstoves & farming", value: 21, color: "#7FB069", note: "Stoves, field schools, inputs" },
  { label: "Monitoring & verification", value: 9, color: "#0C2A1E", note: "Field monitors, satellite data, audits" },
  { label: "Clean-ups & education", value: 5, color: "#A57C52", note: "Lagos clean-ups, eco-clubs" },
  { label: "Fundraising", value: 7, color: "#C7B299" },
  { label: "Administration & governance", value: 6, color: "#8FA39A" },
];

export const perThousand = [
  { label: "Planting, protecting & growing", amount: 730 },
  { label: "Measuring & proving impact", amount: 90 },
  { label: "Community education & clean-ups", amount: 50 },
  { label: "Raising the next ₦1,000", amount: 70 },
  { label: "Keeping the lights on", amount: 60 },
];

export const reports = [
  { title: "Annual Report & Audited Accounts 2025", size: "PDF · 6.4 MB", year: 2025 },
  { title: "Tree Survival & Carbon Methodology 2025", size: "PDF · 1.8 MB", year: 2025 },
  { title: "Annual Report & Audited Accounts 2024", size: "PDF · 5.9 MB", year: 2024 },
  { title: "Independent Verification Statement 2024", size: "PDF · 0.6 MB", year: 2024 },
  { title: "Annual Report & Audited Accounts 2023", size: "PDF · 5.1 MB", year: 2023 },
  { title: "Safeguarding & Free, Prior and Informed Consent Policy", size: "PDF · 0.9 MB", year: 2026 },
];

export const governance = [
  { label: "Registration", value: "Incorporated Trustees with the CAC (2014)" },
  { label: "Regulator filings", value: "SCUML-registered · Annual returns filed with CAC" },
  { label: "External auditor", value: "Adeyemi Okafor & Co. (Chartered Accountants)" },
  { label: "Tree verification", value: "Annual independent sample audit (5% of plots)" },
  { label: "Policies", value: "Safeguarding, anti-fraud, whistleblowing, FPIC, conflict of interest" },
  { label: "Board meetings", value: "Quarterly · Finance & Audit Committee meets monthly" },
];
