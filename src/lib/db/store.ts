import "server-only";

import fs from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";
import { put } from "@vercel/blob";
import type { Product } from "@/types/product";
import type { SiteContent } from "@/types/cms";
import { getDefaultSiteContent } from "./defaults";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const SITE_FILE = path.join(DATA_DIR, "site.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const REDIS_PRODUCTS_KEY = "azwah:products";
const REDIS_SITE_KEY = "azwah:site";

function hasRedis(): boolean {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return Boolean(url && token);
}

function getRedis(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error("Redis is not configured. Add Upstash Redis or Vercel KV to your project.");
  }
  return new Redis({ url, token });
}

function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function ensureLocalDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

async function readLocalJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function writeLocalJson<T>(filePath: string, data: T) {
  await ensureLocalDirs();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function seedProducts(): Promise<Product[]> {
  const { DEFAULT_PRODUCTS } = await import("@/lib/default-products");
  await writeProducts(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

export async function readProducts(): Promise<Product[]> {
  if (hasRedis()) {
    const redis = getRedis();
    const cached = await redis.get<Product[]>(REDIS_PRODUCTS_KEY);
    if (cached?.length) return cached;
    return seedProducts();
  }

  await ensureLocalDirs();
  const existing = await readLocalJson<Product[]>(PRODUCTS_FILE);
  if (existing?.length) return existing;
  return seedProducts();
}

export async function writeProducts(products: Product[]) {
  if (hasRedis()) {
    const redis = getRedis();
    await redis.set(REDIS_PRODUCTS_KEY, products);
    return;
  }

  await writeLocalJson(PRODUCTS_FILE, products);
}

export async function readSiteContent(): Promise<SiteContent> {
  const defaults = getDefaultSiteContent();

  if (hasRedis()) {
    const redis = getRedis();
    const existing = await redis.get<SiteContent>(REDIS_SITE_KEY);
    if (existing) {
      return {
        ...defaults,
        ...existing,
        brand: { ...defaults.brand, ...existing.brand },
        contact: { ...defaults.contact, ...existing.contact },
        banners: existing.banners?.length ? existing.banners : defaults.banners,
      };
    }
    await writeSiteContent(defaults);
    return defaults;
  }

  await ensureLocalDirs();
  const existing = await readLocalJson<SiteContent>(SITE_FILE);
  if (existing) {
    return {
      ...defaults,
      ...existing,
      brand: { ...defaults.brand, ...existing.brand },
      contact: { ...defaults.contact, ...existing.contact },
      banners: existing.banners?.length ? existing.banners : defaults.banners,
    };
  }
  await writeSiteContent(defaults);
  return defaults;
}

export async function writeSiteContent(content: SiteContent) {
  if (hasRedis()) {
    const redis = getRedis();
    await redis.set(REDIS_SITE_KEY, content);
    return;
  }

  await writeLocalJson(SITE_FILE, content);
}

export function getUploadsDir() {
  return UPLOADS_DIR;
}

export async function saveUploadedFile(filename: string, buffer: Buffer, contentType?: string) {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

  if (hasBlob()) {
    const blob = await put(`azwah/uploads/${safe}`, buffer, {
      access: "public",
      contentType: contentType || "application/octet-stream",
      allowOverwrite: true,
    });
    return blob.url;
  }

  await ensureLocalDirs();
  const filepath = path.join(UPLOADS_DIR, safe);
  await fs.writeFile(filepath, buffer);
  return `/uploads/${safe}`;
}

export async function deleteUploadedFile(url: string) {
  if (url.startsWith("http")) return;
  if (!url.startsWith("/uploads/")) return;
  const filepath = path.join(process.cwd(), "public", url);
  try {
    await fs.unlink(filepath);
  } catch {
    /* ignore */
  }
}

/** Used by admin health — confirms persistent storage is configured on Vercel */
export function getStorageMode(): "redis" | "local" {
  return hasRedis() ? "redis" : "local";
}
