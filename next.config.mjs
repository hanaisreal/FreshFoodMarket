/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
            port: "",
            pathname: '/*/**',
          },
          {
            protocol: 'https',
            hostname: 'food-ordering-hanaoh.s3.amazonaws.com',
          }
        ],
      },
};

export default nextConfig;
