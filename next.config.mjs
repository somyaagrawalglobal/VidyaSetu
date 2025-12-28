/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '', // Leave empty if default port (443 for https)
        pathname: '/7.x/avataaars/svg/**', // Or use '/**' to allow all paths
      },
      {
        protocol: 'https',
        hostname: 'lwfiles.mycourse.app',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
    ],
  },
  experimental: {
    // instrumentationHook: true, 
  },
};

export default nextConfig;
