const path = require("path");
module.exports = {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
  images: {
    domains: ["blog.superfitapp.com", "images.unsplash.com", "superfitapp.com"],
  },
};
