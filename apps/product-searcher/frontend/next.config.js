/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  rewrites () {
    return [
      {
        source: '/',
        destination: '/home'
      }
    ];
  }
};

module.exports = nextConfig;
