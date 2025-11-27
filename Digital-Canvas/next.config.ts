import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Performance Optimization: ISR + Edge Caching Strategy
  // Note: output: 'export' is NOT used because it's incompatible with Server Actions (AI Assistant)
  // Instead, we use ISR (Incremental Static Regeneration) + Vercel Edge Caching

  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Disable Next.js image optimization to rely on Vercel edge caching
    unoptimized: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // CRITICAL: Override Next.js default cache headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
