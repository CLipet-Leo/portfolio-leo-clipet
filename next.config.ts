const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? '/Portfolio_Perso' : '',
  assetPrefix: isProd ? '/Portfolio_Perso/' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
