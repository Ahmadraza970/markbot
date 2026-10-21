import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the tracing root to this app: the repo root has its own lockfile,
  // which otherwise makes Next infer the whole workspace as the root.
  outputFileTracingRoot: path.resolve(process.cwd()),
};

export default nextConfig;
