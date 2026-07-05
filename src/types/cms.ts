import type { BrandInfo } from "@/lib/brands";

export interface IngredientItem {
  name: string;
  origin: string;
  description: string;
  icon: string;
}

export interface HighlightItem {
  id: string;
  label: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  accent: "gold" | "oud" | "jade" | "rose";
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  detail: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface BrandContent {
  tagline: string;
  story: string;
  heritage: string;
  mission: string;
  online: string;
  ingredientsStory: string;
}

export interface ContactContent {
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  maps: string;
}

export type BannerPosition = "top" | "center" | "bottom-left" | "bottom-right";

export type BannerKind = "sale" | "new-arrival" | "announcement" | "custom";

export interface SiteBanner {
  id: string;
  title: string;
  message: string;
  cta: string;
  href: string;
  position: BannerPosition;
  kind: BannerKind;
  enabled: boolean;
  dismissible: boolean;
  accent: "gold" | "oud" | "jade" | "rose";
  /** Product / perfume photo for center modal (and optional corner cards) */
  imageUrl?: string;
  /** e.g. Women's · Eau de Parfum · Own Blend */
  subtitle?: string;
  /** e.g. From $189 · Notes: Rose, Saffron, Sandalwood */
  detail?: string;
}

export interface SiteContent {
  brand: BrandContent;
  contact: ContactContent;
  ingredients: IngredientItem[];
  brands: BrandInfo[];
  highlights: HighlightItem[];
  testimonials: TestimonialItem[];
  stats: StatItem[];
  banners: SiteBanner[];
}
