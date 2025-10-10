/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=60, stale-while-revalidate=600" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;

export default nextConfig;

