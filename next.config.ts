const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Portfolio_Perso' : '',
  assetPrefix: isProd ? '/Portfolio_Perso/' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
