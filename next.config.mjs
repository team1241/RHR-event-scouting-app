/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/**",
      },
    ],
  },
  rewrites: async () => {
    return {
      beforeFiles: [{ source: "/", destination: "/dashboard" }],
    };
  },
};

export default nextConfig;
