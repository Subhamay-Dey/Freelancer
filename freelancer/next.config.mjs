/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'kwrzjcvsmhefihoxtrjy.supabase.co',
            port: '',
          },
        ],
      },
};

export default nextConfig;
