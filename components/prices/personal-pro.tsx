import { CountUp as Count } from "countup.js";

export default function PersonalPro() {
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
            <div className="text-center mb-5">
              <span className="badge rounded-pill bg-success-soft">
                <span className="h5 fw-bold text-uppercase">Personal Pro</span>
              </span>
            </div>
            {/* Price */}
            <div className="d-flex justify-content-center">
              <span className="h2 mb-0 mt-2">$</span>
              <span
                className="price display-2 mb-0"
                data-annual={30}
                data-monthly={40}
              >
                30
              </span>
              <span className="h2 align-self-end mb-1">/mo</span>
            </div>
            <p className="text-center text-success mb-6 mb-md-8">
              {/* paid monthly */}
            </p>
            {/* Features */}
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Everything in Basic</p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>
                <span className="fw-bold">Unlimited</span> workouts schedules
              </p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>
                <span className="fw-bold">Private</span> workouts & exercises
              </p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Priority Video Call Support</p>
            </div>
            <div className="d-flex">
              {/* Check */}
              <div className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
                <i className="fe fe-check" />
              </div>
              <p>Longer video upload limit (30 minutes)</p>
            </div>
          </div>
        </div>
      </div>
      <a
        href="https://on.superfitapp.com/pro?recurringInterval=month"
        className="card-btn btn w-100 btn-lg btn-success"
      >
        Get Personal Pro
      </a>
    </div>
  );
}
