export const HIGHLIGHTS = [
  {
    id: "online",
    label: "Online Boutique",
    title: "Luxury fragrance, delivered to your door.",
    body: "Order via WhatsApp or email. Insured shipping, gift wrapping, and concierge support on every purchase.",
    cta: "Order Now",
    href: "#contact",
    accent: "gold" as const,
  },
  {
    id: "j-perfume",
    label: "J. Perfume",
    title: "Official authorized retailer.",
    body: "Authentic J. Perfume — Signature Oud, Rose Elixir, and Gold Privé. Certificate included with every bottle.",
    cta: "Shop J. Perfume",
    href: "#collection",
    accent: "oud" as const,
  },
  {
    id: "own-blend",
    label: "Own Atelier",
    title: "Composed with our own ingredients.",
    body: "Assam oud, Grasse rose, Baltic amber — sourced, aged, and blended in-house. Not assembled. Composed.",
    cta: "Explore Ingredients",
    href: "#ingredients",
    accent: "jade" as const,
  },
  {
    id: "collections",
    label: "For Everyone",
    title: "Men · Women · Unisex · Accessories.",
    body: "From bold oud compositions to romantic florals, travel atomizers, and discovery gift sets.",
    cta: "Browse Collection",
    href: "#collection",
    accent: "rose" as const,
  },
] as const;

export const TESTIMONIALS = [
  {
    id: "1",
    quote:
      "Azwah Noir is extraordinary — smoky, refined, and unlike anything on the high street. Delivery was fast and beautifully packaged.",
    name: "Hassan R.",
    detail: "Verified Buyer · Azwah Noir",
  },
  {
    id: "2",
    quote:
      "Finally found authentic J. Perfume locally. The concierge helped me choose between Rose Elixir and Gold Privé — impeccable service.",
    name: "Sana M.",
    detail: "Verified Buyer · J. Rose Elixir",
  },
  {
    id: "3",
    quote:
      "The Discovery Set was the perfect gift. Five house icons in travel size — my wife found her signature scent in one evening.",
    name: "Omar K.",
    detail: "Gift Set Customer",
  },
  {
    id: "4",
    quote:
      "Ordering on WhatsApp was effortless. Azwah Rose arrived in two days, wrapped like a jewel. Will order again.",
    name: "Ayesha T.",
    detail: "Verified Buyer · Azwah Rose",
  },
] as const;

export const STATS = [
  { value: "10+", label: "Signature Scents" },
  { value: "6", label: "Own Ingredients" },
  { value: "J.", label: "Perfume Partner" },
  { value: "2–4", label: "Day Delivery" },
] as const;
