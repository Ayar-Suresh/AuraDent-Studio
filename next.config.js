/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // If your GitHub Pages URL is https://<username>.github.io/<repository-name>/,
  // uncomment the line below and set it to your repository name:
  basePath: '/AuraDent-Studio',
};

module.exports = nextConfig;
