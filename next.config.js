/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Example: https://a.espncdn.com/i/teamlogos/ncaa/500/66.png
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
        port: '',
        pathname: '/i/teamlogos/ncaa/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
