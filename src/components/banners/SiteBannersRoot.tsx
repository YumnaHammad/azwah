"use client";

import { usePathname } from "next/navigation";
import { SiteBanners } from "@/components/banners/SiteBanners";

export function SiteBannersRoot() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <SiteBanners />;
}
