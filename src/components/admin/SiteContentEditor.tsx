"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/types/cms";
import { getDefaultSiteContent } from "@/lib/db/defaults";
import { useToast } from "@/components/admin/ToastProvider";
import {
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
  adminTextareaClass,
} from "@/components/admin/admin-form-classes";

type Tab = "brand" | "contact" | "ingredients" | "brands" | "highlights" | "testimonials" | "stats";

const TABS: { id: Tab; label: string }[] = [
  { id: "brand", label: "Brand" },
  { id: "contact", label: "Contact" },
  { id: "ingredients", label: "Ingredients" },
  { id: "brands", label: "Partner Brands" },
  { id: "highlights", label: "Promo Slides" },
  { id: "testimonials", label: "Testimonials" },
  { id: "stats", label: "Stats" },
];

export function SiteContentEditor() {
  const { toast } = useToast();
  const [site, setSite] = useState<SiteContent>(getDefaultSiteContent());
  const [tab, setTab] = useState<Tab>("brand");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/site")
      .then((r) => r.json())
      .then((data) => data?.brand && setSite(data));
  }, []);

  async function save() {
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    });
    setSaving(false);
    if (res.ok) {
      toast("Site content saved successfully", "success");
      setMsg("");
    } else {
      toast("Failed to save site content", "error");
      setMsg("Save failed");
    }
  }

  const inputClass = adminInputClass;
  const labelClass = adminLabelClass;
  const selectClass = adminSelectClass;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl text-cream">Site Content</h1>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 rounded-full bg-gold/15 border border-gold/35 text-[10px] tracking-[0.25em] uppercase text-cream hover:bg-gold/25 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save All Changes"}
        </button>
      </div>
      {msg && <p className="text-sm text-gold-soft mb-4">{msg}</p>}

      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase border transition-colors ${
              tab === t.id ? "border-gold/50 bg-gold/10 text-gold-soft" : "border-white/10 text-cream/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-xl p-6 space-y-4 w-full">
        {tab === "brand" && (
          <>
            {(["tagline", "story", "heritage", "mission", "online", "ingredientsStory"] as const).map((key) => (
              <div key={key}>
                <label className={labelClass}>{key}</label>
                <textarea
                  className={adminTextareaClass}
                  value={site.brand[key]}
                  onChange={(e) => setSite({ ...site, brand: { ...site.brand, [key]: e.target.value } })}
                />
              </div>
            ))}
          </>
        )}

        {tab === "contact" && (
          <>
            {(["address", "phone", "email", "hours", "whatsapp", "maps"] as const).map((key) => (
              <div key={key}>
                <label className={labelClass}>{key}</label>
                <input
                  className={inputClass}
                  value={site.contact[key]}
                  onChange={(e) => setSite({ ...site, contact: { ...site.contact, [key]: e.target.value } })}
                />
              </div>
            ))}
          </>
        )}

        {tab === "ingredients" &&
          site.ingredients.map((ing, i) => (
            <div key={i} className="p-4 border border-gold/10 rounded-lg space-y-2">
              <input className={inputClass} placeholder="Name" value={ing.name} onChange={(e) => {
                const ingredients = [...site.ingredients];
                ingredients[i] = { ...ing, name: e.target.value };
                setSite({ ...site, ingredients });
              }} />
              <input className={inputClass} placeholder="Origin" value={ing.origin} onChange={(e) => {
                const ingredients = [...site.ingredients];
                ingredients[i] = { ...ing, origin: e.target.value };
                setSite({ ...site, ingredients });
              }} />
              <textarea className={inputClass} placeholder="Description" value={ing.description} onChange={(e) => {
                const ingredients = [...site.ingredients];
                ingredients[i] = { ...ing, description: e.target.value };
                setSite({ ...site, ingredients });
              }} />
              <button type="button" className="text-[10px] text-red-300 uppercase" onClick={() => setSite({ ...site, ingredients: site.ingredients.filter((_, j) => j !== i) })}>Remove</button>
            </div>
          ))}

        {tab === "ingredients" && (
          <button type="button" className="text-[10px] uppercase text-gold/60" onClick={() => setSite({ ...site, ingredients: [...site.ingredients, { name: "", origin: "", description: "", icon: "◈" }] })}>+ Add ingredient</button>
        )}

        {tab === "testimonials" &&
          site.testimonials.map((t, i) => (
            <div key={t.id} className="p-4 border border-gold/10 rounded-lg space-y-2">
              <textarea className={inputClass} value={t.quote} onChange={(e) => {
                const testimonials = [...site.testimonials];
                testimonials[i] = { ...t, quote: e.target.value };
                setSite({ ...site, testimonials });
              }} />
              <input className={inputClass} placeholder="Name" value={t.name} onChange={(e) => {
                const testimonials = [...site.testimonials];
                testimonials[i] = { ...t, name: e.target.value };
                setSite({ ...site, testimonials });
              }} />
              <input className={inputClass} placeholder="Detail" value={t.detail} onChange={(e) => {
                const testimonials = [...site.testimonials];
                testimonials[i] = { ...t, detail: e.target.value };
                setSite({ ...site, testimonials });
              }} />
              <button type="button" className="text-[10px] text-red-300 uppercase" onClick={() => setSite({ ...site, testimonials: site.testimonials.filter((_, j) => j !== i) })}>Remove</button>
            </div>
          ))}

        {tab === "testimonials" && (
          <button type="button" className="text-[10px] uppercase text-gold/60" onClick={() => setSite({ ...site, testimonials: [...site.testimonials, { id: String(Date.now()), quote: "", name: "", detail: "" }] })}>+ Add testimonial</button>
        )}

        {tab === "highlights" &&
          site.highlights.map((h, i) => (
            <div key={h.id} className="p-4 border border-gold/10 rounded-lg space-y-2">
              <input className={inputClass} placeholder="Label" value={h.label} onChange={(e) => {
                const highlights = [...site.highlights];
                highlights[i] = { ...h, label: e.target.value };
                setSite({ ...site, highlights });
              }} />
              <input className={inputClass} placeholder="Title" value={h.title} onChange={(e) => {
                const highlights = [...site.highlights];
                highlights[i] = { ...h, title: e.target.value };
                setSite({ ...site, highlights });
              }} />
              <textarea className={inputClass} placeholder="Body" value={h.body} onChange={(e) => {
                const highlights = [...site.highlights];
                highlights[i] = { ...h, body: e.target.value };
                setSite({ ...site, highlights });
              }} />
              <div className="grid grid-cols-2 gap-2">
                <input className={inputClass} placeholder="CTA" value={h.cta} onChange={(e) => {
                  const highlights = [...site.highlights];
                  highlights[i] = { ...h, cta: e.target.value };
                  setSite({ ...site, highlights });
                }} />
                <input className={inputClass} placeholder="Link href" value={h.href} onChange={(e) => {
                  const highlights = [...site.highlights];
                  highlights[i] = { ...h, href: e.target.value };
                  setSite({ ...site, highlights });
                }} />
              </div>
              <select
                className={selectClass}
                value={h.accent}
                onChange={(e) => {
                  const highlights = [...site.highlights];
                  highlights[i] = { ...h, accent: e.target.value as typeof h.accent };
                  setSite({ ...site, highlights });
                }}
              >
                {(["gold", "oud", "jade", "rose"] as const).map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              <button type="button" className="text-[10px] text-red-300 uppercase" onClick={() => setSite({ ...site, highlights: site.highlights.filter((_, j) => j !== i) })}>Remove</button>
            </div>
          ))}

        {tab === "highlights" && (
          <button type="button" className="text-[10px] uppercase text-gold/60" onClick={() => setSite({ ...site, highlights: [...site.highlights, { id: String(Date.now()), label: "", title: "", body: "", cta: "Learn More", href: "/", accent: "gold" }] })}>+ Add promo slide</button>
        )}

        {tab === "stats" &&
          site.stats.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <input className={inputClass} placeholder="Value" value={s.value} onChange={(e) => {
                const stats = [...site.stats];
                stats[i] = { ...s, value: e.target.value };
                setSite({ ...site, stats });
              }} />
              <input className={inputClass} placeholder="Label" value={s.label} onChange={(e) => {
                const stats = [...site.stats];
                stats[i] = { ...s, label: e.target.value };
                setSite({ ...site, stats });
              }} />
            </div>
          ))}

        {tab === "brands" &&
          site.brands.map((b, i) => (
            <div key={b.id} className="p-4 border border-gold/10 rounded-lg space-y-2">
              <input className={inputClass} placeholder="Name" value={b.name} onChange={(e) => {
                const brands = [...site.brands];
                brands[i] = { ...b, name: e.target.value };
                setSite({ ...site, brands });
              }} />
              <input className={inputClass} placeholder="Tagline" value={b.tagline} onChange={(e) => {
                const brands = [...site.brands];
                brands[i] = { ...b, tagline: e.target.value };
                setSite({ ...site, brands });
              }} />
              <textarea className={inputClass} placeholder="Description" value={b.description} onChange={(e) => {
                const brands = [...site.brands];
                brands[i] = { ...b, description: e.target.value };
                setSite({ ...site, brands });
              }} />
              <label className="flex items-center gap-2 text-xs text-cream/50">
                <input
                  type="checkbox"
                  checked={!!b.highlight}
                  onChange={(e) => {
                    const brands = [...site.brands];
                    brands[i] = { ...b, highlight: e.target.checked };
                    setSite({ ...site, brands });
                  }}
                />
                Highlight partner
              </label>
            </div>
          ))}

        {tab === "brands" && (
          <button type="button" className="text-[10px] uppercase text-gold/60" onClick={() => setSite({ ...site, brands: [...site.brands, { id: String(Date.now()), name: "", tagline: "", description: "", featured: false }] })}>+ Add brand</button>
        )}
      </div>
    </div>
  );
}
