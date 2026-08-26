import { z } from "zod";

// ─── CATEGORY ─────────────────────────────────────────────────────────────────
export const categorySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase-kebab-case"),
  name: z.string().min(1),
  // Unique intro copy rendered on the category hub page — must not be boilerplate.
  description: z.string().min(80),
  icon: z.string().min(1),
});

export type Category = z.infer<typeof categorySchema>;

// ─── ITEM ─────────────────────────────────────────────────────────────────────
export const screenshotSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type FAQ = z.infer<typeof faqSchema>;

export const itemFrontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase-kebab-case"),
  name: z.string().min(1),
  category: z.string().min(1),
  developer: z.string().min(1),
  version: z.string().min(1),
  fileSize: z.string().min(1),
  minAndroidVersion: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "publishedAt must be YYYY-MM-DD"),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "updatedAt must be YYYY-MM-DD"),
  icon: z.string().min(1),
  // Optional keyword-rich override for the on-page H1. Falls back to `name` when unset.
  h1: z.string().min(1).optional(),
  screenshots: z.array(screenshotSchema).optional(),
  // 70-160 chars: doubles as <meta description> and card blurb. Must be unique per item.
  shortDescription: z.string().min(70).max(160),
  downloadUrl: z.string().min(1),
  // Real, editor-assigned score — powers the JSON-LD Review, not a fabricated aggregate.
  editorialScore: z.number().min(0).max(5),
  // Only set these if you have a genuine aggregate from real users. Leave undefined otherwise.
  userRatingValue: z.number().min(0).max(5).optional(),
  userRatingCount: z.number().int().min(0).optional(),
  pros: z.array(z.string().min(1)).min(1),
  cons: z.array(z.string().min(1)).min(1),
  faqs: z.array(faqSchema).default([]),
  relatedSlugs: z.array(z.string()).optional(),
  // Marks scaffold content that must be replaced before launch — never true in real entries.
  isExample: z.boolean().default(false),
});

export type ItemFrontmatter = z.infer<typeof itemFrontmatterSchema>;

export interface Item extends ItemFrontmatter {
  /** Raw MDX body (unique intro/feature/verdict prose) */
  body: string;
}
