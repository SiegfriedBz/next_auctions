import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // to use Lingui macros
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  images: {
    remotePatterns: [
      new URL("https://github.com/shadcn.png"),
      // Local Supabase Storage
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "54321",
        pathname: "/storage/v1/object/public/**",
      },
      // Production Supabase Storage
      {
        protocol: "https",
        hostname: "skgjrluyrcnboekitvym.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
