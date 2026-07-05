"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/layout/MobileNav";
import { MagneticButton } from "@/components/ui/MagneticButton";

const LINKS = [
  { label: "Collection", href: "/products" },
  { label: "Brands", href: "/#brands" },
  { label: "Ingredients", href: "/#ingredients" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader({ variant = "solid" }: { variant?: "solid" | "transparent" }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-[var(--site-top-banner,0px)] left-0 right-0 z-[60] px-4 sm:px-6 md:px-10 lg:px-12 py-4 sm:py-5 flex items-center justify-between safe-top transition-[top] duration-300 ${
        variant === "solid"
          ? "bg-primary-dark/95 backdrop-blur-md border-b border-gold/10"
          : "nav-glass"
      }`}
    >
      <Link href="/" className="flex items-baseline gap-1.5 sm:gap-2 min-w-0">
        <span className="font-serif text-base sm:text-lg md:text-xl text-cream tracking-[0.15em] sm:tracking-[0.2em] uppercase truncate">
          Azwah
        </span>
        <span className="hidden sm:inline text-cream/30 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase">
          Enterprises
        </span>
      </Link>

      <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
        {LINKS.map((link) => {
          const active =
            link.href === "/about"
              ? pathname === "/about"
              : link.href === "/products"
                ? pathname.startsWith("/products")
                : false;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase transition-colors duration-500 link-underline whitespace-nowrap ${
                active ? "text-gold-soft" : "text-cream/45 hover:text-gold-soft"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        <MagneticButton
          href={isHome ? "#contact" : "/#contact"}
          className="!px-4 !py-2 !text-[9px] sm:!text-[10px] hidden md:inline-flex"
        >
          Order Online
        </MagneticButton>
        <MobileNav />
      </div>
    </header>
  );
}
