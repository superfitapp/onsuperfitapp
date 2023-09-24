import Clipboard from "@/partials/icons/duotone-icons/general/clipboard.svg";
import Dollar from "@/partials/icons/duotone-icons/shopping/dollar.svg";
const isProduction = process.env.NODE_ENV === "production";
import Head from "next/head";

interface NavInit {
  user?: any;
  loading: boolean;
  containerClass: string;
  navClassList: string;
}

function LandingNav({ user, loading, containerClass, navClassList }: NavInit) {
  return (
    <>
      <Head>
        {isProduction && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5V6J7GG');
              `,
              }}
            />
          </>
        )}
      </Head>
      <nav className={"navbar " + navClassList}>
        <div className={containerClass}>
          {/* Brand */}
          <a href="/" className="navbar-brand">
            <img
              src="/img/brand.svg"
              className="navbar-brand-img me-2"
              alt="SuperFit icon"
            />
            SuperFit
          </a>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {/* Toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fe fe-x" />
            </button>
            <a
              className="navbar-btn btn btn-sm btn-success lift ms-auto"
              href="https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126"
              target="_blank"
            >
              Get SuperFit Free
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LandingNav;
