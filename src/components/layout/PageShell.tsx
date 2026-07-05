import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

export function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-[#041f16]">
      <SiteHeader variant="solid" />
      <main className={`pt-24 sm:pt-28 pb-0 ${className}`}>{children}</main>
      <Footer />
    </div>
  );
}

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="section-container mb-8 sm:mb-10">
      <ol className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-cream/35">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-cream/20">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-gold-soft transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-cream/60">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
