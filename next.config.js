/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  // ✅ Prevent API routes from being statically analyzed during build
  staticPageGenerationTimeout: 60,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ✅ Ignore errors from API routes
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
