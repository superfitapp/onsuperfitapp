const title = "SuperFit – where workouts are built.";
const description = "0% Commission Class Booking & Workout Builder Software";
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
