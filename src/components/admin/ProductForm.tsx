"use client";

import { useState } from "react";
import type { Product, ProductImage } from "@/types/product";
import {
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
  adminTextareaClass,
} from "@/components/admin/admin-form-classes";

const ACCENTS = ["noir", "rose", "gold", "oud", "jade", "ivory", "amber"] as const;
const VARIANTS = ["bottle", "detail", "box", "lifestyle"] as const;
const CATEGORIES = ["men", "women", "unisex", "accessories"] as const;

const emptyProduct = (): Product => ({
  slug: "",
  name: "",
  brand: "Azwah",
  category: "unisex",
  subtitle: "Eau de Parfum",
  notes: "",
  notePyramid: { top: [], heart: [], base: [] },
  description: "",
  longDescription: "",
  priceFrom: 0,
  currency: "USD",
  sizes: [{ ml: 50, price: 0, label: "50 ml" }],
  ingredients: [],
  images: [{ id: "front", alt: "", variant: "bottle", accent: "gold" }],
  inStock: true,
  featured: false,
  deliveryDays: "2–4 business days",
  tags: [],
});

interface ProductFormProps {
  initial?: Product;
  onSave: (product: Product) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export function ProductForm({ initial, onSave, onDelete }: ProductFormProps) {
  const [product, setProduct] = useState<Product>(initial ?? emptyProduct());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setProduct((p) => ({ ...p, [key]: value }));
  }

  async function uploadImage(index: number, file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const images = [...product.images];
      images[index] = { ...images[index], url: data.url, alt: images[index].alt || file.name };
      update("images", images);
    } catch (e) {
      setError(String(e));
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave(product);
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  }

  const inputClass = adminInputClass;
  const labelClass = adminLabelClass;
  const selectClass = adminSelectClass;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      {error && <p className="text-red-300 text-sm">{error}</p>}

