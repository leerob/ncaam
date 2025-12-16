export default {
  cacheComponents: true,
  experimental: {
    inlineCss: true
  },
  images: {
    minimumCacheTTL: 2592000,
    // Example: https://a.espncdn.com/i/teamlogos/ncaa/500/66.png
    // Default: https://a.espncdn.com/i/teamlogos/default-team-logo-500.png
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
        port: '',
        pathname: '/i/teamlogos/**',
        search: ''
      }
    ]
  }
};
