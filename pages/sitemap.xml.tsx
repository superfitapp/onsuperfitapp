import React from "react";
import globby from "globby";

const toUrl = (host, route, languages) =>
  languages
    .map(
      (lang) =>
        `<url><loc>https://${host}${
          lang === "en" ? "" : `/${lang}`
        }${route}</loc></url>`
    )
    .join("");

const createSitemap = (
  host: string,
  routes: string[]
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => toUrl(host, route, ["en"])).join("")}
    </urlset>
    `;

class Sitemap extends React.Component {
  static async getInitialProps({ res, req }) {
    const pages = await globby([
      "pages/**/*{.js,.tsx,.mdx}",
      "!pages/_*.js",
      "!pages/_*.tsx",
      "!pages/api",
    ]);

    const routes = pages.map((page) => {
      const path = page
        .replace("pages", "")
        .replace(".js", "")
        .replace(".tsx", "")
        .replace(".mdx", "");
      return path === "/index" ? "" : path;
    });

    res.setHeader("Content-Type", "text/xml");
    res.write(createSitemap("superfitapp.com", routes));
    res.end();
  }
}

export default Sitemap;
