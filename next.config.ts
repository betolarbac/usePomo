import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        search: '',
      }
    ]
  }
};

export default nextConfig;
