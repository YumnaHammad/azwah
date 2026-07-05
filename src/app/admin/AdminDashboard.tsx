"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useSiteContent } from "@/hooks/useSiteContent";

interface StorageStatus {
  ready: boolean;
  message: string;
  onVercel: boolean;
}

export default function AdminDashboard() {
  const { products } = useProducts();
  const { site } = useSiteContent();
  const [storage, setStorage] = useState<StorageStatus | null>(null);

  useEffect(() => {
    fetch("/api/admin/storage")
      .then((r) => r.json())
      .then(setStorage)
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl sm:text-3xl text-cream mb-2">Dashboard</h1>
      <p className="text-cream/40 text-sm mb-8">Manage your Azwah website content and products.</p>

      {storage && !storage.ready && (
        <div className="mb-8 p-4 rounded-xl border border-amber-500/40 bg-amber-950/30 text-amber-100/90 text-sm">
          <p className="font-medium mb-1">Storage not configured for production</p>
          <p className="text-amber-100/70 text-xs leading-relaxed">{storage.message}</p>
          <p className="text-amber-100/50 text-xs mt-2">
            Vercel → Project → Settings → Environment Variables: add{" "}
            <code className="text-amber-200">UPSTASH_REDIS_REST_URL</code>,{" "}
            <code className="text-amber-200">UPSTASH_REDIS_REST_TOKEN</code>, and{" "}
            <code className="text-amber-200">BLOB_READ_WRITE_TOKEN</code> (from Upstash Redis + Blob stores).
          </p>
        </div>
      )}

      {storage?.ready && storage.onVercel && (
        <div className="mb-8 p-3 rounded-xl border border-primary/30 bg-primary/10 text-cream/60 text-xs">
          Production storage connected — CRUD changes will persist.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Products", value: products.length },
          { label: "Banners", value: site.banners?.length ?? 0 },
          { label: "Testimonials", value: site.testimonials.length },
          { label: "Ingredients", value: site.ingredients.length },
        ].map((s) => (
          <div key={s.label} className="glass-panel rounded-xl p-5 text-center">
            <p className="font-serif text-3xl text-gold">{s.value}</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-cream/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/products" className="luxury-card rounded-xl p-6 hover:border-gold/35 transition-colors block">
          <h2 className="font-serif text-xl text-cream mb-2">Products</h2>
          <p className="text-cream/40 text-sm">Add, edit, delete products and upload images.</p>
        </Link>
        <Link href="/admin/banners" className="luxury-card rounded-xl p-6 hover:border-gold/35 transition-colors block">
          <h2 className="font-serif text-xl text-cream mb-2">Promo Banners</h2>
          <p className="text-cream/40 text-sm">Sales, new arrivals — top bar, modal, corner cards.</p>
        </Link>
        <Link href="/admin/content" className="luxury-card rounded-xl p-6 hover:border-gold/35 transition-colors block">
          <h2 className="font-serif text-xl text-cream mb-2">Site Content</h2>
          <p className="text-cream/40 text-sm">Brand, contact, ingredients, testimonials, promos.</p>
        </Link>
      </div>
    </div>
  );
}
