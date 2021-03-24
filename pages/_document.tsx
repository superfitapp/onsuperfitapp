import Document, { Html, Head, Main, NextScript } from "next/document";
const isProduction = process.env.NODE_ENV === "production";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* GA */}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* Simple Analytics script */}
          <script
            async
            defer
            src="https://sa.superfitapp.com/latest.js"
          ></script>
          <noscript>
            <img src="https://sa.superfitapp.com/noscript.gif" alt="" />
          </noscript>

          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
                  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                  posthog.init('LyJRDTNSobDueUGmeWT-vXMFT8OpHdhVtjmQvAxnV_o',{api_host:'https://app.posthog.com'})
              `,
            }}
          /> */}

          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="#0c4979" name="theme-color" />
          <meta content="#0c4979" name="msapplication-TileColor" />
          <meta
            content="/favicons/browserconfig.xml"
            name="msapplication-config"
          />
          <link href="/favicons/favicon.ico" rel="shortcut icon" />
          <link href="/favicons/site.webmanifest" rel="manifest" />

          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com/"
            crossOrigin=""
          />
          <link
            href="/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            color="#4a9885"
            href="/favicons/safari-pinned-tab.svg"
            rel="mask-icon"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
