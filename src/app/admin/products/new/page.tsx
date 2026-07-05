"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { useToast } from "@/components/admin/ToastProvider";
import type { Product } from "@/types/product";

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();

  async function onSave(product: Product) {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    if (!res.ok) {
      toast(data.error || "Failed to create product", "error");
      throw new Error(data.error || "Failed to create");
    }
    toast(`“${data.name}” created successfully`, "success");
    router.push(`/admin/products/${data.slug}`);
  }

  return (
    <AdminShell>
      <h1 className="font-serif text-2xl text-cream mb-8">Add Product</h1>
      <ProductForm onSave={onSave} />
    </AdminShell>
  );
}
