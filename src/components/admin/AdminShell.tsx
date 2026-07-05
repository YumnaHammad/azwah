"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/banners", label: "Banners" },
  { href: "/admin/content", label: "Site Content" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen h-screen bg-[#041f16] text-cream flex admin-portal overflow-hidden">
      <aside className="hidden md:flex w-56 shrink-0 flex-col h-screen sticky top-0 border-r border-gold/15 bg-[#041a12]">
        <div className="p-6 border-b border-gold/10 shrink-0">
          <p className="font-serif text-lg tracking-[0.2em] uppercase text-cream">Azwah</p>
          <p className="text-[9px] tracking-[0.35em] uppercase text-gold/50 mt-1">Admin Portal</p>
        </div>
        <nav className="flex-1 min-h-0 p-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 rounded-lg text-xs tracking-[0.15em] uppercase transition-colors ${
                  active
                    ? "bg-gold/15 text-gold-soft border border-gold/25"
                    : "text-cream/45 hover:text-cream hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gold/10 space-y-2 shrink-0 mt-auto bg-[#041a12]">
          <Link
            href="/"
            target="_blank"
            className="block text-[10px] tracking-[0.2em] uppercase text-cream/35 hover:text-gold-soft"
          >
            View Website →
          </Link>
          <button
            type="button"
            onClick={logout}
            className="text-[10px] tracking-[0.2em] uppercase text-cream/35 hover:text-red-300"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 h-screen overflow-y-auto">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-gold/15 bg-[#041a12]">
          <span className="font-serif tracking-[0.15em] uppercase text-sm">Admin</span>
          <div className="flex gap-3 text-[10px] uppercase tracking-wider">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-cream/50">
                {item.label.split(" ")[0]}
              </Link>
            ))}
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
