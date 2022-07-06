const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
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

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)

