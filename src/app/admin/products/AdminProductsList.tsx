"use client";

import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/format-price";

export default function AdminProductsList() {
  const { products, loading } = useProducts();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-cream">Products</h1>
          <p className="text-cream/40 text-sm mt-1">{products.length} items in catalogue</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gold/15 border border-gold/35 text-[10px] tracking-[0.25em] uppercase text-cream hover:bg-gold/25"
        >
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p className="text-cream/40">Loading…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gold/15 text-[10px] tracking-[0.2em] uppercase text-cream/40">
                <th className="py-3 pr-4">Product</th>
                <th className="py-3 pr-4 hidden sm:table-cell">Brand</th>
                <th className="py-3 pr-4 hidden md:table-cell">Category</th>
                <th className="py-3 pr-4">Price</th>
                <th className="py-3 pr-4">Stock</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-b border-gold/5 hover:bg-white/[0.02]">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      {p.images[0]?.url ? (
                        <img src={p.images[0].url} alt="" className="w-10 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-10 h-12 bg-white/5 rounded" />
                      )}
                      <div>
                        <p className="text-cream font-medium">{p.name}</p>
                        <p className="text-cream/30 text-xs">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4 hidden sm:table-cell text-cream/50">{p.brand}</td>
                  <td className="py-4 pr-4 hidden md:table-cell text-cream/50 capitalize">{p.category}</td>
                  <td className="py-4 pr-4 text-gold">{formatPrice(p.priceFrom, p.currency)}</td>
                  <td className="py-4 pr-4">
                    <span className={`text-[10px] uppercase ${p.inStock ? "text-primary/80" : "text-cream/30"}`}>
                      {p.inStock ? "In stock" : "Out"}
                    </span>
                  </td>
                  <td className="py-4">
                    <Link href={`/admin/products/${p.slug}`} className="text-[10px] tracking-[0.15em] uppercase text-gold/70 hover:text-gold-soft">
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
