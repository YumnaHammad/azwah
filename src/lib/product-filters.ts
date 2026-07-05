import type { CategoryFilter } from "@/types/product";

export const PRODUCT_FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "unisex", label: "Unisex" },
  { id: "accessories", label: "Accessories" },
];

export function isValidCategory(value: string | null): value is CategoryFilter {
  return (
    value === "all" ||
    value === "men" ||
    value === "women" ||
    value === "unisex" ||
    value === "accessories"
  );
}
