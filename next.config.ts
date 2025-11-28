import type { NextConfig } from 'next';

/**
 * Configuration Next.js optimisée pour le portfolio
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  // Optimisation des images
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },

  // Optimisation de la compilation
  reactStrictMode: true,

  // Support de Tailwind CSS v4
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-avatar',
      '@radix-ui/react-separator',
    ],
  },

  // Note: Retiré 'output: export' car incompatible avec les routes API
  // Pour un site statique complet, commentez les routes API ou utilisez ISR
  trailingSlash: false,
};

export default nextConfig;
