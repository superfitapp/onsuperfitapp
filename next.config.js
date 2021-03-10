const path = require("path");
module.exports = {
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
  images: {
    domains: [
      "blog.superfitapp.com",
      "images.unsplash.com",
      "superfitapp.com",
      "firebasestorage.googleapis.com",
    ],
  },
};
