export default function Commerce() {
  return (
    <div
      className="card rounded-lg shadow"
      data-aos="fade-in"
      data-aos-delay="200"
    >
      <div className="card-body py-6 py-md-8">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            {/* Badge */}
            <div className="text-center mb-5">
              <span className="badge rounded-pill bg-primary-soft">
                <span className="h5 fw-bold text-uppercase">
                  Commerce Add-On
                </span>
              </span>
            </div>

            {/* Price */}
            <div className="d-flex justify-content-center">
              <span className="h1 fw-bolder mb-0 mt-2">+</span>
              <span className="h2 mb-0 mt-2">$</span>
              <span
                className="price display-2 mb-0"
                data-annual={10}
                data-monthly={15}
              >
                10
              </span>
              <span className="h2 align-self-end mb-1">/mo</span>
            </div>
            <p className="text-center text-success mb-6 mb-md-8">
              {/* paid monthly */}
            </p>
            {/* Features */}
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-primary-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Requires Personal Pro</p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-primary-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Integrated billing with Stripe</p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-primary-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Offer memberships & one-time purchases</p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-primary-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Personal Onboarding with Stripe</p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-primary-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>
                Zero Commissions - Earn 100% Profit
                <a
                  target="_blank"
                  className="text-gray-800 fw-bold"
                  href="https://www.patreon.com/product/pricing"
                >
                 {" "} (vs. Patreon's ~10%)
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Button */}
      <a
        href="paid-memberships"
        className="card-btn btn w-100 btn-lg btn-light bg-primary text-gray-200"
      >
        Learn More
      </a>
    </div>
  );
}
