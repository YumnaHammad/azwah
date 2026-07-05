import fs from "fs/promises";
import path from "path";
import type { Product } from "@/types/product";
import type { SiteContent } from "@/types/cms";
import { getDefaultSiteContent } from "./defaults";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const SITE_FILE = path.join(DATA_DIR, "site.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function writeJsonFile<T>(filePath: string, data: T) {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/** Seed products from bundled defaults (lazy import avoids circular deps) */
async function seedProducts(): Promise<Product[]> {
  const { DEFAULT_PRODUCTS } = await import("@/lib/default-products");
  await writeJsonFile(PRODUCTS_FILE, DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

export async function readProducts(): Promise<Product[]> {
  await ensureDataDir();
  const existing = await readJsonFile<Product[]>(PRODUCTS_FILE);
  if (existing?.length) return existing;
  return seedProducts();
}

export async function writeProducts(products: Product[]) {
  await writeJsonFile(PRODUCTS_FILE, products);
}

export async function readSiteContent(): Promise<SiteContent> {
  await ensureDataDir();
  const existing = await readJsonFile<SiteContent>(SITE_FILE);
  const defaults = getDefaultSiteContent();
  if (existing) {
    return {
      ...defaults,
      ...existing,
      brand: { ...defaults.brand, ...existing.brand },
      contact: { ...defaults.contact, ...existing.contact },
      banners: existing.banners?.length ? existing.banners : defaults.banners,
    };
  }
  await writeJsonFile(SITE_FILE, defaults);
  return defaults;
}

export async function writeSiteContent(content: SiteContent) {
  await writeJsonFile(SITE_FILE, content);
}

export function getUploadsDir() {
  return UPLOADS_DIR;
}

export async function saveUploadedFile(filename: string, buffer: Buffer) {
  await ensureDataDir();
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filepath = path.join(UPLOADS_DIR, safe);
  await fs.writeFile(filepath, buffer);
  return `/uploads/${safe}`;
}

export async function deleteUploadedFile(url: string) {
  if (!url.startsWith("/uploads/")) return;
  const filepath = path.join(process.cwd(), "public", url);
  try {
    await fs.unlink(filepath);
  } catch {
    /* ignore */
  }
}
