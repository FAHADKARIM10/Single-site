import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { categorySchema, itemFrontmatterSchema, type Category, type Item } from "./schema";

// ─── DATA ACCESS LAYER ──────────────────────────────────────────────────────
// Every page component reads content through the functions below, never by
// importing content files directly. Today these read local MDX/JSON from
// disk; swapping to a CMS or database later means rewriting the bodies of
// these functions only — page components and their signatures don't change.

const CONTENT_DIR = path.join(process.cwd(), "content");
const ITEMS_DIR = path.join(CONTENT_DIR, "items");

// Plain content files (MDX/JSON) aren't part of the module graph, so editing
// them doesn't trigger Next's dev-mode HMR the way editing a .ts/.tsx file
// does — caching across requests in dev would keep serving stale content
// until the server restarted. Only cache in production, where content is
// static for the life of the build.
const CACHE_ENABLED = process.env.NODE_ENV === "production";

let categoriesCache: Category[] | null = null;
let itemsCache: Item[] | null = null;

export function getAllCategories(): Category[] {
  if (categoriesCache) return categoriesCache;
  const raw = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "categories.json"), "utf-8"));
  const categories = raw.map((entry: unknown, i: number) => {
    const result = categorySchema.safeParse(entry);
    if (!result.success) {
      throw new Error(`content/categories.json[${i}] is invalid: ${result.error.message}`);
    }
    return result.data;
  });
  if (CACHE_ENABLED) categoriesCache = categories;
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}

export function getAllItems(): Item[] {
  if (itemsCache) return itemsCache;

  const categorySlugs = fs.readdirSync(ITEMS_DIR).filter((entry) =>
    fs.statSync(path.join(ITEMS_DIR, entry)).isDirectory()
  );

  const items: Item[] = [];

  for (const categorySlug of categorySlugs) {
    const dir = path.join(ITEMS_DIR, categorySlug);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const result = itemFrontmatterSchema.safeParse(data);

      if (!result.success) {
        throw new Error(
          `content/items/${categorySlug}/${file} has invalid frontmatter: ${result.error.message}`
        );
      }

      if (result.data.category !== categorySlug) {
        throw new Error(
          `content/items/${categorySlug}/${file}: frontmatter "category" (${result.data.category}) ` +
            `must match its parent folder (${categorySlug})`
        );
      }

      items.push({ ...result.data, body: content.trim() });
    }
  }

  if (CACHE_ENABLED) itemsCache = items;
  return items;
}

// Items live at /:slug (no category segment), so lookup is by slug alone.
// Slug uniqueness across the whole catalog is enforced by scripts/check-content.ts.
export function getItemBySlug(slug: string): Item | undefined {
  return getAllItems().find((item) => item.slug === slug);
}

/** Related items: manual `relatedSlugs` override first, then same-category fill, capped to `count`. */
export function getRelatedItems(item: Item, count = 6): Item[] {
  const all = getAllItems();
  const related: Item[] = [];

  for (const slug of item.relatedSlugs ?? []) {
    const match = all.find((i) => i.slug === slug && i.slug !== item.slug);
    if (match) related.push(match);
  }

  if (related.length < count) {
    const sameCategory = all.filter(
      (i) => i.category === item.category && i.slug !== item.slug && !related.includes(i)
    );
    related.push(...sameCategory.slice(0, count - related.length));
  }

  return related.slice(0, count);
}

export function searchItems(query: string): Item[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllItems().filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.shortDescription.toLowerCase().includes(q) ||
      item.developer.toLowerCase().includes(q)
  );
}
