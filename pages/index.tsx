import Curves from "@/partials/shapes/curves/curve-1.svg";
import { LinkBox, LinkOverlay } from '@chakra-ui/react'
import Layout from "@/components/landing-layout";
import AngleBottom from "@/partials/shapes/angles/angle-bottom.svg";
import AngleTop from "@/partials/shapes/angles/angle-top.svg";
import Image from "next/image";
import { useEffect } from "react";
import PersonalPro from "@/components/prices/personal-pro";
import Free from "@/components/prices/free";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export type ReadingTypes = "some" | "variants" | "of" | "strings";

interface Boop {
  type: ReadingTypes;
}

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    require("@/public/js/bigpicture");
    require("@/public/js/pricing");
  }, []);

  return (
    <>
      <NextSeo canonical="https://superfitapp.com" />
      <Layout
        user={null}
        loading={false}
        navClassList="fixed-top navbar-expand-lg navbar-light bg-white"
        footerSectionClassList="pt-15 pt-lg-14 bg-dark"
      >
        {/* WELCOME */}
        <section className="pt-12 pb-8 pt-md-14 pb-md-12">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8 text-center">
                {/* Headin */}
                <h1 className="display-3 fw-bold">
                  SuperFit helps solo trainers build workouts programs and
                  organize their fitness clients & groups.
                </h1>
                <p className="lead text-muted mb-6">
                  Works seamlessly across your iPhone, iPad and Mac.
                </p>
                <p className="mb-7 mb-md-9">
                  <a
                    target="_blank"
                    className="btn btn-success shadow lift"
                    href="https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126"
                  >
                    Start For Free
                    <i className="fe fe-arrow-right ms-3" />
                  </a>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div
                  className="py-12 py-md-13 bg-cover rounded-3 bg-light shadow-lg"
                  style={{
                    backgroundImage:
                      "url(/img/covers/workout_builder_cover.jpg)",
                  }}
                >
                  <div className="row">
                    <div className="col-12 text-center">
                      {/* Button */}
                      <a
                        className="btn btn-pill btn-white text-body shadow lift"
                        data-bigpicture='{"vimeoSrc": "496499273"}'
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
        </section>

        <div>
          {/* STEPS */}
          <div className="position-relative mt-n12 mt-md-n15">
            <div className="shape shape-bottom shape-fluid-x svg-shim text-info">
              <AngleBottom />
            </div>
          </div>

          {/* STEPS */}
          <div className="section bg-info pt-12 pt-md-15 pb-8 pb-md-11">
            <div className="container-fluid">
              <div className="row align-items-center justify-content-around">
                <div className="col-12 col-md-6 mb-5 mb-md-0">
                  <div className="row">
                    <div className="col-6 me-n5">
                      <Image
                        src="/img/photos/carousel-2.jpg"
                        alt="workout builder screenshot"
                        className="img-fluid rounded"
                        height="550"
                        width="500"
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>
                    <div className="col-6 mt-8">
                      <Image
                        src="/img/photos/carousel-1.jpg"
                        alt="workout builder screenshot"
                        className="img-fluid rounded"
                        height="700"
                        width="500"
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-5" data-aos="fade-left">
                  {/* Heading */}
                  <h2 className="display-3 fw-bold text-white">
                    Build workouts at the speed of thought.
                  </h2>
                  <p className="font-size-lg text-white mb-4">
                    Exercises filter as you search. Upload custom exercises, or
                    select preset instructions from our library.
                  </p>
                  {/* Button */}
                  <a
                    className="btn btn-pill btn-primary shadow lift"
                    data-bigpicture='{"vimeoSrc": "496493129" }'
                    href="#"
                  >
                    <span className="h6 text-uppercase fw-bold">
                      <i className="fe fe-play me-2" /> Watch App Preview
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="position-relative">
            <div className="shape shape-top shape-fluid-x shape-flip-x svg-shim text-info">
              <AngleTop />
            </div>
          </div>
        </div>

        <div>
          {/* FLEXIBILITY */}
          <section className="pt-8 pt-md-11 bg-gradient-light">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 text-center">
                  {/* Badge */}
                  <span className="badge rounded-pill bg-success-soft mb-3">
                    <span className="h6 text-uppercase">Built on SuperFit</span>
                  </span>
                  {/* Heading */}
                  <h1>View Examples</h1>
                  <p className="font-size-lg text-gray-700 mb-5 mb-md-7">
                    SuperFit works for many fitness spaces. From home-pilates
                    routines to traditional strength regimens, you can build the
                    workout on our app.
                  </p>
                </div>
              </div>

              <div className="row d-flex align-items-stretch">
                <LinkBox as='div' className="col-12 col-md-4 my-2" data-aos="fade-up">
                  <div className="card h-80 shadow-light-lg mb-6 mb-md-0 lift lift-lg">
                    <Image
                      src="/img/photos/workout_with_me_teigan.jpg"
                      alt="In the Living Room"
                      className="card-img-top"
                      height="300"
                      width="500"
                      layout="responsive"
                      objectFit="cover"
                    />
                    {/* Shape */}
                    <div className="position-relative">
                      <div className="shape shape-bottom shape-fluid-x svg-shim text-white">
                        <Curves />
                      </div>
                    </div>
                    {/* Body */}
                    <div className="card-body position-relative">
                      {/* Badge */}
                      <div className="position-relative text-end mt-n8 me-n4 mb-3">
                        <span className="badge rounded-pill bg-black">
                          <span className="h6  text-uppercase">
                            Strength Training
                          </span>
                        </span>
                      </div>
                      {/* Heading */}
                      <h3>Workout With Me</h3>
                      <p className="text-muted">
                        Athletic gym & home workouts with Teigan Schentrup
                      </p>
                      {/* Link */}
                      <LinkOverlay target="_blank"
                        href="/s/JEdei0mWkw9BLhCCkcFo"
                        className="fw-bold text-decoration-none">
                        View Schedule <i className="fe fe-arrow-right ms-3" />
                      </LinkOverlay>
                    </div>
                  </div>
                </LinkBox>

                <LinkBox as='div'
                  className="col-12 col-md-4 my-2"
                  data-aos-delay="100"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-duration="1000"
                >
                  {/* Card */}
                  <div className="card h-80 shadow-light-lg mb-6 mb-md-0 lift lift-lg">
                    <Image
                      src="/img/photos/in-the-living-room.jpg"
                      alt="In the Living Room"
                      className="card-img-top"
                      height="300"
                      width="500"
                      layout="responsive"
                      objectFit="cover"
                    />
                    {/* Shape */}
                    <div className="position-relative">
                      <div className="shape shape-bottom shape-fluid-x svg-shim text-white">
                        <Curves />
                      </div>
                    </div>

                    <div className="card-body position-relative">
                      {/* Badge */}
                      <div className="position-relative text-end mt-n8 me-n4 mb-3">
                        <span className="badge rounded-pill bg-warning">
                          <span className="h6 text-uppercase">
                            At-Home Workouts
                          </span>
                        </span>
                      </div>
                      {/* Heading */}
                      <h3>In The Living Room</h3>
                      <p className="text-muted">
                        Full body at-home fitness with Iyoha Agho
                      </p>
                      <LinkOverlay target="_blank"
                        href="/s/gs5WICdat2WLXw3EYS3g"
                        className="fw-bold text-decoration-none">
                        View Schedule <i className="fe fe-arrow-right ms-3" />
                      </LinkOverlay>
                    </div>
                  </div>
                </LinkBox>

                <LinkBox as='div'
                  className="col-12 col-md-4 my-2"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  {/* Card */}
                  <div className="card h-80 shadow-light-lg mb-6 mb-md-0 lift lift-lg">
                    <Image
                      src="/img/photos/sports-performance.jpg"
                      alt="sports performance"
                      className="card-img-top"
                      height="300"
                      width="500"
                      layout="responsive"
                      objectFit="cover"
                    />
                    {/* Shape */}
                    <div className="position-relative">
                      <div className="shape shape-bottom shape-fluid-x svg-shim text-white">
                        <Curves />
                      </div>
                    </div>
                    {/* Body */}
                    <div className="card-body position-relative">
                      {/* Badge */}
                      <div className="position-relative text-end mt-n8 me-n4 mb-3">
                        <span className="badge rounded-pill bg-secondary">
                          <span className="h6 text-uppercase">
                            Sports Coaching
                          </span>
                        </span>
                      </div>
                      {/* Heading */}
                      <h3>Elite Sports Performance</h3>
                      <p className="text-muted">
                        Athletic workouts to help you decrease risk of injury,
                        develop strength and build confidence.
                      </p>
                      <LinkOverlay target="_blank"
                        href="/s/603dbrFWGk5V2bZYHm0W"
                        className="fw-bold text-decoration-none">
                        View Schedule <i className="fe fe-arrow-right ms-3" />
                      </LinkOverlay>
                    </div>
                  </div>
                </LinkBox>

                <LinkBox as='div'
                  className="col-12 col-md-4 my-2" data-aos="fade-up">
                  <div className="card h-80 shadow-light-lg mb-6 mb-md-0 lift lift-lg">
                    <Image
                      src="/img/photos/train_with_teigs.jpg"
                      alt="Train with Teigs Premium"
                      className="card-img-top"
                      height="300"
                      width="500"
                      layout="responsive"
                      objectFit="cover"
                    />

                    {/* Shape */}
                    <div className="position-relative">
                      <div className="shape shape-bottom shape-fluid-x svg-shim text-white">
                        <Curves />
                      </div>
                    </div>
                    {/* Body */}
                    <div className="card-body position-relative">
                      {/* Badge */}
                      <div className="position-relative text-end mt-n8 me-n4 mb-3">
                        <span className="badge rounded-pill bg-primary">
                          <span className="h6 text-uppercase">
                            Personal Training
                          </span>
                        </span>
                      </div>
                      {/* Heading */}
                      <h3>Train with Teigs Premium</h3>
                      <p className="text-muted">
                        Share individual workout plans with each of your private
                        clients.
                      </p>
                      <LinkOverlay target="_blank"
                        href="/s/AoA7hDV14dGnasteaS4M"
                        className="fw-bold text-decoration-none">
                        View Schedule <i className="fe fe-arrow-right ms-3" />
                      </LinkOverlay>
                    </div>
                  </div>
                </LinkBox>

                <LinkBox as='div'
                  className="col-12 col-md-4 my-2"
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  {/* Card */}
                  <div className="card h-80 shadow-light-lg mb-6 mb-md-0 lift lift-lg">
                    {/* Image */}
                    <Image
                      src="/img/photos/leos-morning-workout.jpg"
                      alt="Leo's Morning Workout"
                      className="card-img-top"
                      height="300"
                      width="500"
                      layout="responsive"
                      objectFit="cover"
                    />
                    {/* Shape */}
                    <div className="position-relative">
                      <div className="shape shape-bottom shape-fluid-x svg-shim text-white">
                        <Curves />
                      </div>
                    </div>

                    <div className="card-body position-relative">
                      {/* Badge */}
                      <div className="position-relative text-end mt-n8 me-n4 mb-3">
                        <span className="badge rounded-pill bg-info">
                          <span className="h6 text-uppercase">
                            On-Demand Workout Platform
                          </span>
                        </span>
                      </div>
                      {/* Heading */}
                      <h3>Leo's Morning Workout</h3>
                      <p className="text-muted">
                        Start your mornings with an easy-to-follow basketball,
                        strength and run workout.
                      </p>
                      <LinkOverlay target="_blank"
                        href="/s/dPY6hrVvc9RJCAFz36v3"
                        className="fw-bold text-decoration-none">
                        View Schedule <i className="fe fe-arrow-right ms-3" />
                      </LinkOverlay>
                    </div>
                  </div>
                </LinkBox>

                <LinkBox as='div'
                  className="col-12 col-md-4 my-2"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  {/* Card */}
                  <div className="card h-80 shadow-light-lg mb-6 mb-md-0 lift lift-lg">
                    {/* Image */}
                    <Image
                      src="/img/photos/next-idea.jpg"
                      alt="your next idea placeholder"
                      className="card-img-top"
                      height="300"
                      width="500"
                      layout="responsive"
                      objectFit="cover"
                    />
                    {/* Shape */}
                    <div className="position-relative">
                      <div className="shape shape-bottom shape-fluid-x svg-shim text-white">
                        <Curves />
                      </div>
                    </div>
                    {/* Body */}
                    <div className="card-body position-relative">
                      {/* Badge */}
                      <div className="position-relative text-end mt-n8 me-n4 mb-3">
                        <span className="badge rounded-pill bg-success">
                          <span className="h6 text-uppercase">Custom</span>
                        </span>
                      </div>
                      {/* Heading */}
                      <h3>[Your Specialty Here]</h3>
                      <p className="text-muted">
                        The next workout schedule is waiting on your ideas.
                      </p>
                      <LinkOverlay target="_blank"
                        href="https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126"
                        className="fw-bold text-decoration-none">
                        Get Started <i className="fe fe-arrow-right ms-3" />
                      </LinkOverlay>
                    </div>
                  </div>
                </LinkBox>
              </div>
            </div>
          </section>

          {/* SHAPE */}
          <div className="position-relative">
            <div className="shape shape-top shape-fluid-x svg-shim text-white">
              <AngleTop />
            </div>
          </div>

          {/* ABOUT */}
          <section className="pt-12 pb-8 pt-md-14 bg-gradient-dark-black">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-12 col-md-6 col-lg-5">
                  {/* Heading */}
                  <h2 className="display-3 fw-bold text-white mb-6 mb-md-8">
                    Offer Paid Memberships.
                  </h2>
                  <p className="text-muted lead mb-6">
                    <span className="text-white fw-bold">Simple.</span> Add a
                    payment option to your workout schedules. Supports
                    auto-renewing subscriptions or one-time payments.
                  </p>
                  <p className="text-muted lead mb-7 mb-md-0">
                    <span className="text-white fw-bold">Secure.</span> Process
                    payments with Stripe— the leading payment processor for
                    companies like Peloton, Lyft, Kickstarter, Postmates and{" "}
                    <a
                      target="javascript:(void);"
                      href="https://stripe.com/customers"
                      className="text-success"
                    >
                      more
                    </a>
                    .
                  </p>
                  <a
                    hidden
                    href="https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126"
                    className="btn  btn-rounded btn-success shadow lift mt-4"
                  >
                    <span className="h6 text-uppercase fw-bold">
                      Upgrade to Personal Pro
                    </span>
                  </a>
                  {/* </Link> */}
                </div>
                <div className="col-12 col-md-6">
                  <div className="device-combo device-combo-iphonex-macbook">
                    {/* <!-- iPhone --> */}
                    <div className="device device-iphonex">
                      <img
                        src="/img/screenshots/mobile/mobile-schedule-page.jpeg"
                        className="device-screen"
                        alt="..."
                      />
                      <img
                        src="/img/devices/iphonex.svg"
                        className="img-fluid"
                        alt="..."
                      />
                    </div>

                    {/* <!-- Macbook --> */}
                    <div className="device device-macbook">
                      <img
                        src="/img/screenshots/desktop/desktop-schedule-page.jpg"
                        className="device-screen"
                        alt="..."
                      />
                      <img
                        src="/img/devices/macbook.svg"
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* SHAPE */}
          <div className="position-relative">
            <div className="shape shape-top shape-fluid-x  svg-shim text-black">
              <AngleTop />
            </div>
          </div>

          {/* PRICING */}
          <section className="pt-9 pt-md-12 bg-gray-200">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 text-center">
                  {/* Heading */}
                  <h1>Fair, simple pricing for everyone.</h1>
                  <p className="lead text-gray-700">
                    Our basic plan and prices were designed to support as many
                    fitness professionals during these times.
                  </p>
                  {/* Form */}
                  <form className="d-flex align-items-center justify-content-center mb-7 mb-md-9">
                    {/* Label */}
                    <span className="text-muted">Annual</span>
                    {/* Switch */}
                    <div className="form-check form-switch mx-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="billingSwitch"
                        data-toggle="price"
                        data-target=".price"
                      />
                    </div>
                    {/* Label */}
                    <span className="text-muted">Monthly</span>
                  </form>
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row d-flex">
                <div className="col-12 col-md-6">
                  <Free />
                </div>
                <div className="col-12 col-md-6 ms-md-n3">
                  <PersonalPro />
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="pt-10 pb-14 pb-md-15 bg-gray-200">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 text-center">
                  <h2>
                    <span className="text-primary">FAQ</span>
                  </h2>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                  {/* Card */}
                  <div className="card accordion" id="featuresAccordion">
                    <div className="card-body">
                      {/* List group */}
                      <div className="list-group list-group-flush">
                        <div className="list-group-item">
                          {/* Toggle */}
                          <a
                            className="d-flex align-items-center text-reset text-decoration-none"
                            data-bs-toggle="collapse"
                            href="#featuresOne"
                            role="button"
                            aria-expanded="true"
                            aria-controls="featuresOne"
                          >
                            <div className="me-auto">
                              {/* Title */}
                              <p className="font-weight-bold mb-0">
                                Is there a free trial?
                              </p>
                            </div>

                            {/* Chevron */}
                            <span className="collapse-chevron text-muted ms-4">
                              <i className="fe fe-lg fe-chevron-down" />
                            </span>
                          </a>
                          <div
                            className="collapse show"
                            id="featuresOne"
                            data-parent="#featuresAccordion"
                          >
                            <div className="py-5 py-mb-6">
                              <p>
                                Currently, we don't offer a free trial. With the
                                basic free tier, you can add unlimited workouts
                                and clients to one workout schedule.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="list-group-item">
                          {/* Toggle */}
                          <a
                            className="d-flex align-items-center text-reset text-decoration-none"
                            data-bs-toggle="collapse"
                            href="#faq3"
                            role="button"
                            aria-expanded="false"
                            aria-controls="faq3"
                          >
                            <div className="me-auto">
                              {/* Title */}
                              <p className="font-weight-bold mb-0">
                                I'm just looking to workout.
                              </p>
                            </div>
                            {/* Chevron */}
                            <span className="collapse-chevron text-muted ms-4">
                              <i className="fe fe-lg fe-chevron-down" />
                            </span>
                          </a>{" "}
                          {/* Collapse */}
                          <div
                            className="collapse"
                            id="faq3"
                            data-parent="#featuresAccordion"
                          >
                            <div className="py-5 py-md-6">
                              <p
                                style={{
                                  fontWeight: 500,
                                }}
                              >
                                While SuperFit is a premium tool for fitness
                                professionals, you can still follow community
                                workouts on the free app! Signup isn't required,
                                but a free account allows us to save your
                                workout completions.
                              </p>
                              <a
                                target="_blank"
                                href="https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126"
                                className="font-weight-bold text-decoration-none"
                              >
                                Get SuperFit on iOS{" "}
                                <i className="fe fe-arrow-right ms-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SHAPE */}
          <div className="position-relative mt-n16">
            <div className="shape shape-bottom shape-fluid-x svg-shim text-dark">
              <Curves />
            </div>
          </div>
        </div>
      </Layout >
    </>
  );
}
