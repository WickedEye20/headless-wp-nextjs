/** @type {import('next').NextConfig} */
// Edit REPO_NAME to match your GitHub repository name when deploying to GitHub Pages.
const REPO_NAME = process.env.NEXT_PUBLIC_GH_PAGES_REPO || 'headless-wp-nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // enable `next export`
  trailingSlash: true,       // required for GH-Pages routing
  basePath: `/${REPO_NAME}`,
  assetPrefix: `/${REPO_NAME}/`,
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_WP_DOMAIN || 'localhost'],
  },
};

module.exports = nextConfig;
