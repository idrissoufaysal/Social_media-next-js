/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:["img.clerk.com",],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '/**'
            }]
    }
}
module.exports = nextConfig

