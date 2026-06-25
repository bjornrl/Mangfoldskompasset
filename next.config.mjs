/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the whole site is plain HTML/CSS/JS and can be hosted
  // anywhere (Netlify serves the generated `out/` folder).
  output: "export",
  // next/image optimization needs a server; disable it for static export.
  images: { unoptimized: true },
  // Emit folder-style URLs (e.g. /about/index.html) for cleaner static hosting.
  trailingSlash: true,
};

export default nextConfig;
