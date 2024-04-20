/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BATH_PATH,

  /** https://nextjs.org/docs/pages/api-reference/next-config-js/output */
  output: 'standalone'
};

export default nextConfig;
