import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // to use Lingui macros
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  images: {
    remotePatterns: [new URL("https://github.com/shadcn.png")],
  },
};

export default nextConfig;
