/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "rb4alqiu9a.ufs.sh",
        pathname: "/f/**",
      },
    ],
  },
};

export default nextConfig;
