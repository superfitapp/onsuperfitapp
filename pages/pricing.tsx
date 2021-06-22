import Link from "next/link";
import Layout from "@/components/landing-layout";
import Curves from "@/partials/shapes/curves/curve-1.svg";
import AngleBottom from "@/partials/shapes/angles/angle-bottom.svg";
import AngleTop from "@/partials/shapes/angles/angle-top.svg";
import Blur3 from "@/partials/shapes/blurs/blur-3.svg";
import Image from "next/image";
import { useEffect } from "react";
import PersonalPro from "@/components/prices/personal-pro";
import Free from "@/components/prices/free";
import { NextSeo } from "next-seo";

export default function Pricing() {
  useEffect(() => {
    require("@/public/js/bigpicture");
    require("@/public/js/aos");
    require("@/public/js/pricing");
  }, []);

  return (
    <>
      <NextSeo
        title="Pricing | SuperFit"
        description="Pricing Plans"
        canonical="https://superfitapp.com/pricing"
        openGraph={{
          url: "https://superfitapp.com/pricing",
          title: "Pricing Plans",
          description:
            " Our basic plan and prices were designed to support as many fitness professionals during these times.",
          images: [
            { url: "https://superfitapp.com/img/photos/coin-piggy.jpg" },
          ],
          site_name: "SuperFit",
        }}
      />
      <Layout
        user={null}
        loading={false}
        navClassList="fixed-top navbar-expand-lg navbar-light bg-white"
        footerSectionClassList="bg-dark"
      >
        <div>
          <section className="pt-12 pt-md-14 pb-12 pb-md-14 bg-primary">
            <div className="shape shape-blur-3 svg-shim text-white">
              <Blur3 />
            </div>
            {/* Content */}
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 text-center">
                  {/* Heading */}
                  <h1 className="display-2 text-white">
                    Simple, fair pricing.
                  </h1>
                  {/* Text */}
                  <p className="lead text-white-80 mb-6 mb-md-8">
                    Our basic plan and prices were designed to support as many
                    fitness professionals during these times.
                  </p>
                  {/* Form */}
                  <form className="d-flex align-items-center justify-content-center mb-7 mb-md-9">
                    {/* Label */}
                    <span className="text-white-80">Annual</span>
                    {/* Switch */}
                    <div className="form-check form-check-dark form-switch mx-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="billingSwitch"
                        data-toggle="price"
                        data-target=".price"
                      />
                    </div>
                    {/* Label */}
                    <span className="text-white-80">Monthly</span>
                  </form>
                </div>
              </div>{" "}
              {/* / .row */}
            </div>{" "}
          </section>

          {/* SHAPE */}
          <div className="position-relative">
            <div className="shape shape-bottom shape-fluid-x svg-shim text-light">
              <AngleBottom />
            </div>
          </div>

          {/* PRICING */}
          <section className="mt-n12 mt-md-n14">
            <div className="container-fluid justify-content-center">
              <div className="row gx-4 px-2 px-lg-8">
                <div className="col-12 col-md-6">
                  <Free />
                </div>
                <div className="col-12 col-md-6">
                  <PersonalPro />
                </div>
              </div>{" "}
              {/* / .row */}
            </div>{" "}
            {/* / .container */}
          </section>
          {/* ENTERPRISE */}
          <section className="py-8 py-md-11">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 text-center">
                  {/* Badge */}
                  <span className="badge rounded-pill bg-primary-desat-soft mb-3">
                    <span className="h6 text-uppercase">Member Experience</span>
                  </span>
                  {/* Heading */}
                  <h2>
                    More features{" "}
                    <span className="fw-bold text-primary-desat">
                      for your members
                    </span>
                    .
                  </h2>
                  {/* Text */}
                  <p className="fs-lg text-muted mb-7 mb-md-9">
                    While your members never have to pay to use SuperFit, their
                    app experience is just as important to us.
                  </p>
                </div>
              </div>{" "}
              {/* / .row */}
              <div className="row">
                <div className="col-12 col-md-4 text-center">
                  {/* Icon */}
                  <div className="icon icon-lg text-info mb-3 svg-shim">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path d="M0 0h24v24H0z" />
                        <path
                          d="M12.374 19.939l5.849-8.773A.75.75 0 0017.599 10H13V4.477a.75.75 0 00-1.374-.416l-5.849 8.773A.75.75 0 006.401 14H11v5.523a.75.75 0 001.374.416z"
                          fill="#335EEA"
                        />
                      </g>
                    </svg>
                  </div>
                  {/* Heading */}
                  <h3>Fast Video Playback</h3>
                  {/* Text */}
                  <p className="text-muted mb-6 mb-md-0">
                    Uploaded exercise videos are optimized for global scale.
                    Video playback is blazing-fast and adapts to each device's
                    connection speed.
                  </p>
                </div>
                <div className="col-12 col-md-4 text-center">
                  {/* Icon */}
                  <div className="icon icon-lg text-info mb-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path d="M0 0h24v24H0z" />
                        <path
                          d="M7.39 2.835A10.466 10.466 0 0111.5 2C17.299 2 22 6.701 22 12.5S17.299 23 11.5 23 1 18.299 1 12.5c0-.985.136-1.938.39-2.842l1.925.54A8.509 8.509 0 003 12.5 8.5 8.5 0 1011.5 4c-.951 0-1.878.156-2.751.454l1.19 1.42a.5.5 0 01-.354.82l-4.867.276a.5.5 0 01-.515-.615l1.129-4.731a.5.5 0 01.869-.206L7.39 2.835z"
                          fill="#335EEA"
                          opacity=".3"
                        />
                        <path
                          d="M14.5 11a1 1 0 011 1v3a1 1 0 01-1 1h-5a1 1 0 01-1-1v-3a1 1 0 011-1v-.5a2.5 2.5 0 115 0v.5zM12 9a1.5 1.5 0 00-1.5 1.5v.5h3v-.5A1.5 1.5 0 0012 9z"
                          fill="#335EEA"
                        />
                      </g>
                    </svg>
                  </div>
                  {/* Heading */}
                  <h3>Secure Signup Forms</h3>
                  {/* Text */}
                  <p className="text-muted mb-6 mb-md-0">
                    Each workout schedule, if public, is hosted on a
                    SEO-optimized webpage. Visitors can seamless signup,
                    checkout or search through your workout library.
                  </p>
                </div>
                <div className="col-12 col-md-4 text-center">
                  {/* Icon */}
                  <div className="icon icon-lg text-info mb-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path d="M0 0h24v24H0z" />
                        <path
                          d="M4.223 4h15.614a3 3 0 012.987 2.726A46.12 46.12 0 0123 10.923c0 1.782-.08 3.564-.241 5.346A3 3 0 0119.771 19H4.223a3 3 0 01-2.987-2.72A51.277 51.277 0 011 11.5c0-1.51.079-3.104.236-4.78A3 3 0 014.223 4z"
                          fill="#335EEA"
                          opacity=".3"
                        />
                        <path
                          d="M11.182 14.805l4.404-3.01a.5.5 0 000-.824l-4.403-3.03a.5.5 0 00-.783.413v6.039a.5.5 0 00.782.412z"
                          fill="#335EEA"
                        />
                      </g>
                    </svg>
                  </div>

                  <h3>Video Previews</h3>
                  {/* Text */}
                  <p className="text-muted mb-0">
                    Uploaded exercise videos automatically generate thumbnails +
                    GIFs. Members can associate exercises to their movement
                    faster.
                  </p>
                </div>
              </div>{" "}
              {/* / .row */}
            </div>{" "}
            {/* / .container */}
          </section>
          {/* SHAPE */}
          <div className="position-relative">
            <div className="shape shape-bottom shape-fluid-x svg-shim text-dark">
              <Curves />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
