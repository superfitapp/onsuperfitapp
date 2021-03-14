import AuthorRow from "@/components/author-row";
import Layout from "@/components/landing-layout";
import { getPost, getPosts } from "@/utils/posts";
import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import { NextSeo } from "next-seo";
import { useEffect } from "react";

function BlogPost(props: { post: PostOrPage }) {
  if (!props.post) {
    return (
      <Layout
        user={null}
        loading={false}
        navClassList="fixed-top navbar-expand-lg navbar-light bg-white"
        footerSectionClassList="bg-dark"
      >
        <div></div>
      </Layout>
    );
  }

  let featureImageUrl = props.post.feature_image
    ? `url(${props.post.feature_image})`
    : null;

  useEffect(() => {
    var link = document.createElement("link");
    link.href = "/css/ghost.css";
    link.rel = "stylesheet";
    document.body.appendChild(link);
  }, []);

  let title = props.post.meta_title;
  let description = props.post.meta_description;

  let og_title = props.post.og_title;
  let og_description = props.post.og_description;
  let og_image = props.post.feature_image;
  let baseUrl = "https://superfitapp.com";
  let canonical = `${baseUrl}/blog/${props.post.slug}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        titleTemplate="%s | SuperFit Blog"
        canonical={canonical}
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: baseUrl,
          title: og_title,
          description: og_description,
          site_name: "SuperFit Blog",
          images: [
            {
              url: og_image,
              width: 800,
              height: 500,
              alt: "Og Image Alt",
            },
          ],
        }}
      />
      <Layout
        user={null}
        loading={false}
        navClassList="fixed-top navbar-expand-lg navbar-light bg-white"
        footerSectionClassList="bg-dark"
      >
        <div>
          {/* IMAGE */}
          {featureImageUrl && (
            <section
              data-jarallax
              data-speed=".8"
              className="py-12 py-md-15 bg-cover jarallax"
              style={{ backgroundImage: featureImageUrl }}
            />
          )}

          {/* HEADER */}
          <section className="pt-8 pt-md-11">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-9 col-xl-8">
                  {/* Heading */}
                  {props.post.title && (
                    <h1 className="display-4 text-center">
                      {props.post.title}
                    </h1>
                  )}

                  {/* Text */}
                  <p className="lead mb-7 text-center text-muted">
                    {props.post.excerpt}
                  </p>
                  {/* Meta */}
                  <AuthorRow {...props.post}></AuthorRow>
                </div>
              </div>{" "}
              {/* / .row */}
            </div>{" "}
            {/* / .container */}
          </section>

          <section className="pt-6 pt-md-8 ">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-9 col-xl-8">
                  <div
                    className="m-article-content"
                    dangerouslySetInnerHTML={{ __html: props.post.html }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION */}
          <section className="pt-6 pt-md-8 pb-8 pb-md-11">
            <div className="container">
              <AuthorRow {...props.post}></AuthorRow>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const posts: PostsOrPages | void = await getPosts();

  if (!posts) {
    return {
      paths: [],
      fallback: true,
    };
  }

  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: posts.map((post) => {
      return {
        params: {
          postSlug: post.slug,
        },
      };
    }),
    // paths: [{ params: { postSlug: "1" } }, { params: { id: "2" } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { postSlug } = params;
  if (!postSlug) {
    return {
      props: null,
      revalidate: 1,
    };
  }

  const post: PostOrPage | void = await getPost(postSlug);

  return {
    props: {
      post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default BlogPost;
