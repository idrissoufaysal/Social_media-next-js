/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['moccasin-defensive-anglerfish-751.mypinata.cloud',"img.clerk.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'moccasin-defensive-anglerfish-751.mypinata.cloud',
                pathname: '/ipfs/**',
            },
        ],
    },
};

export default nextConfig;

