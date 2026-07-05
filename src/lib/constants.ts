export const COLORS = {
  primary: "#0E5A39",
  primaryDark: "#083D2B",
  gold: "#B89A3E",
  goldSoft: "#D8C66A",
  cream: "#FAFAFA",
} as const;

export const INGREDIENTS = [
  {
    name: "Oud",
    origin: "Assam",
    description:
      "Aged heartwood resin — smoky, sacred, and impossibly deep.",
    icon: "◈",
  },
  {
    name: "Rose",
    origin: "Grasse",
    description:
      "Hand-picked damask petals, distilled at dawn for velvety warmth.",
    icon: "❀",
  },
  {
    name: "Amber",
    origin: "Baltic",
    description:
      "Sun-hardened resin that glows on skin like liquid gold.",
    icon: "✦",
  },
  {
    name: "Sandalwood",
    origin: "Mysore",
    description:
      "Creamy, meditative wood — the silent backbone of every composition.",
    icon: "◎",
  },
  {
    name: "White Musk",
    origin: "Alpine",
    description:
      "Clean, intimate warmth that lingers like a whispered secret.",
    icon: "◇",
  },
  {
    name: "Saffron",
    origin: "Kashmir",
    description:
      "Precious crimson threads — leathery, luminous, unforgettable.",
    icon: "✧",
  },
] as const;

export const PRODUCTS = [
  {
    name: "Azwah Noir",
    subtitle: "Eau de Parfum",
    notes: "Oud · Amber · White Musk",
    description: "Midnight elegance bottled. Bold, smoky, eternal.",
    price: "$285",
  },
  {
    name: "Azwah Rose",
    subtitle: "Eau de Parfum",
    notes: "Rose · Sandalwood · Saffron",
    description: "Velvet petals meet golden spice. Romantic and refined.",
    price: "$265",
  },
  {
    name: "Azwah Gold",
    subtitle: "Parfum Extrême",
    notes: "Oud · Rose · Amber",
    description: "Our rarest expression. Heirloom luxury in every drop.",
    price: "$395",
  },
] as const;

export const CONTACT = {
  address: "47 Avenue Montaigne, Paris 75008",
  phone: "+33 1 42 86 00 00",
  email: "concierge@azwah.com",
  hours: "Mon – Sat · 10:00 – 20:00",
  whatsapp: "https://wa.me/33142860000",
  maps: "https://maps.google.com/?q=47+Avenue+Montaigne+Paris",
} as const;

export const BRAND = {
  tagline: "Where heritage meets the sublime.",
  story:
    "Our fragrances are inspired by timeless traditions, crafted with rare ingredients sourced across continents, and designed to leave unforgettable memories on skin and in spirit.",
  heritage:
    "Founded on the belief that true luxury is felt — not announced — Azwah Enterprises composes scents for those who understand that elegance is eternal.",
} as const;
