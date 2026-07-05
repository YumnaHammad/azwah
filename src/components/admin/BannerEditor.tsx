"use client";

import { useEffect, useState } from "react";
import type { SiteBanner, BannerKind, BannerPosition } from "@/types/cms";
import { getDefaultSiteContent } from "@/lib/db/defaults";
import { useToast } from "@/components/admin/ToastProvider";
import {
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
  adminTextareaClass,
} from "@/components/admin/admin-form-classes";

const POSITIONS: { value: BannerPosition; label: string }[] = [
  { value: "top", label: "Top bar (full width)" },
  { value: "center", label: "Center modal" },
  { value: "bottom-left", label: "Bottom left corner" },
  { value: "bottom-right", label: "Bottom right corner" },
];

const KINDS: { value: BannerKind; label: string }[] = [
  { value: "sale", label: "Sale" },
  { value: "new-arrival", label: "New Arrival" },
  { value: "announcement", label: "Announcement" },
  { value: "custom", label: "Custom" },
];

const ACCENTS = ["gold", "oud", "jade", "rose"] as const;

function emptyBanner(): SiteBanner {
  return {
    id: String(Date.now()),
    title: "",
    message: "",
    cta: "Learn More",
    href: "/products",
    position: "top",
    kind: "announcement",
    enabled: true,
    dismissible: true,
    accent: "gold",
  };
}

