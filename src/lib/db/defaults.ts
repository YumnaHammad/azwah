import type { SiteContent } from "@/types/cms";
import { BRAND, CONTACT, INGREDIENTS } from "@/lib/constants";
import { BRANDS } from "@/lib/brands";
import { HIGHLIGHTS, TESTIMONIALS, STATS } from "@/lib/content";

const DEFAULT_BANNERS: SiteContent["banners"] = [
  {
    id: "summer-sale-top",
    title: "Summer Sale",
    message: "Up to 20% off select J. Perfume and Azwah house blends this season.",
    cta: "Shop Sale",
    href: "/products",
    position: "top",
    kind: "sale",
    enabled: true,
    dismissible: true,
    accent: "gold",
  },
  {
    id: "new-arrival-center",
    title: "Azwah Rose",
    subtitle: "Women's · Eau de Parfum · Own Blend",
    message:
      "Hand-picked Grasse roses distilled at dawn — saffron, sandalwood, and white musk woven into a velvety floral signature. Our newest house composition, blended in small batches at the atelier.",
    detail: "From $189 · Top: Rose, Saffron · Heart: Oud · Base: Sandalwood, Musk",
    cta: "Shop New Arrival",
    href: "/products/azwah-rose",
    position: "center",
    kind: "new-arrival",
    enabled: true,
    dismissible: true,
    accent: "jade",
  },
  {
    id: "concierge-bottom-left",
    title: "WhatsApp Concierge",
    message: "Order men's, women's, and unisex fragrances in minutes with personal guidance.",
    cta: "Chat Now",
    href: "/#contact",
    position: "bottom-left",
    kind: "announcement",
    enabled: true,
    dismissible: true,
    accent: "jade",
  },
];

export function getDefaultSiteContent(): SiteContent {
  return {
    brand: { ...BRAND },
    contact: { ...CONTACT },
    ingredients: INGREDIENTS.map((i) => ({ ...i })),
    brands: BRANDS.map((b) => ({ ...b })),
    highlights: HIGHLIGHTS.map((h) => ({ ...h })),
    testimonials: TESTIMONIALS.map((t) => ({ ...t })),
    stats: STATS.map((s) => ({ ...s })),
    banners: DEFAULT_BANNERS.map((b) => ({ ...b })),
  };
}
