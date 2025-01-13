/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:["img.clerk.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com", // Autorise les images de Clerk
                port: "",
                pathname: "/**", // Autorise tous les chemins sous ce domaine
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '/**'
            }]
    }
}
module.exports = nextConfig

