# SEO Conventions — apksumal.com

Read this before adding the next item. It exists so 500 items stay consistent
without re-deriving these decisions each time.

## Niche

This is **not** a general Android app directory. The scope is casino,
color-prediction, and real-money "earning game" APKs for Pakistan
specifically — the same space JJwin (`content/items/color-prediction/jjwin.mdx`)
is in. Every new item and category must fit inside that scope. Current
categories (`content/categories.json`): `color-prediction`, `aviator-crash`,
`live-casino`, `lottery-games`. Add a new category only for a genuinely
distinct sub-type within this niche, not for an unrelated app category.

## Host & URLs

- Canonical host: `https://apksumal.com` — **no `www`**, no trailing slash. Set once in `lib/site.ts` (`SITE_DOMAIN`).
- `proxy.ts` (Next.js 16's renamed `middleware.ts` convention) 301s any other host or a trailing-slash URL to this form. This is defense-in-depth — also set apksumal.com as the primary domain in your host's project settings if it supports www→apex redirects at the edge.
- URL shape: `/[category]` for hubs, `/[category]/[slug]` for items. Both flat, lowercase, kebab-case.
- Never build a URL by hand — always go through `buildMetadata()` (`lib/seo.ts`) or `SITE_DOMAIN` so canonical/OG/sitemap URLs can't drift from each other.

## Adding a new item

1. Add the MDX file at `content/items/<category-slug>/<item-slug>.mdx`. `slug` in frontmatter must match the filename; `category` in frontmatter must match the parent folder — `lib/content.ts` throws a build error if they don't.
2. Fill every frontmatter field in `lib/schema.ts` (`itemFrontmatterSchema`). None are optional except `userRatingValue`/`userRatingCount` (leave both unset unless you have a real aggregate — never fabricate these) and `relatedSlugs` (omit to fall back to same-category auto-fill).
3. Write real body prose: an intro, at least one `##` section with substance specific to *this* app (not reusable across others), and a verdict. Minimum 300 words — `npm run check-content` enforces this.
4. `editorialScore` (0–5) must be a score you actually assigned after using the app. It drives the `Review` block in the `SoftwareApplication` JSON-LD.
5. Run `npm run check-content` before committing. It fails the build on: missing/broken images, references to a category or related-slug that doesn't exist, bodies under 300 words, leftover placeholder markers (`TODO`, `TBD`, `lorem ipsum`, `coming soon`, `XXX`) in a non-example item, and byte-identical bodies across two items.

## Adding a new category

Add an entry to `content/categories.json`: `slug`, `name`, `description` (80+ chars — this is the hub page's crawlable intro copy, must be genuinely descriptive, not boilerplate), and `icon` (a PascalCase name from [lucide.dev](https://lucide.dev/icons), validated at render via `components/ui/DynamicIcon.tsx`).

## Structured data

- Homepage: `Organization` + `WebSite` (with `SearchAction` pointed at the real `/search` page — don't repoint this at a URL that doesn't actually return results).
- Item pages: `SoftwareApplication` + `BreadcrumbList` + `FAQPage` (only emitted when `item.faqs` is non-empty).
- **No fabricated `aggregateRating`.** Each item's JSON-LD carries one publisher-authored `Review` from the real `editorialScore` field. `aggregateRating` only appears when `userRatingValue`/`userRatingCount` are both set to a genuine sourced figure.
- **No `sameAs` anywhere** (Organization schema, footer) — we don't have real social profiles yet. Add them to `organizationSchema()` in `components/seo/JsonLd.tsx` if/when you do; never link a bare placeholder profile.
- The `FaqSection` component and `faqPageSchema()` are always called with the *same* `item.faqs` array — never hand-write a second copy of FAQ text for the schema.

## Sitemap / robots

- `app/sitemap.ts` uses Next's `generateSitemaps` to auto-split into `/sitemap/0.xml`, `/sitemap/1.xml`, etc. once the URL count crosses `SITEMAP_CHUNK_SIZE` (40,000, in `lib/sitemap-data.ts`). Nothing to maintain manually as the catalog grows.
- `app/robots.ts` lists every generated chunk as a separate `Sitemap:` line (there is no single sitemap-index file — Next doesn't generate one, and multiple `Sitemap:` lines in `robots.txt` is valid per the sitemaps.org spec).
- Noindexed routes (`/search`, `/privacy`, `/disclaimer`, `/terms`) are deliberately excluded from the sitemap.

## Thin-content policy

The biggest SEO risk at 500 pages is Google treating most of them as duplicate/thin content and not indexing them. The guardrails:

- Long-form prose lives in the MDX **body**, not a string field in a data array — harder to templatize by accident.
- `npm run check-content` is the enforcement mechanism. **Wire it into your CI or a `prebuild` npm script once you're past the scaffold stage**, so a thin or placeholder-laden item can't reach production.
- The category hub's `description` is real, unique intro copy — never leave two categories with similar boilerplate.

## Performance

- All images go through `next/image` (`Gallery.tsx`, `ItemCard.tsx`, item page hero icon) — automatic AVIF/WebP, explicit `sizes`, no unsized images.
- Fonts via `next/font/google` (`display: swap`) — no additional font requests, no layout shift from font swap.
- No client component renders primary content. `FaqSection.tsx` is the only "use client" file that touches item-page content, and it's a leaf — the FAQ text itself is server-rendered into the JSON-LD regardless of whether JS loads.
- Mobile nav uses `<details>/<summary>` instead of client state — zero JS for the menu.

## Known scaffold gaps (not yet real)

- `content/items/color-prediction/jjwin.mdx` — real content (game mechanics, download/deposit/withdrawal steps, FAQs, pros/cons), but `editorialScore: 3.2` is a placeholder judgment call, not a score from actual hands-on testing — revise it once you've verified the current app yourself. Screenshots/icon under `public/images/apps/jjwin/` are still blank placeholder images.
- `content/categories.json` has 4 categories covering the niche (`color-prediction`, `aviator-crash`, `live-casino`, `lottery-games`) — add more only for a genuinely distinct sub-type, not general app categories.
- `app/about/page.tsx`, `app/privacy/page.tsx`, `app/contact/page.tsx` — contain `// TODO` markers for real business/contact details and an actual review methodology. `privacy/page.tsx` is a starting draft, not legal advice — have it reviewed before launch.
- No pagination yet on category hub pages. Fine while categories are small; if any single category grows past ~150–200 items, add pagination with a self-referencing canonical per page before it becomes an unwieldy single-page list.
- Visual design is intentionally plain right now (inherited dark/gold utility classes, no imagery beyond blank placeholders) — the build has prioritized SEO/technical correctness over visual polish so far.