      <section className="glass-panel rounded-xl p-6 space-y-4">
        <h2 className="font-serif text-xl text-cream">Basic Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Name</label>
            <input className={inputClass} value={product.name} onChange={(e) => update("name", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input className={inputClass} value={product.slug} onChange={(e) => update("slug", e.target.value)} placeholder="auto-from-name" />
          </div>
          <div>
            <label className={labelClass}>Brand</label>
            <input className={inputClass} value={product.brand} onChange={(e) => update("brand", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select className={selectClass} value={product.category} onChange={(e) => update("category", e.target.value as Product["category"])}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Subtitle</label>
            <input className={inputClass} value={product.subtitle} onChange={(e) => update("subtitle", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Notes (short)</label>
            <input className={inputClass} value={product.notes} onChange={(e) => update("notes", e.target.value)} />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-cream/60">
            <input type="checkbox" checked={product.inStock} onChange={(e) => update("inStock", e.target.checked)} />
            In Stock
          </label>
          <label className="flex items-center gap-2 text-sm text-cream/60">
            <input type="checkbox" checked={product.featured} onChange={(e) => update("featured", e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-cream/60">
            <input type="checkbox" checked={!!product.isOwnBlend} onChange={(e) => update("isOwnBlend", e.target.checked)} />
            Own Blend
          </label>
        </div>
      </section>

      <section className="glass-panel rounded-xl p-6 space-y-4">
        <h2 className="font-serif text-xl text-cream">Descriptions</h2>
        <div>
          <label className={labelClass}>Short Description</label>
          <textarea className={adminTextareaClass} value={product.description} onChange={(e) => update("description", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Long Description</label>
          <textarea className={`${adminTextareaClass} min-h-[120px]`} value={product.longDescription} onChange={(e) => update("longDescription", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input className={inputClass} value={product.tags.join(", ")} onChange={(e) => update("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
        </div>
        <div>
          <label className={labelClass}>Ingredients (comma separated)</label>
          <input className={inputClass} value={product.ingredients.join(", ")} onChange={(e) => update("ingredients", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
        </div>
      </section>

      <section className="glass-panel rounded-xl p-6 space-y-4">
        <h2 className="font-serif text-xl text-cream">Pricing &amp; Sizes</h2>
        {product.sizes.map((size, i) => (
          <div key={i} className="grid grid-cols-3 gap-3">
            <input className={inputClass} placeholder="Label" value={size.label} onChange={(e) => {
              const sizes = [...product.sizes];
              sizes[i] = { ...sizes[i], label: e.target.value };
              update("sizes", sizes);
            }} />
            <input type="number" className={inputClass} placeholder="ml" value={size.ml} onChange={(e) => {
              const sizes = [...product.sizes];
              sizes[i] = { ...sizes[i], ml: Number(e.target.value) };
              update("sizes", sizes);
            }} />
            <input type="number" className={inputClass} placeholder="Price" value={size.price} onChange={(e) => {
              const sizes = [...product.sizes];
              sizes[i] = { ...sizes[i], price: Number(e.target.value) };
              update("sizes", sizes);
              if (i === 0) update("priceFrom", Number(e.target.value));
            }} />
          </div>
        ))}
        <button type="button" className="text-[10px] uppercase tracking-wider text-gold/60" onClick={() => update("sizes", [...product.sizes, { ml: 100, price: 0, label: "100 ml" }])}>
          + Add size
        </button>
      </section>

      <section className="glass-panel rounded-xl p-6 space-y-4">
        <h2 className="font-serif text-xl text-cream">Images</h2>
        {product.images.map((img, i) => (
          <ImageRow key={i} img={img} uploading={uploading} onUpload={(f) => uploadImage(i, f)} onChange={(next) => {
            const images = [...product.images];
            images[i] = next;
            update("images", images);
          }} onRemove={() => update("images", product.images.filter((_, j) => j !== i))} />
        ))}
        <button type="button" className="text-[10px] uppercase tracking-wider text-gold/60" onClick={() => update("images", [...product.images, { id: `img-${Date.now()}`, alt: "", variant: "bottle", accent: "gold" }])}>
          + Add image
        </button>
      </section>

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={saving} className="px-8 py-3 rounded-full bg-gold/20 border border-gold/40 text-[11px] tracking-[0.25em] uppercase text-cream hover:bg-gold/30 disabled:opacity-50">
          {saving ? "Saving…" : "Save Product"}
        </button>
        {onDelete && (
          <button type="button" onClick={onDelete} className="px-8 py-3 rounded-full border border-red-400/30 text-[11px] tracking-[0.25em] uppercase text-red-300 hover:bg-red-400/10">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

function ImageRow({ img, uploading, onUpload, onChange, onRemove }: {
  img: ProductImage;
  uploading: boolean;
  onUpload: (f: File) => void;
  onChange: (img: ProductImage) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gold/10 rounded-lg">
      {img.url ? (
        <img src={img.url} alt={img.alt} className="w-24 h-32 object-cover rounded-lg" />
      ) : (
        <div className="w-24 h-32 bg-white/5 rounded-lg flex items-center justify-center text-cream/20 text-xs">No image</div>
      )}
      <div className="flex-1 grid grid-cols-2 gap-2">
        <input className={`${adminInputClass} col-span-2`} placeholder="Alt text" value={img.alt} onChange={(e) => onChange({ ...img, alt: e.target.value })} />
        <select className={adminSelectClass} value={img.variant} onChange={(e) => onChange({ ...img, variant: e.target.value as ProductImage["variant"] })}>
          {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <select className={adminSelectClass} value={img.accent} onChange={(e) => onChange({ ...img, accent: e.target.value as ProductImage["accent"] })}>
          {ACCENTS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <label className="col-span-2 text-[10px] uppercase tracking-wider text-gold/60 cursor-pointer">
          {uploading ? "Uploading…" : "Upload image"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
        </label>
        <button type="button" onClick={onRemove} className="text-[10px] uppercase text-red-300">Remove</button>
      </div>
    </div>
  );
}
