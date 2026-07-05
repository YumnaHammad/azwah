"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { PRODUCTS as FALLBACK } from "@/lib/default-products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const refresh = () =>
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      });

  return { products, loading, refresh };
}
