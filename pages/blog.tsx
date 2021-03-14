import Layout from "@/components/landing-layout";
import Curves from "@/partials/shapes/curves/curve-1.svg";
import Curves3 from "@/partials/shapes/curves/curve-3.svg";
import { getPosts } from "@/utils/posts";
import { PostsOrPages } from "@tryghost/content-api";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(relativeTime);
dayjs.extend(calendar);
import "dayjs/locale/en"; // import locale

function Blog(props: { posts: PostsOrPages }) {
  if (!props.posts) {
    return (
      <Layout
        user={null}
        loading={false}
        navClassList="navbar-light bg-white navbar-expand-lg "
        footerSectionClassList="bg-dark"
      >
        <div></div>
      </Layout>
    );
  }

  return (
    <>
      <NextSeo
        title="SuperFit Blog"
        description="Insights, news and growth strategies for today’s fitness."
        openGraph={{
          title: "SuperFit Blog",
          description:
            "Insights, news and growth strategies for today’s fitness.",
          images: [
            {
              url: "https://superfitapp.com/img/covers/superfit_blog_cover.jpg",
            },
          ],
          site_name: "SuperFit",
        }}
      />

      <Layout
        user={null}
        loading={false}
        navClassList="fixed-top navbar-expand-lg navbar-light bg-white"
        footerSectionClassList="bg-dark"
      >
        <section
          data-jarallax
          data-speed=".8"
          className="pt-12 pb-8 pt-md-14 pb-md-12 overlay overlay-black overlay-60 bg-cover jarallax"
          style={{
            backgroundImage: "url(/img/covers/superfit_blog_cover.jpg)",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-7 text-center">
                {/* Heading */}
                <h1 className="display-2 fw-bold text-white">SuperFit Blog</h1>
                {/* Text */}
                <p className="lead mb-0 text-white-75">
                  Insights, news and growth strategies for today’s fitness
                  professional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SHAPE */}
        <div className="position-relative">
          <div className="shape shape-bottom shape-fluid-x svg-shim text-light">
            <Curves />
          </div>
        </div>

        {/* ARTICLES */}
        <section className="pt-7 pt-md-10">
          <div className="container">
            <div className="row align-items-center mb-5">
              <div className="col-12 col-md">
                {/* Heading */}
                <h3 className="mb-0">Latest Stories</h3>
                {/* Text */}
                <p className="mb-0 text-muted">
                  Here’s what we've been up to recently.
                </p>
              </div>
            </div>
            <div className="row">
              {props.posts.map((post) => (
                <div
                  key={post.id}
                  className="col-12 col-md-6 col-lg-4 d-flex my-2"
                >
                  {/* Card */}
                  <div className="card mb-6 mb-lg-0 shadow-light-lg lift lift-lg">
                    {/* Image */}

                    <Link
                      href={`/blog/${encodeURIComponent(post.slug)}`}
                      passHref
                    >
                      <a className="card-img-top">
                        {/* Image */}
                        <Image
                          src={post.feature_image}
                          alt="..."
                          className="card-img-top"
                          height="250"
                          width="450"
                          layout="responsive"
                          objectFit="cover"
                        />
                        {/* Shape */}
                        <div className="position-relative">
                          <div className="shape shape-bottom shape-fluid-x svg-shim text-white">
                            <Curves3 />
                          </div>
                        </div>
                      </a>
                    </Link>

                    {/* Body */}
                    <Link
                      href={`/blog/${encodeURIComponent(post.slug)}`}
                      passHref
                    >
                      <a className="card-body">
                        {/* Heading */}
                        <h3>{post.title.substring(0, 60) + "..."}</h3>
                        {/* Text */}
                        <p className="mb-0 text-muted">
                          {post.excerpt?.substring(0, 90) + "..."}
                        </p>
                      </a>
                    </Link>

                    {/* Meta */}
                    <Link
                      href={`/blog/${encodeURIComponent(post.slug)}`}
                      passHref
                    >
                      <a className="card-meta mt-auto">
                        {/* Divider */}
                        <hr className="card-meta-divider" />
                        {/* Avatar */}

                        {post.authors && post.authors[0] && (
                          <div className="avatar avatar-sm me-2">
                            <Image
                              src={post.authors[0].profile_image}
                              alt="..."
                              className="avatar-img rounded-circle"
                              height="100"
                              width="100"
                            />
                          </div>
                        )}

                        {/* Author */}
                        {post.authors && post.authors[0] && (
                          <h6 className="text-uppercase text-muted me-2 mb-0">
                            {post.authors[0].name}
                          </h6>
                        )}

                        {/* Date */}
                        <p className="h6 text-uppercase text-muted mb-0 ms-auto">
                          <time>
                            {dayjs(new Date(post.published_at)).fromNow()}
                          </time>
                        </p>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SHAPE */}
        <div className="position-relative">
          <div className="shape shape-bottom shape-fluid-x svg-shim text-gray-200">
            <Curves />
          </div>
        </div>
        {/* CTA */}
        <section className="pt-6 pt-md-8 bg-gray-200">
          <div className="container pb-6 pb-md-8 border-bottom border-gray-300">
            <div className="row align-items-center">
              <div className="col-12 col-md">
                {/* Heading */}
                <h3 className="mb-1 fw-bold">Get our stories delivered</h3>
                {/* Text */}
                <p className="font-size-lg text-muted mb-6 mb-md-0">
                  From us to your inbox weekly.
                </p>
              </div>
              <div className="col-12 col-md-3">
                <div className="row">
                  <a
                    target="_blank"
                    href="https://blog.superfitapp.com/newsletter"
                    className="btn btn-primary"
                  >
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

/**
 *
 * https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
 */

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const posts: PostsOrPages | void = await getPosts();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default Blog;
