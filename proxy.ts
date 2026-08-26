import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "apksumal.com";

// Defense-in-depth: enforces the same canonical host that lib/seo.ts assumes
// when it builds every canonical/OG url. Platform-level redirects (e.g.
// Vercel's domain settings) may also do this, but the site must not depend on
// that alone — this makes it correct on any host.
// (Next.js 16 renamed the `middleware` convention to `proxy` — this file replaces it.)
//
// Deliberately reads the raw `host` header instead of `request.nextUrl.hostname`:
// under `next start`, nextUrl.hostname reflects the server's bind address, not
// the incoming request's Host header, even though the header itself arrives
// correctly — verified locally before choosing this approach.
//
// Trailing slashes: `trailingSlash: false` in next.config.mjs already makes
// Next.js redirect a trailing-slash path to its slash-less form on its own
// (same-host, relative Location — valid per RFC 9110), before this proxy runs.
// The check below still normalizes slashes here too, so a request that is
// simultaneously on the wrong host *and* has a trailing slash still lands on
// the fully-correct canonical URL, just via two redirect hops instead of one
// for that rare combined case, instead of getting stuck host-wrong after the
// framework's own single-hop slash redirect.
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

export function proxy(request: NextRequest) {
  const requestHost = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const { pathname, search } = request.nextUrl;

  // Local dev/preview bypass: Vercel never sends Host: localhost in production,
  // so this can't mask a real canonicalization bug — it just lets `next dev`/
  // `next start` be previewed directly without a bogus redirect to the live domain.
  if (LOCAL_HOSTS.has(requestHost)) {
    return NextResponse.next();
  }

  const needsHostFix = requestHost !== "" && requestHost !== CANONICAL_HOST;
  const needsSlashFix = pathname !== "/" && pathname.endsWith("/");

  if (needsHostFix || needsSlashFix) {
    const finalPathname = needsSlashFix ? pathname.slice(0, -1) : pathname;
    // Built as a plain URL (not NextURL.clone()) so the Location header is
    // always fully-qualified when we're actually changing the host.
    const target = new URL(`https://${CANONICAL_HOST}${finalPathname}${search}`);
    return NextResponse.redirect(target, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|opengraph-image).*)"],
};
