/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Allow dev requests from other devices on the network (e.g. phone at 192.168.x.x)
  allowedDevOrigins: ['192.168.206.206', 'localhost', '127.0.0.1'],
}

module.exports = nextConfig
