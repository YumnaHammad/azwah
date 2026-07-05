export type ProductCategory = "men" | "women" | "unisex" | "accessories";
export type ProductBrand = "Azwah" | "J. Perfume" | "Maison Lumière" | "Essence Paris";

export interface ProductSize {
  ml: number;
  price: number;
  label: string;
}

export interface ProductImage {
  id: string;
  alt: string;
  variant: "bottle" | "detail" | "box" | "lifestyle";
  accent: "noir" | "rose" | "gold" | "oud" | "jade" | "ivory" | "amber";
  /** Uploaded image URL e.g. /uploads/photo.jpg */
  url?: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subtitle: string;
  notes: string;
  notePyramid: {
    top: string[];
    heart: string[];
    base: string[];
  };
  description: string;
  longDescription: string;
  priceFrom: number;
  currency: string;
  sizes: ProductSize[];
  ingredients: string[];
  images: ProductImage[];
  inStock: boolean;
  featured: boolean;
  isOwnBlend?: boolean;
  deliveryDays: string;
  tags: string[];
}

export type CategoryFilter = "all" | ProductCategory;
