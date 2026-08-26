// Category hub pages (and the /:category prefix on item URLs) were removed
// once the catalog shrank to a single app. These permanent redirects keep any
// previously-shared/indexed links from dead-ending in a 404.
const RETIRED_CATEGORY_SLUGS = ["color-prediction", "aviator-crash", "live-casino", "lottery-games"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      // /color-prediction/jjwin -> /jjwin (old item URL -> new flat URL)
      ...RETIRED_CATEGORY_SLUGS.map((slug) => ({
        source: `/${slug}/:itemSlug`,
        destination: "/:itemSlug",
        permanent: true,
      })),
      // /color-prediction -> / (old category hub -> home)
      ...RETIRED_CATEGORY_SLUGS.map((slug) => ({
        source: `/${slug}`,
        destination: "/",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
