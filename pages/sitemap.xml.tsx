import React from "react";
import { getPosts } from "@/utils/posts";
import { PostsOrPages } from "@tryghost/content-api";
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
  routes: string[],
  posts?: PostsOrPages
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => toUrl(host, route, ["en"])).join("")}
    ${
      posts &&
      posts
        .map((blogPostSlug) =>
          toUrl(host, `/blog/${blogPostSlug.slug}`, ["en"])
        )
        .join("")
    }
    </urlset>
    `;

class Sitemap extends React.Component {
  static async getInitialProps({ res, req }) {
    const posts = (await getPosts()) as PostsOrPages | undefined;

    const pages = await globby([
      "pages/**/*{.js,.tsx,.mdx}",
      "!pages/_*.js",
      "!pages/blog/[postSlug].tsx",
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
    console.log(req.headers.host);

    res.setHeader("Content-Type", "text/xml");
    res.write(createSitemap("superfitapp.com", routes, posts));
    res.end();
  }
}

export default Sitemap;
