import { Word, Category, Province } from "./types";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://127.0.0.1:8055";

/**
 * Helper to get the full URL for a Directus asset (e.g. video)
 */
export function getAssetUrl(fileId: any): string {
  if (!fileId) return "";
  
  // If Directus returns the file as an object (due to *.* fields)
  const id = typeof fileId === "object" ? fileId.id : fileId;
  
  if (!id || typeof id !== "string") return "";

  // Check if it's already a full URL
  if (id.startsWith("http")) return id;
  
  return `${DIRECTUS_URL}/assets/${id}`;
}

/**
 * Fetch all published words with their related categories and provinces
 */
export async function getWords(): Promise<Word[]> {
  const url = `${DIRECTUS_URL}/items/words?fields=*,category.*,province.*&filter[status][_eq]=published`;
  const res = await fetch(url, {
    next: { revalidate: 1 },
  });
  
  if (!res.ok) throw new Error(`Failed to fetch words: ${res.status}`);
  
  const json = await res.json();
  const data = json.data;

  // Map Directus response to our internal Word interface
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    video_url: getAssetUrl(item.video_file),
    video_file: item.video_file,
    category_id: item.category?.id || 0,
    province_id: item.province?.id || 0,
    status: item.status,
    // Add flattened objects for easier access if needed
    category: item.category,
    province: item.province,
  }));
}

/**
 * Fetch a single word by its slug
 */
export async function getWordBySlug(slug: string): Promise<Word | null> {
  const url = `${DIRECTUS_URL}/items/words?fields=*,category.*,province.*&filter[slug][_eq]=${slug}&filter[status][_eq]=published`;
  const res = await fetch(url, {
    next: { revalidate: 1 },
  });
  
  if (!res.ok) return null;
  
  const json = await res.json();
  const item = json.data?.[0];

  if (!item) return null;

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    video_url: getAssetUrl(item.video_file),
    video_file: item.video_file,
    category_id: item.category?.id || 0,
    province_id: item.province?.id || 0,
    status: item.status,
    category: item.category,
    province: item.province,
  };
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${DIRECTUS_URL}/items/categories`, {
    next: { revalidate: 1 },
  });
  
  if (!res.ok) throw new Error("Failed to fetch categories");
  
  const json = await res.json();
  return json.data;
}

/**
 * Fetch all provinces
 */
export async function getProvinces(): Promise<Province[]> {
  const res = await fetch(`${DIRECTUS_URL}/items/provinces`, {
    next: { revalidate: 1 },
  });
  
  if (!res.ok) throw new Error("Failed to fetch provinces");
  
  const json = await res.json();
  return json.data;
}
