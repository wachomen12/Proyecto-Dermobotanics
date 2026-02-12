/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/deafjdeev/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
