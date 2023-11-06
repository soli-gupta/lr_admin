const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_URL
    // NEXT_PUBLIC_URL: 'http://3.111.141.162:4000/',
    // NEXT_PUBLIC_IMAGE_URL: 'http://3.111.141.162:4000/'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // runtime: "experimental-edge",
    esmExternals: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: process.env.NEXT_PUBLIC_URL,
        // pathname: 'http://3.111.141.162:4000/',
      },
    ],
  },
}

module.exports = nextConfig