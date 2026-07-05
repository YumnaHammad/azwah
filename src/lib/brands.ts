export interface BrandInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  featured: boolean;
  highlight?: boolean;
}

export const BRANDS: BrandInfo[] = [
  {
    id: "azwah",
    name: "Azwah",
    tagline: "House compositions · own ingredients",
    description:
      "Our signature line — every bottle composed in-house from rare oud, rose, amber, and sandalwood sourced across continents.",
    featured: true,
  },
  {
    id: "j-perfume",
    name: "J. Perfume",
    tagline: "Official authorized retailer",
    description:
      "J. Perfume — one of the most sought-after luxury fragrance houses. Available exclusively through Azwah online boutique and concierge.",
    featured: true,
    highlight: true,
  },
  {
    id: "maison-lumiere",
    name: "Maison Lumière",
    tagline: "Contemporary men's luxury",
    description: "Bold woody and aromatic profiles for the modern gentleman.",
    featured: false,
  },
  {
    id: "essence-paris",
    name: "Essence Paris",
    tagline: "Feminine floral artistry",
    description: "Romantic florals and golden spices crafted in the French tradition.",
    featured: false,
  },
];
