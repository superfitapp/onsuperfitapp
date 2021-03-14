import "@/styles/styles.scss";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
