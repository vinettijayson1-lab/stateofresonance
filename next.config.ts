import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: '/products/:path*',
        destination: '/product/:path*',
        permanent: true,
      },
      {
        source: '/collections/:path*',
        destination: '/collection/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