export function BannerEditor() {
  const { toast } = useToast();
  const [banners, setBanners] = useState<SiteBanner[]>(getDefaultSiteContent().banners);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/site")
      .then((r) => r.json())
      .then((data) => {
        if (data?.banners) setBanners(data.banners);
      });
  }, []);

  async function save() {
    setSaving(true);
    const siteRes = await fetch("/api/admin/site");
    const site = await siteRes.json();
    const res = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...site, banners }),
    });
    setSaving(false);
    if (res.ok) {
      toast("Banners saved successfully", "success");
    } else {
      toast("Failed to save banners", "error");
    }
  }

  function updateBanner(index: number, next: SiteBanner) {
    const copy = [...banners];
    copy[index] = next;
    setBanners(copy);
  }

  async function uploadBannerImage(index: number, file: File) {
    setUploadingIndex(index);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      updateBanner(index, { ...banners[index], imageUrl: data.url });
      toast("Banner image uploaded", "success");
    } catch {
      toast("Image upload failed", "error");
    } finally {
      setUploadingIndex(null);
    }
  }

  const labelClass = adminLabelClass;
  const inputClass = adminInputClass;
  const selectClass = adminSelectClass;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-cream">Promo Banners</h1>
          <p className="text-cream/40 text-sm mt-1">
            Sales, new arrivals, and announcements — top bar, center modal, or corner cards.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 rounded-full bg-gold/15 border border-gold/35 text-[10px] tracking-[0.25em] uppercase text-cream hover:bg-gold/25 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save All Banners"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        {POSITIONS.map((pos) => {
          const active = banners.filter((b) => b.position === pos.value && b.enabled);
          return (
            <div key={pos.value} className="glass-panel rounded-xl p-4 border border-gold/10">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-1">{pos.label}</p>
              <p className="text-cream/40 text-xs">
                {active.length ? `${active.length} active` : "No active banner"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {banners.map((banner, i) => (
          <div key={banner.id} className="glass-panel rounded-xl p-5 sm:p-6 space-y-4 border border-gold/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2 py-0.5 rounded-full text-[9px] tracking-[0.15em] uppercase bg-gold/15 text-gold-soft border border-gold/25">
                  {KINDS.find((k) => k.value === banner.kind)?.label ?? banner.kind}
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-cream/35">
                  {POSITIONS.find((p) => p.value === banner.position)?.label}
                </span>
              </div>
              <label className="flex items-center gap-2 text-xs text-cream/50">
                <input
                  type="checkbox"
                  checked={banner.enabled}
                  onChange={(e) => updateBanner(i, { ...banner, enabled: e.target.checked })}
                />
                Enabled
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  className={inputClass}
                  value={banner.title}
                  onChange={(e) => updateBanner(i, { ...banner, title: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Subtitle</label>
                <input
                  className={inputClass}
                  value={banner.subtitle ?? ""}
                  onChange={(e) => updateBanner(i, { ...banner, subtitle: e.target.value })}
                  placeholder="Women's · Eau de Parfum · Own Blend"
                />
              </div>
              <div>
                <label className={labelClass}>Type</label>
                <select
                  className={selectClass}
                  value={banner.kind}
                  onChange={(e) => updateBanner(i, { ...banner, kind: e.target.value as BannerKind })}
                >
                  {KINDS.map((k) => (
                    <option key={k.value} value={k.value}>{k.label}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Message</label>
                <textarea
                  className={adminTextareaClass}
                  value={banner.message}
                  onChange={(e) => updateBanner(i, { ...banner, message: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Product detail line</label>
                <input
                  className={inputClass}
                  value={banner.detail ?? ""}
                  onChange={(e) => updateBanner(i, { ...banner, detail: e.target.value })}
                  placeholder="From $189 · Top: Rose, Saffron · Heart: Oud · Base: Musk"
                />
              </div>
              <div>
                <label className={labelClass}>Button text</label>
                <input
                  className={inputClass}
                  value={banner.cta}
                  onChange={(e) => updateBanner(i, { ...banner, cta: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Link URL</label>
                <input
                  className={inputClass}
                  value={banner.href}
                  onChange={(e) => updateBanner(i, { ...banner, href: e.target.value })}
                  placeholder="/products or /#contact"
                />
              </div>
              <div>
                <label className={labelClass}>Position</label>
                <select
                  className={selectClass}
                  value={banner.position}
                  onChange={(e) => updateBanner(i, { ...banner, position: e.target.value as BannerPosition })}
                >
                  {POSITIONS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Accent</label>
                <select
                  className={selectClass}
                  value={banner.accent}
                  onChange={(e) => updateBanner(i, { ...banner, accent: e.target.value as SiteBanner["accent"] })}
                >
                  {ACCENTS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 p-4 rounded-xl border border-gold/10 bg-black/20">
                <label className={labelClass}>Product image</label>
                <p className="text-cream/35 text-xs mb-3">
                  Upload a perfume or product photo — required for the center modal layout (left panel).
                  Without an image, a styled Azwah bottle placeholder is shown.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-28 h-36 shrink-0 rounded-lg overflow-hidden border border-gold/15 bg-[#041a12]">
                    {banner.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={banner.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cream/20 text-[10px] uppercase tracking-widest text-center px-2">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-wider text-gold/60 cursor-pointer">
                      {uploadingIndex === i ? "Uploading…" : "Upload product photo"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingIndex === i}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadBannerImage(i, file);
                        }}
                      />
                    </label>
                    {banner.imageUrl && (
                      <button
                        type="button"
                        className="text-[10px] uppercase tracking-wider text-red-300/80 hover:text-red-200 text-left"
                        onClick={() => updateBanner(i, { ...banner, imageUrl: undefined })}
                      >
                        Remove image
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gold/10">
              <label className="flex items-center gap-2 text-xs text-cream/50">
                <input
                  type="checkbox"
                  checked={banner.dismissible}
                  onChange={(e) => updateBanner(i, { ...banner, dismissible: e.target.checked })}
                />
                Visitor can dismiss
              </label>
              <button
                type="button"
                className="text-[10px] uppercase tracking-wider text-red-300 hover:text-red-200"
                onClick={() => setBanners(banners.filter((_, j) => j !== i))}
              >
                Remove banner
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 text-[10px] uppercase tracking-[0.2em] text-gold/60 hover:text-gold-soft"
        onClick={() => setBanners([...banners, emptyBanner()])}
      >
        + Add banner
      </button>
    </div>
  );
}
