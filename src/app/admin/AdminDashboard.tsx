"use client";

import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function AdminDashboard() {
  const { products } = useProducts();
  const { site } = useSiteContent();

  return (
    <div>
      <h1 className="font-serif text-2xl sm:text-3xl text-cream mb-2">Dashboard</h1>
      <p className="text-cream/40 text-sm mb-8">Manage your Azwah website content and products.</p>

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
