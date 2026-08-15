/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // There is no Russian landing page — /ru exists only as the stable
      // prefix the lectures live under, so that real i18n can later move
      // Russian pages here without breaking links already in circulation.
      // Temporary (307) rather than permanent: a /ru index may yet appear,
      // and a cached 308 would be very hard to take back.
      { source: "/ru", destination: "/ru/lectures", permanent: false },
    ];
  },
};

export default nextConfig;
