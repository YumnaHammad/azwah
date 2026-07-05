import type { Metadata } from "next";
import AllProductsPage from "./AllProductsPage";

export const metadata: Metadata = {
  title: "All Products | Azwah Enterprises",
  description:
    "Browse the full Azwah collection — men's, women's, and unisex fragrances, J. Perfume, and luxury accessories.",
};

export default function ProductsPage() {
  return <AllProductsPage />;
}
