import Link from "next/link";

function Footer({ user, loading, footerSectionClassList, footerClassList }) {
  return (
    <section className={footerSectionClassList}>
      <footer className={"py-8 py-md-11 " + footerClassList}>
        <div className="container ">
          {/* Download App */}
          <div className="row align-items-center mb-10">
            <div className="col-12 col-md">
              {/* Logo */}
              <img
                src="/img/brand.svg"
                alt="..."
                className="navbar-brand-img img-fluid mb-2"
              />

              {/* Heading */}
              <h3 className="fw-bold mb-1 text-white">
                Download the free app!
              </h3>
              {/* Text */}
              <p className="text-muted mb-6 mb-md-0">
                The fitness platform where workouts are built.
              </p>
            </div>
            <div className="col-auto">
              <Link href="https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126">
                <a className="text-reset d-inline-block me-1">
                  <img
                    src="/img/buttons/button-app.png"
                    className="img-fluid"
                    alt="..."
                    style={{ maxWidth: "155px" }}
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col-6 col-md-4 col-lg-2">
              {/* Heading */}
              <h6 className="fw-bold text-uppercase text-gray-700">Product</h6>
              {/* List */}
              <ul className="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
                {/* <li className="mb-3">
                  <a href="/paid-memberships" className="text-reset">
                    Paid Memberships
                  </a>
                </li> */}
                <li className="mb-3">
                  <a
                    target="_blank"
                    href="https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126"
                    className="text-reset"
                  >
                    Workout Builder
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="https://blog.superfitapp.com"
                    className="text-reset"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              {/* Heading */}
              <h6 className="fw-bold text-uppercase text-gray-700">Legal</h6>
              {/* List */}
              <ul className="list-unstyled text-muted mb-0">
                <li className="mb-3">
                  <a href="/terms" className="text-reset">
                    Terms of Service
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/privacy-policy" className="text-reset">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-auto">
              {/* Social */}
              <ul className="list-unstyled list-inline list-social mb-6 mb-md-0">
                <li className="list-inline-item list-social-item me-3">
                  <a
                    target="_blank"
                    href="https://www.instagram.com/onsuperfit"
                    className="text-decoration-none"
                  >
                    <img
                      src="/img/icons/social/instagram.svg"
                      className="list-social-icon"
                      alt="..."
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
