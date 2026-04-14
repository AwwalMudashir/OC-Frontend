import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/executive-briefing",
        destination: "/admin/login",
      },
    ];
  },
};

export default nextConfig;
