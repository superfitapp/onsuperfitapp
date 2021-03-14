import Link from "next/link";
import Layout from "@/components/landing-layout";
import Curves from "@/partials/shapes/curves/curve-1.svg";
import { useEffect } from "react";
import { NextSeo } from "next-seo";

export default function PrivacyPolicy() {
  useEffect(() => {
    require("@/public/js/bigpicture");
    require("@/public/js/aos");
  }, []);

  return (
    <>
      <NextSeo
        title="Privacy Policy | SuperFit"
        description="This Privacy Policy is in continuation of the Terms and Conditions for SuperFit, therefore both documents should be read together."
        canonical="https://superfitapp.com/privacy"
        openGraph={{
          url: "https://superfitapp.com/privacy",
          title: "Privacy Policy",
          description:
            "This Privacy Policy is in continuation of the Terms and Conditions for SuperFit, therefore both documents should be read together.",
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
          {/* CONTENT */}
          <section className="pt-12 pb-8 pt-md-14 pb-md-12">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 col-md">
                  {/* Heading */}
                  <h1 className="display-4 mb-2">Privacy Policy</h1>
                  {/* Text */}
                  <p className="fs-lg text-gray-700 mb-md-0">
                    Updated 1/1/2021
                  </p>
                </div>
              </div>{" "}
              <div className="row">
                <div className="col-12">
                  {/* Divider */}
                  <hr className="my-6 my-md-8" />
                </div>
              </div>{" "}
              <div className="row">
                <div className="col-12 col-md-8">
                  <h5>
                    This Privacy Policy of SuperFit spells out the obligations
                    of the Users and the App owners. This Privacy Policy is in
                    continuation of the Terms and Conditions for SuperFit,
                    therefore both documents should be read together.
                  </h5>
                  <br />
                  <p>
                    <strong>
                      <span style={{ textDecoration: "underline" }}>
                        Information That We Collect
                        <br />
                      </span>
                    </strong>
                  </p>
                  <p>
                    Depending on how Users use App, we may ask Users to share
                    their personally identifiable information ("Personal
                    Information ") with us. Whether Users choose to share their
                    Personal Information is completely up to Users, but Users
                    must keep in mind that they may not be able to access some
                    of the areas of App effectively and fully use the services
                    we offer on our App without sharing adequate Personal
                    Information. Personal Information includes any information
                    that identifies or can be used to identify, contact or
                    locate the Users. If you send us information about another
                    person, you must ensure that it is accurate and in good
                    faith. Below are some of the situations wherein Users
                    Personal Information is collected:&nbsp;&nbsp; &nbsp;
                    <br /> &nbsp;
                  </p>
                  <ol>
                    <li>
                      Account Information. Users may register on App and share
                      their standard contact information. You will also be asked
                      to allow SuperFit to collect your location information
                      from your device when you download or use the Service. In
                      addition, we may collect and store any personal
                      information you provide while using our Service or in some
                      other manner. This may include identifying information,
                      such as your name, address, email address verification and
                      telephone number; other kind of identifying information.
                      If you chat with other SuperFit Users, you provide us the
                      content of your chats, and if you contact us at our
                      customer service or other inquiry, you provide us with the
                      content of that communication. SuperFit does not knowingly
                      stores or saves any kind of personal information you share
                      with other Users.
                    </li>
                    <br />
                    <li>
                      We may collect Users/Members email address to send them
                      account confirmations, notifications, and to provide
                      services to Users in connection with the App. Subject to
                      Users consent, we may also send to Users promotional
                      emails, such as monthly newsletters, new service
                      offerings;
                    </li>
                  </ol>
                  <li>
                    We also collect Users Personal Information for
                    administrative purposes, such as addressing account and
                    billing issues, troubleshooting App issues, investigating
                    abuse on the App, responding to User enquiries and enforcing
                    and applying our Terms and Conditions of Service.
                  </li>
                  <p>&nbsp;</p>
                  <p>
                    <strong>
                      <span style={{ textDecoration: "underline" }}>
                        How We Use Your Information
                      </span>
                    </strong>
                  </p>
                  <p>
                    We use information that we collect about you or that you
                    provide us:
                  </p>
                  <ul>
                    <li>To present our App and its contents to you.</li>
                    <li>
                      To provide you with information, products or services that
                      you request from us.
                    </li>
                    <li>
                      To provide you with notices about your account, including
                      expiration and renewal notices.
                    </li>
                    <li>
                      To carry out our obligations and enforce our rights
                      arising from any contracts entered into between you and
                      us, including for billing and collection.
                    </li>
                    <li>
                      To notify about changes of our App or any products or
                      services we offer or provide through it.
                    </li>
                    <li>
                      To allow you to participate in interactive features on our
                      App.
                    </li>
                    <li>For any other purpose with your consent.</li>
                  </ul>
                  <p>
                    SuperFit uses IP addresses for systems administration
                    purposes. IP addresses are not used to track a User’s
                    session. This information only helps us determine how often
                    different areas of our App are visited and the city in which
                    the User is located. We do not link IP address to any
                    information that is personally identifiable. <br /> <br />{" "}
                    We do not share, sell or buy personal information. We may
                    share the Personal Information we collect, only with User’s
                    consent.&nbsp; The information submitted by users is used
                    only for internal purposes and to provide quality customer
                    service.
                  </p>
                  <p>
                    However, we may release Personal Information or other
                    information we collect, if we believe that such action is
                    necessary to: (I) comply with legal requirements and
                    processes; (II) identify, contact or bring legal action
                    against persons or entities who are or we believe have
                    caused or might cause injury to us or a third party; (III)
                    defend or respond to claims brought or threatened against
                    us, our employees, service providers, users of our Services
                    or others; or (IV) otherwise to protect interests of
                    SuperFit and of its employees, service providers, Users of
                    the Services or others. Any such release decisions may be
                    made by us in our sole discretion.
                  </p>
                  <p>
                    While we try to be selective in working with third parties,
                    we are not responsible for their use of your personal
                    information. Where payments are involved, we must release
                    your credit card information to credit card authorization
                    service providers and associated banks to process your
                    payment for purchases, returns or refunds.
                  </p>
                  <p>
                    In addition, since member information on our App is a
                    business asset, in case we are reorganized or sold to or
                    merged with another company, we may sell, assign, or
                    transfer your personal information to a purchaser of all or
                    substantially all of our business assets, or to an
                    affiliate, as applicable.
                  </p>
                  <p>
                    <strong>
                      <span style={{ textDecoration: "underline" }}>
                        Using HealthKit
                      </span>
                    </strong>
                  </p>
                  <p>
                    SuperFit shows you the following data from the Health app
                    (HealthKit).
                  </p>
                  <ul>
                    <li>
                      You can input your bodyweight measurement manually, or
                      synchronize with HealthKit to automatically prepopulate
                      your fitness profile.
                    </li>
                    <li>
                      Your completed workouts will add strength training and
                      functional movement exercise logs to your Health app which
                      contributes to your total activity profile.
                    </li>
                  </ul>
                  <p>
                    You can input your data manually, and the data is stored
                    securely in the Health app. None of your health data is sent
                    to any 3rd party services for any reason whatsoever.
                  </p>
                  <p>
                    <strong>
                      <span style={{ textDecoration: "underline" }}>
                        Cookies <br /> <br />{" "}
                      </span>
                    </strong>
                    We collect information via cookies and other similar
                    technologies (such as web beacons). Your device sends these
                    cookies back to the App every time you revisit it, so it can
                    recognize your mobile device and personalize and improve
                    your App experience.
                  </p>
                  <p>
                    SuperFit uses cookies for the following general purposes:
                  </p>
                  <ul>
                    <li>
                      To help us recognize your Apps as a previous visitor and
                      save and remember any preferences that may have been set
                      while you are using our App. For example, if you register
                      on our App, we may use cookies to remember your
                      registration information, so you do not need to log into
                      our App each time, you use it. We may also record your
                      password in a cookie, if you checked the box entitled
                      "Keep you signed in on your device unless you sign out. "
                      Please note that user’s IDs, passwords, and any other
                      account-related data included in such cookies are
                      encrypted for security purposes.
                    </li>
                    <li>
                      To help us customize the advertisements provided to you on
                      our App and on other websites across the Internet. For
                      example, when you access our App, a cookie is
                      automatically set by us (our service providers, or our
                      partners) to recognize your device or browser as you
                      navigate on the Internet and to present you with
                      information and advertising based on your apparent
                      interests. To help measure and research the effectiveness
                      of features and offerings, advertisements, and email
                      communications (by determining which emails you open and
                      act upon).
                    </li>
                  </ul>
                  <p>
                    Our App may also use Web beacons (also known as clear gifs,
                    pixel tags or Web bugs), which are tiny graphics with a
                    unique identifier, similar in function to cookies, that are
                    placed in the code of a Web page. We use Web beacons to
                    monitor the traffic patterns of users from one page within
                    our Apps to another, to deliver or communicate with cookies,
                    to understand whether you have come to our App from an
                    online advertisement displayed on a third-party website or
                    App, and to improve App performance. We also may allow our
                    service providers to use Web beacons to help us understand
                    which emails have been opened by recipients and to track the
                    visitor traffic and actions on our App. This helps us
                    measure the effectiveness of our content and other
                    offerings. If the Cookies are sent from third parties e.g.
                    social networking sites, SuperFit shall not be liable.
                  </p>
                  <p>
                    <strong>
                      <span style={{ textDecoration: "underline" }}>
                        Security
                        <br />{" "}
                      </span>
                    </strong>
                    <br /> Please note that no data transmission or storage can
                    be guaranteed to be 100% secure. As a result, while we
                    strive to protect the information we maintain, we cannot
                    guarantee or warrant the security of any information you
                    disclose or transmit to our Services and cannot be
                    responsible for the theft, destruction, or inadvertent
                    disclosure of information.
                  </p>
                  <p>
                    The safety and security of your information also depends on
                    you. Where we have given you (or where you have chosen) a
                    password for access to certain parts of our App, you are
                    responsible for keeping this password confidential. We
                    advise you not to share your password with anyone.
                    <br /> <br />{" "}
                    <strong>
                      <span style={{ textDecoration: "underline" }}>
                        International Users
                        <br />{" "}
                      </span>
                    </strong>
                    <br /> SuperFit is based in the United States of America,
                    and, regardless of where you use our Services or otherwise
                    provide information to us, the information may be
                    transferred to and maintained on servers located in the
                    United States of America and other countries. Note that the
                    laws, regulations and standards of the country in which this
                    information is stored may be different from your own
                    country. By using our Services, you consent to this
                    collection, transfer, storage, and processing of information
                    to and in the England and other countries.
                    <br /> <br />{" "}
                    <strong>
                      <span style={{ textDecoration: "underline" }}>
                        Third-Party Websites Links
                        <br />{" "}
                      </span>
                    </strong>
                    <br /> This App may link to, or be linked to, other Apps or
                    websites not maintained by us. SuperFit is not responsible
                    for the privacy policies or practices of any third parties
                    or third-party websites, including any linked or linking
                    websites. To the extent that you disclose personally
                    identifiable information to any such third parties,
                    different rules may apply to their use, and disclosure of
                    personal information that you disclose to them. We encourage
                    you to review the privacy policies of such Apps/websites
                    before disclosing your personal information to them.
                  </p>
                  {/* </div> */}
                </div>
                <div className="col-12 col-md-4">
                  {/* Card */}
                  <div className="card shadow-light-lg">
                    <div className="card-body">
                      {/* Heading */}
                      <h4>Have a question?</h4>
                      {/* Text */}
                      <p className="fs-sm text-gray-800 mb-5">
                        Not sure exactly what we’re looking for or just want
                        clarification? We’d be happy to chat with you and clear
                        things up for you. Anytime!
                      </p>
                      {/* Heading */}
                      <h6 className="fw-bold text-uppercase text-gray-700 mb-2">
                        Email us
                      </h6>
                      {/* Text */}
                      <p className="fs-sm mb-0">
                        <a
                          href="mailto:team@superfitapp.com"
                          className="text-reset"
                        >
                          team@superfitapp.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>{" "}
          </section>
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
