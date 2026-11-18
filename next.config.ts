import type { NextConfig } from "next";
import path from "node:path";

// Security headers (same reference block as the portfolio, adapted to what
// this app provably uses):
// - script-src 'unsafe-inline': Next.js App Router ships inline flight-data
//   scripts with no nonce; without it hydration breaks.
// - style-src 'unsafe-inline': React inline style props render as style
//   attributes (e.g. the chat form's safe-area padding).
// - connect-src 'self': the browser only calls our own /api/chat; OpenRouter
//   and Pollinations are called server-side from the API route.
// - form-action 'self': the chat page has a real <form>; same-origin only.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  // Pin the tracing root to this app: the repo root has its own lockfile,
  // which otherwise makes Next infer the whole workspace as the root.
  outputFileTracingRoot: path.resolve(process.cwd()),
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
