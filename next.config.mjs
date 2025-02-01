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
  rewrites: async () => {
    return {
      // afterFiles: [],
      // beforeFiles: [{ source: "/", destination: "/dashboard" }],
    };
  },
};

export default nextConfig;
