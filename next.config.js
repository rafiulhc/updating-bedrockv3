// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  webpack5: true,
  ignoreBuildErrors: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    }

    return config
  },
}
