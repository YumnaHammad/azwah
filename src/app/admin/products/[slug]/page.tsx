"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { useToast } from "@/components/admin/ToastProvider";
import type { Product } from "@/types/product";

export default function EditProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`/api/admin/products/${slug}`)
      .then((r) => r.json())
      .then(setProduct);
  }, [slug]);

  async function onSave(updated: Product) {
    const res = await fetch(`/api/admin/products/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    if (!res.ok) {
      toast(data.error || "Failed to save product", "error");
      throw new Error(data.error || "Failed to save");
    }
    toast(`“${data.name}” updated successfully`, "success");
    if (data.slug !== slug) router.replace(`/admin/products/${data.slug}`);
    setProduct(data);
  }

  async function onDelete() {
    if (!confirm("Delete this product permanently?")) return;
    const res = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    if (!res.ok) {
      toast("Failed to delete product", "error");
      return;
    }
    toast(`“${product?.name ?? "Product"}” deleted`, "info");
    router.push("/admin/products");
  }

  if (!product) {
    return (
      <AdminShell>
        <p className="text-cream/40">Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <h1 className="font-serif text-2xl text-cream mb-8">Edit: {product.name}</h1>
      <ProductForm initial={product} onSave={onSave} onDelete={onDelete} />
    </AdminShell>
  );
}
