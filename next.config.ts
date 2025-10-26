import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { tsconfigPath: "./tsconfig.json" },
  reactStrictMode: true,
  reactCompiler: true,
  poweredByHeader: false,
};

export default nextConfig;
