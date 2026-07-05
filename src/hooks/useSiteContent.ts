"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/types/cms";
import { getDefaultSiteContent } from "@/lib/db/defaults";

const FALLBACK = getDefaultSiteContent();

export function useSiteContent() {
  const [site, setSite] = useState<SiteContent>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/site")
      .then((r) => r.json())
      .then((data) => {
        if (data?.brand) {
          setSite({
            ...FALLBACK,
            ...data,
            banners: data.banners ?? FALLBACK.banners,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { site, loading };
}
