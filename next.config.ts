import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com", pathname: "/amplify_video_thumb/**" },
      { protocol: "https", hostname: "pbs.twimg.com", pathname: "/ext_tw_video_thumb/**" },
    ],
  },
};

export default nextConfig;
