/**
 * Thin-content / placeholder guard for content/items/**.mdx.
 *
 * Run with `npm run check-content`. Exits non-zero (and fails CI/prebuild if
 * wired in) when any item is missing substance, still carries a placeholder
 * marker outside of clearly-flagged EXAMPLE content, or duplicates another
 * item's body word-for-word. lib/content.ts's Zod validation already covers
 * required-field and format checks — this script covers everything Zod can't:
 * word counts, placeholder text, cross-file duplication, and broken references.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { getAllCategories, getAllItems } from "../lib/content";

const MIN_BODY_WORDS = 300;
const PLACEHOLDER_PATTERNS = [/\btodo\b/i, /\btbd\b/i, /lorem ipsum/i, /coming soon/i, /\bxxx\b/i];

let errorCount = 0;

function fail(message: string) {
  errorCount++;
  console.error(`✗ ${message}`);
}

function imageExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

const categories = getAllCategories();
const categorySlugs = new Set(categories.map((c) => c.slug));

for (const category of categories) {
  if (category.description.length < 80) {
    fail(`category "${category.slug}": description is too short for a real hub-page intro`);
  }
}

const items = getAllItems();
const itemSlugs = new Set(items.map((i) => i.slug));
const bodyHashes = new Map<string, string>(); // hash -> first slug that produced it

// Items are routed at /:slug (no category segment), so a slug collision
// between two items would make one of them permanently unreachable.
const slugOwners = new Map<string, string>(); // slug -> first ref that claimed it
for (const item of items) {
  const ref = `${item.category}/${item.slug}`;
  const existingOwner = slugOwners.get(item.slug);
  if (existingOwner) {
    fail(`${ref}: slug "${item.slug}" collides with "${existingOwner}" — slugs must be unique site-wide`);
  } else {
    slugOwners.set(item.slug, ref);
  }
}

for (const item of items) {
  const ref = `${item.category}/${item.slug}`;

  if (!categorySlugs.has(item.category)) {
    fail(`${ref}: category "${item.category}" is not defined in content/categories.json`);
  }

  const bodyWords = wordCount(item.body);
  if (bodyWords < MIN_BODY_WORDS) {
    fail(`${ref}: body is only ${bodyWords} words, minimum is ${MIN_BODY_WORDS} (thin content)`);
  }

  if (!item.isExample) {
    const haystack = [item.name, item.shortDescription, item.body, ...item.pros, ...item.cons].join(" ");
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(haystack)) {
        fail(`${ref}: contains placeholder marker matching ${pattern} — replace before publishing`);
      }
    }
  }

  for (const shot of item.screenshots ?? []) {
    if (!imageExists(shot.src)) fail(`${ref}: screenshot image not found at public${shot.src}`);
  }
  if (!imageExists(item.icon)) fail(`${ref}: icon image not found at public${item.icon}`);

  for (const relSlug of item.relatedSlugs ?? []) {
    if (!itemSlugs.has(relSlug)) {
      fail(`${ref}: relatedSlugs references unknown slug "${relSlug}"`);
    }
  }

  const normalized = item.body.trim().toLowerCase().replace(/\s+/g, " ");
  const hash = crypto.createHash("sha256").update(normalized).digest("hex");
  const existing = bodyHashes.get(hash);
  if (existing) {
    fail(`${ref}: body is byte-identical to "${existing}" — duplicate content`);
  } else {
    bodyHashes.set(hash, ref);
  }
}

console.log(`\nChecked ${categories.length} categories, ${items.length} items.`);
if (errorCount > 0) {
  console.error(`${errorCount} issue(s) found.\n`);
  process.exit(1);
} else {
  console.log("No thin-content or placeholder issues found.\n");
}
