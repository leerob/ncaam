export default {
  experimental: {
    ppr: true,
    useCache: true,
    inlineCss: true
  },
  images: {
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
