/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    /**
     * DO NOT DELETE without re-testing /api/og in production.
     *
     * What this fixes
     * ---------------
     * `next/og` resolves to Next's bundled copy of @vercel/og, whose Node
     * build loads three sibling assets off disk at request time:
     *
     *   noto-sans-v27-latin-regular.ttf   default font
     *   yoga.wasm                         layout engine
     *   resvg.wasm                        rasteriser
     *
     * It builds those paths dynamically —
     * `fileURLToPath(join(import.meta.url, "../yoga.wasm"))` — which the
     * static analyser behind serverless bundling (@vercel/nft) cannot follow.
     * Without this include the lambda shipped index.node.js and package.json
     * and nothing else, so /api/og threw on its first real request and
     * returned 500 while the build stayed completely green. Every OG preview
     * on the site was broken and nothing surfaced it, because a
     * `force-dynamic` route is never exercised during the build.
     *
     * Why the glob
     * ------------
     * Naming the three files individually would break the day a future
     * version needs a fourth. The whole directory is 2.9 MB against a 250 MB
     * lambda limit, so precision buys nothing here.
     *
     * Fragility — read before upgrading Next
     * --------------------------------------
     * This path points inside Next's own node_modules layout. A major
     * upgrade may move or rename `dist/compiled/@vercel/og`, at which point
     * this include silently matches nothing and OG images start failing
     * again exactly as quietly as before. After any Next major bump: deploy,
     * then run `npm run check:og`.
     *
     * Do not "simplify" this by switching the route to the edge runtime.
     * That was tried before and produced 0-byte images in production — a
     * 200 response with an empty body, which is even harder to notice than
     * a 500. If edge is revisited, it needs its own investigation first.
     */
    outputFileTracingIncludes: {
      "/api/og": ["./node_modules/next/dist/compiled/@vercel/og/**"],
    },
  },

  async redirects() {
    return [
      // There is no Russian landing page — /ru exists only as the stable
      // prefix the lectures live under, so that real i18n can later move
      // Russian pages here without breaking links already in circulation.
      // Temporary (307) rather than permanent: a /ru index may yet appear,
      // and a cached 308 would be very hard to take back.
      { source: "/ru", destination: "/ru/lectures", permanent: false },
    ];
  },
};

export default nextConfig;
