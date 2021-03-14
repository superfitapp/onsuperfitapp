import GhostContentAPI, { PostsOrPages } from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v3",
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getPost(slug: string) {
  return await api.posts
    .read(
      {
        slug: slug,
      },
      {
        include: ["authors"],
      }
    )
    .catch((err) => {
      console.error(err);
    });
}
