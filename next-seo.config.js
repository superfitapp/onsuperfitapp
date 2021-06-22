const title = "SuperFit – where workouts are built.";
const description = "Build workouts programs and organize their fitness clients & groups.";
const SEO = {
  title,
  description,
  openGraph: {
    type: "website",
    locale: "en_IE",
    title,
    description,
    site_name: "SuperFit",
    images: [
      {
        url: "https://superfitapp.com/img/photos/og-image-1.jpg",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
  },
  twitter: {
    handle: "@onsuperfit",
    site: "@onsuperfit",
    cardType: "summary_large_image",
  },
};

export default SEO;
