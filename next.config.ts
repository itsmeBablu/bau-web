import type { NextConfig } from 'next';

const publicSections = [
  'features',
  'pricing',
  'updates',
  'roadmap',
  'newsletter',
  'partners',
  'plugins',
  'help',
  'showcase',
  'account',
  'legal',
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "object-src 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
  },
  async redirects() {
    return publicSections.map((section) => ({
      source: `/${section}/:path*`,
      destination: `/en/${section}/:path*`,
      permanent: false,
    }));
  },
};

export default nextConfig;
