export default function Free() {
  return (
    <div
      className="card rounded-lg shadow mb-6 mb-md-0"
      style={{ zIndex: 1 }}
      data-aos="fade-up"
    >
      {/* Body */}
      <div className="card-body py-6 py-md-8">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-9">
            {/* Badge */}
            {/* Badge */}
            <div className="text-center mb-5">
              <span className="badge rounded-pill bg-info-soft">
                <span className="h5 fw-bold text-uppercase">Basic</span>
              </span>
            </div>
            {/* Price */}
            <div className="d-flex justify-content-center">
              <span className="display-2 text-gray-700 mb-0">Free</span>
            </div>
            <p className="text-center text-success mb-6 mb-md-8">
              {/* paid monthly */}
            </p>
            {/* Features */}

            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-info-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Mobile workout builder</p>
            </div>

            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-info-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>
                Unlimited <span className="fw-bold">public</span> workouts
              </p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-info-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>1 workout schedule</p>
            </div>
            
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-info-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Unlimited members</p>
            </div>

            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-info-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Upload custom exercises</p>
            </div>
            <div className="d-flex">
              <div className="badge badge-rounded-circle bg-info-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Big community exercise library</p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-info-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Youtube video link integration</p>
            </div>
          </div>
        </div>
      </div>
      {/* Button */}
      <a
        target="_blank"
        href="https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126"
        className="card-btn btn w-100 btn-lg btn-primary-soft"
      >
        Get it now
      </a>
    </div>
  );
}
