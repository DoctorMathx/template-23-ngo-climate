import type { Faq } from "@/lib/types";

export const faqs: Faq[] = [
  { group: "Donations", q: "Is my donation secure?", a: "Yes. Card payments are processed by a PCI-DSS certified payment provider — we never see or store your card number. Bank transfers go directly to our Zenith Bank account in the name of Green Canopy Trust." },
  { group: "Donations", q: "Can I choose where my money goes?", a: "Yes. On the donate page you can give to the general fund (where it’s needed most), a specific programme, a campaign or a planting site. Restricted gifts are only spent on that purpose." },
  { group: "Donations", q: "How do I cancel or change a monthly gift?", a: "Email hello@greencanopytrust.org or WhatsApp us with your donor reference and we’ll update or cancel within one working day. No questions asked." },
  { group: "Donations", q: "What is the processing fee option?", a: "Payment providers charge us about 1.5% per transaction. Ticking ‘cover processing fees’ adds this to your gift so 100% of your intended amount reaches the field." },
  { group: "Tax & receipts", q: "Will I get a receipt?", a: "Yes — instantly on screen and by email. Monthly donors also receive an annual statement each January." },
  { group: "Tax & receipts", q: "Are donations tax-deductible in Nigeria?", a: "We are registered as Incorporated Trustees with the Corporate Affairs Commission. Companies may be able to deduct donations under Section 25 of the Companies Income Tax Act subject to FIRS conditions. Please consult your tax adviser." },
  { group: "Tax & receipts", q: "Can I give from outside Nigeria?", a: "Yes — by international card or to our USD domiciliary account. Contact us for wire instructions." },
  { group: "Refunds", q: "I made a mistake with my donation. Can I get a refund?", a: "Yes. Contact us within 30 days with your reference and we will refund in full to the original payment method within 10 working days." },
  { group: "Trees & impact", q: "How do I know my tree was actually planted?", a: "Each planting batch is geotagged and photographed. Canopy Club and business partners get GPS pins; individual donors receive a site update after the planting season." },
  { group: "Trees & impact", q: "Why ₦2,500 per tree?", a: "It covers the seedling, water-harvesting pit, planting labour, community guards and two years of monitoring and replacement — not just the sapling." },
  { group: "Trees & impact", q: "Can my company offset its emissions with trees?", a: "Trees are a powerful contribution, but we discourage using them as a substitute for cutting emissions. Our business team will help you frame tree-planting honestly as ‘beyond value chain’ climate contribution." },
  { group: "Volunteering", q: "Do I need experience to join a planting expedition?", a: "No. Our field teams train everyone on site. You should be reasonably fit and comfortable outdoors in hot conditions." },
];
