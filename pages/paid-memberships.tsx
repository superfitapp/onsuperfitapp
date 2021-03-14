import Head from "next/head";
import Layout from "@/components/landing-layout";
import AngleBottom from "@/partials/shapes/angles/angle-bottom.svg";
import AngleTop from "@/partials/shapes/angles/angle-top.svg";
import { useEffect } from "react";
import { NextSeo } from "next-seo";

export default function PaidMemberships() {
  useEffect(() => {
    require("@/public/js/bigpicture");

    var script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = (e) => {
    e.preventDefault();
    const calendly = window["Calendly"];

    calendly.initPopupWidget({
      url:
        "https://calendly.com/superfit/commerce?back=1&month=2020-12text_color=20232a&primary_color=1f4975",
    });

    return false; // old browsers, may not be needed
  };

  return (
    <>
      <NextSeo
        title="Introducing Paid Fitness Memberships"
        description="Add payments to any workout schedule."
        canonical="https://superfitapp.com/paid-memberships"
        openGraph={{
          url: "https://superfitapp.com/paid-memberships",
          title: "Introducing Paid Fitness Memberships",
          description: "Add payments to any workout schedule.",
          images: [
            { url: "https://superfitapp.com/img/photos/coin-piggy.jpg" },
          ],
          site_name: "SuperFit",
        }}
      />

      <Layout
        user={null}
        loading={false}
        navClassList="navbar-dark navbar-expand-lg "
        footerSectionClassList="bg-dark"
      >
        <div>
          <section className="mt-n11 pt-12 pb-8 pt-md-14 pb-md-11 bg-primary bg-pattern-2">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10 text-center">
                  {/* Headin */}
                  <h1
                    className="display-4 mb-6 fw-bold text-white"
                    data-aos="fade-up"
                    data-aos-delay={50}
                  >
                    Offer paid memberships for your premium workout content
                  </h1>
                  {/* Text */}

                  <p
                    className="lead text-gray-500 mb-6 mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    Add payments to any workout schedule on SuperFit.
                  </p>
                  {/* Button */}
                  <p
                    className="mb-7 mb-md-9"
                    data-aos="fade-up"
                    data-aos-delay={150}
                  >
                    <a
                      href="#"
                      onClick={openCalendly}
                      className="btn btn-primary-desat shadow lift"
                    >
                      Upgrade to Commerce
                      <i className="fe fe-arrow-right ms-3" />
                    </a>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12" data-aos="fade-up" data-aos-delay={100}>
                  {/* <!-- Media --> */}
                  <div className="position-relative pt-3 pb-3 ps-3 pe-3 mb-7 mb-md-9 rounded-2 shadow-multicolor overflow-hidden">
                    <div className="position-absolute top-0 end-0 bottom-0 start-0 bg-gradient-multicolor"></div>

                    <div
                      className="position-relative img-fluid  py-12 py-md-13 bg-cover rounded-2 bg-light shadow-lg"
                      style={{
                        backgroundImage:
                          "url(/img/covers/bottom_wide_hero.jpg)",
                      }}
                    >
                      <div className="row">
                        <div className="col-12 text-center">
                          {/* Button */}
                          <a
                            className="btn btn-pill btn-white text-body shadow lift"
                            data-bigpicture='{"vimeoSrc": "399182178"}'
                            href="#"
                          >
                            <span className="h6 text-uppercase fw-bold">
                              <i className="fe fe-play me-2" /> See In Action
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                hidden
                className="row align-items-center justify-content-center"
              >
                <div className="col-12">
                  {/* Heading */}
                  <h6 className="text-uppercase text-center text-info mb-6">
                    TRUSTED BY PROFESSIONALS FROM
                  </h6>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mb-4 mb-md-0">
                  {/* Brand */}
                  <div className="img-fluid text-white mb-2 mb-md-0 svg-shim">
                    {"{"}
                    {"{"}&gt; logotype/airbnb{"}"}
                    {"}"}
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mb-4 mb-md-0">
                  {/* Brand */}
                  <div className="img-fluid text-white mb-2 mb-md-0 svg-shim">
                    {"{"}
                    {"{"}&gt; logotype/coinbase{"}"}
                    {"}"}
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mb-4 mb-md-0">
                  {/* Brand */}
                  <div className="img-fluid text-white mb-2 mb-md-0 svg-shim">
                    {"{"}
                    {"{"}&gt; logotype/dribbble{"}"}
                    {"}"}
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mb-4 mb-md-0">
                  {/* Brand */}
                  <div className="img-fluid text-white mb-2 mb-md-0 svg-shim">
                    {"{"}
                    {"{"}&gt; logotype/instagram{"}"}
                    {"}"}
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mb-4 mb-md-0">
                  {/* Brand */}
                  <div className="img-fluid text-white mb-2 mb-md-0 svg-shim">
                    {"{"}
                    {"{"}&gt; logotype/netflix{"}"}
                    {"}"}
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-md-2 mb-4 mb-md-0">
                  {/* Brand */}
                  <div className="img-fluid text-white mb-2 mb-md-0 svg-shim">
                    {"{"}
                    {"{"}&gt; logotype/pinterest{"}"}
                    {"}"}
                  </div>
                </div>
              </div>{" "}
              {/* / .row */}
            </div>{" "}
            {/* / .container */}
          </section>
          {/* SHAPE */}

          <div>
            {/* STEPS */}
            <div className="position-relative mt-n12 mt-md-n15">
              <div className="shape shape-bottom shape-fluid-x svg-shim text-black">
                <AngleBottom />
              </div>
            </div>

            {/* STEPS */}
            <div className="section bg-black pt-12 pt-md-15 pb-8 pb-md-11">
              <div className="container">
                <div className="row justify-content-between align-items-center mb-5">
                  <div className="col-12 col-md-4 order-md-2 text-center">
                    {/* Image */}
                    <img
                      className="img-fluid w-75 w-md-100 mb-6 mb-md-0"
                      src="/img/photos/coin-piggy.png"
                      alt="..."
                    />
                  </div>
                  <div className="col-12 col-md-7 order-md-1">
                    {/* Heading */}
                    <h2 className="text-white" style={{ maxWidth: "450px" }}>
                      Get Started with Commerce.
                    </h2>
                    {/* Text */}
                    <div className="lead text-muted-80 mb-0">
                      Setting up secure payments with Stripe can be cumbersome.
                      That's why we personally onboard every customer on our
                      Commerce plan (required for paid memberships).
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="row">
                      <div className="col-auto col-md-12">
                        {/* Step */}
                        <div className="row gx-0 align-items-center mb-md-5">
                          <div className="col-auto">
                            {/* Number */}
                            <a
                              className="btn btn-sm btn-rounded-circle btn-gray-400-10 disabled opacity-1"
                              href="#!"
                            >
                              <span>1</span>
                            </a>
                          </div>
                          <div className="col">
                            {/* Divider */}
                            <hr className="d-none d-md-block bg-gray-900-50 me-n7" />
                          </div>
                        </div>{" "}
                        {/* / .row */}
                      </div>
                      <div className="col col-md-12 ms-n5 ms-md-0">
                        {/* Heading */}
                        <h3 className="text-white">Sign up for Personal Pro</h3>
                        {/* Text */}
                        <p className="text-muted-80 mb-6 mb-md-0">
                          Accepting Payments is an add-on to our Personal Pro
                          plan. Don't worry, you can try our free tier first
                          before upgrading.
                        </p>
                      </div>
                    </div>{" "}
                    {/* / .row */}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="row">
                      <div className="col-auto col-md-12">
                        {/* Step */}
                        <div className="row gx-0 align-items-center mb-md-5">
                          <div className="col-auto">
                            {/* Number */}
                            <a
                              href="#!"
                              className="btn btn-sm btn-rounded-circle btn-gray-400-10 disabled opacity-1"
                            >
                              <span>2</span>
                            </a>
                          </div>
                          <div className="col">
                            {/* Divider */}
                            <hr className="d-none d-md-block bg-gray-900-50 me-n7" />
                          </div>
                        </div>{" "}
                        {/* / .row */}
                      </div>
                      <div className="col col-md-12 ms-n5 ms-md-0">
                        {/* Heading */}
                        <h3 className="text-white">Onboarding Call</h3>
                        {/* Text */}
                        <p className="text-muted-80 mb-6 mb-md-0">
                          After upgrading, schedule a personal 45-minute Zoom
                          call to get set up your Commerce account. We'll also
                          walk you through best practices for building fitness
                          memberships.
                        </p>
                      </div>
                    </div>{" "}
                    {/* / .row */}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="row">
                      <div className="col-auto col-md-12">
                        {/* Step */}
                        <div className="row gx-0 align-items-center mb-md-5">
                          <div className="col-auto">
                            {/* Number */}
                            <a
                              href="#!"
                              className="btn btn-sm btn-rounded-circle btn-gray-400-10 disabled opacity-1"
                            >
                              <span>3</span>
                            </a>
                          </div>
                        </div>{" "}
                        {/* / .row */}
                      </div>
                      <div className="col col-md-12 ms-n5 ms-md-0">
                        {/* Heading */}
                        <h3 className="text-white">Start Charging 💸</h3>
                        {/* Text */}
                        <p className="text-muted-80 mb-0">
                          Once complete, you can start charging a monthly
                          subscription or a lifetime membership for access to
                          your workout schedules.
                        </p>
                      </div>
                    </div>{" "}
                    {/* / .row */}
                  </div>
                </div>
              </div>{" "}
              {/* / .container*/}
            </div>
            {/* STEPS */}
            <div className="position-relative">
              <div className="shape shape-top shape-fluid-x shape-flip-x svg-shim text-black">
                <AngleTop />
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <section className="bg-gradient-dark-black py-8 py-md-11">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-7 text-center">
                  {/* Heading */}

                  <h2 className="display-3 fw-bold text-white">
                    Created For <br />
                    <span className="text-warning">Independent</span> <br />
                    Trainers & Instructors.
                  </h2>
                  {/* Text */}
                  <p className="lead text-muted mb-9">
                    We built tools that helps fitness professionals earn money.
                  </p>
                </div>
              </div>{" "}
              <div className="row mt-n7">
                <div className="col-12 col-sm-6 col-lg-4 mt-7">
                  {/* Card */}
                  <div className="card h-100 bg-dark rounded-3">
                    <div className="card-body p-5">
                      {/* Heading */}
                      <h3 className="fw-bold text-white">
                        Flexible Payment Options
                      </h3>
                      {/* Text */}
                      <p className="text-muted mb-0">
                        Charge monthly subscriptions or a one-time payments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4 mt-7">
                  {/* Card */}
                  <div className="card h-100 bg-dark rounded-3">
                    <div className="card-body p-5">
                      {/* Heading */}
                      <h3 className="fw-bold text-white">Customize Branding</h3>
                      {/* Text */}
                      <p className="text-muted mb-0">
                        Let your brand icon, images and color shine in the app.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4 mt-7">
                  {/* Card */}
                  <div className="card h-100 bg-dark rounded-3">
                    <div className="card-body p-5">
                      {/* Heading */}
                      <h3 className="fw-bold text-white">Calendar View</h3>
                      {/* Text */}
                      <p className="text-muted mb-0">
                        Manage your paying clients and groups in one simple
                        view.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4 mt-7">
                  {/* Card */}
                  <div className="card h-100 bg-dark rounded-3">
                    <div className="card-body p-5">
                      {/* Heading */}
                      <h3 className="fw-bold text-white">
                        Simple Signup Forms
                      </h3>
                      {/* Text */}
                      <p className="text-muted mb-0">
                        Share Stripe-hosted signup forms for your premium
                        content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4 mt-7">
                  {/* Card */}
                  <div className="card h-100 bg-dark rounded-3">
                    <div className="card-body p-5">
                      {/* Heading */}
                      <h3 className="fw-bold text-white">
                        Stock Photo Library
                      </h3>
                      {/* Text */}
                      <p className="text-muted mb-0">
                        Pick Unsplash photos in-app when you're short on
                        content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4 mt-7">
                  {/* Card */}
                  <div className="card h-100 bg-dark rounded-3">
                    <div className="card-body p-5">
                      {/* Heading */}
                      <h3 className="fw-bold text-white">Premium Experience</h3>
                      {/* Text */}
                      <p className="text-muted mb-0">
                        Selling a digital service is hard. SuperFit helps extend
                        your professional branding.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4 mt-7">
                  {/* Card */}
                  <div className="card h-100 bg-dark rounded-3">
                    <div className="card-body p-5">
                      {/* Heading */}
                      <h3 className="fw-bold text-white">Fair Pricing</h3>
                      {/* Text */}
                      <p className="text-muted mb-0">
                        One price for unlimited clients and schedules. We
                        receive 2% revenue share.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4 mt-7">
                  {/* Card */}
                  <div className="card h-100 bg-dark rounded-3">
                    <div className="card-body p-5">
                      {/* Heading */}
                      <h3 className="fw-bold text-white">For large groups</h3>
                      {/* Text */}
                      <p className="text-muted mb-0">
                        Manage who's paying. No need to keep mental tabs on
                        missed payments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4 mt-7">
                  {/* Card */}
                  <div className="card h-100 bg-dark rounded-3">
                    <div className="card-body p-5">
                      {/* Heading */}
                      <h3 className="fw-bold text-white">Powered by Stripe</h3>
                      {/* Text */}
                      <p className="text-muted mb-0">
                        Stripe is the leading payment processor for companies
                        like Peloton, Lyft and{" "}
                        <a
                          target="javascript:(void);"
                          href="https://stripe.com/customers"
                          className="text-success"
                        >
                          more
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="pt-4 pb-12 bg-black">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 text-center">
                  {/* Pretitle */}
                  <h6 className="text-uppercase text-info mb-6">
                    Paid Memberships
                  </h6>
                  {/* Heading */}
                  <h1 className="display-1 fw-bold text-white">
                    Manage your fitness clients on SuperFit.
                  </h1>
                  {/* Text */}
                  <p className="fs-lg text-gray-500 mb-6 mb-md-8">
                    Stay focused on growing clients and let us handle the
                    software, tools and payments.
                  </p>
                  {/* Button */}
                  <a
                    href="#"
                    onClick={openCalendly}
                    className="btn btn-info lift"
                  >
                    Upgrade to Commerce <i className="fe fe-arrow-right ms-2" />
                  </a>
                </div>
              </div>{" "}
              {/* / .row */}
            </div>{" "}
            {/* / .container */}
          </section>
          {/* BORDER */}
          <div className="bg-black">
            <div className="container border-top border-gray-900-50" />
          </div>
        </div>

        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        ></link>
      </Layout>
    </>
  );
}
