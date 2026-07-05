"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Invalid password");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#041f16] flex items-center justify-center p-4 admin-portal">
      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 sm:p-10 w-full max-w-md">
        <p className="section-label mb-2 text-center">Azwah Enterprises</p>
        <h1 className="font-serif text-2xl text-cream text-center mb-8">Admin Portal</h1>
        {error && <p className="text-red-300 text-sm mb-4 text-center">{error}</p>}
        <label className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2 block">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 text-cream mb-6 focus:outline-none focus:border-gold/40"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-gold/15 border border-gold/35 text-[11px] tracking-[0.25em] uppercase text-cream hover:bg-gold/25 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
        <p className="text-cream/25 text-[10px] text-center mt-6">Default dev password: azwah2026</p>
      </form>
    </div>
  );
}
