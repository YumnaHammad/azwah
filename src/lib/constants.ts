export const COLORS = {
  primary: "#0E5A39",
  primaryDark: "#083D2B",
  gold: "#B89A3E",
  goldSoft: "#D8C66A",
  cream: "#FAFAFA",
} as const;

export const SCROLL_SCENES = {
  hero: { start: 0, end: 0.2 },
  closeUp: { start: 0.2, end: 0.4 },
  capOpen: { start: 0.4, end: 0.6 },
  spray: { start: 0.6, end: 0.8 },
  transform: { start: 0.8, end: 1.0 },
} as const;

export const INGREDIENTS = [
  {
    name: "Oud",
    description: "Rare resinous heartwood, deep and mystical.",
    icon: "🌲",
  },
  {
    name: "Amber",
    description: "Warm golden resin, sensual and enveloping.",
    icon: "✦",
  },
  {
    name: "Rose",
    description: "Damask petals, velvety and romantic.",
    icon: "❀",
  },
  {
    name: "Sandalwood",
    description: "Creamy wood notes, smooth and meditative.",
    icon: "◈",
  },
  {
    name: "Musk",
    description: "Soft animalic warmth, intimate and lasting.",
    icon: "◎",
  },
] as const;

export const PRODUCTS = [
  {
    name: "Azwah Noir",
    subtitle: "Eau de Parfum",
    notes: "Oud · Amber · Musk",
    price: "$285",
  },
  {
    name: "Azwah Rose",
    subtitle: "Eau de Parfum",
    notes: "Rose · Sandalwood · Amber",
    price: "$265",
  },
  {
    name: "Azwah Gold",
    subtitle: "Parfum Extrême",
    notes: "Oud · Rose · Saffron",
    price: "$395",
  },
] as const;

export const FEATURES = [
  {
    title: "Artisan Crafted",
    description: "Each bottle hand-finished by master perfumers in Grasse.",
    icon: "✧",
  },
  {
    title: "Rare Ingredients",
    description: "Sourced from the finest regions across the world.",
    icon: "◆",
  },
  {
    title: "Lasting Presence",
    description: "Formulations designed to evolve gracefully on skin.",
    icon: "∞",
  },
  {
    title: "Timeless Design",
    description: "Elegant vessels that become heirlooms.",
    icon: "◇",
  },
] as const;

export const HEADLINES = [
  "Crafted.",
  "Pure.",
  "Luxury.",
  "Timeless.",
  "Essence.",
] as const;
