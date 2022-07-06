const path = require("path");

module.exports = {
  // swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/terms",
        destination: "https://superfitapp.com/terms", // Matched parameters can be used in the destination
        basePath: false,
      },
    ];
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
  headers: [
    {
      source: "/api/show/*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=60, stale-while-revalidate",
        },
      ],
    },
  ],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "blog.superfitapp.com",
      "images.unsplash.com",
      "superfitapp.com",
      "firebasestorage.googleapis.com",
    ],
  },
  webpack(config, { isServer }) {
    // Fixes npm packages that depend on `fs` module

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        stream: false,
        os: false,
        crypto: false,
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
