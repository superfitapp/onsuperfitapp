import Link from "next/link";
import Layout from "@/components/landing-layout";
import Curves from "@/partials/shapes/curves/curve-1.svg";
import AngleBottom from "@/partials/shapes/angles/angle-bottom.svg";
import AngleTop from "@/partials/shapes/angles/angle-top.svg";
import Image from "next/image";
import { useEffect } from "react";
import { NextSeo } from "next-seo";

export default function Terms() {
  useEffect(() => {
    require("@/public/js/bigpicture");
    require("@/public/js/aos");
  }, []);

  return (
    <>
      <NextSeo
        title="Terms | SuperFit"
        description="Terms of Service"
        canonical="https://superfitapp.com/terms"
        openGraph={{
          url: "https://superfitapp.com/terms",
          title: "Terms | SuperFit",
          description: "Terms of Service",
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
                  <h1 className="display-4 mb-2">Terms of Service</h1>
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
                  <div>
                    <article className="article">
                      <div>
                        <p>
                          By using any of the Services and the App, you
                          expressly agree to be bound by these terms and all
                          applicable laws and regulations governing the Site/App
                          and the Services. The terms form a legally binding
                          agreement between you and SuperFit in relation to your
                          use of the Site/App and/ or the Services and applies
                          to all users of the Services, whether registered or
                          not, on the App. This Agreement is an electronic
                          contract that establishes the legally binding terms
                          you must accept to use the Service
                          <br />
                          <br />
                          As used in this Agreement, “www.superfitapp.com",
                          "we," "us," and "our" shall mean SuperFit and its
                          subsidiaries and affiliates. By accessing or using the
                          services available through our app (the "Services"),
                          you agree to be bound by these Terms of Service and
                          our Privacy Policy currently found at
                          <span style={{ textDecoration: "underline" }}>
                            URL
                          </span>
                          <span style={{ textDecoration: "underline" }}>
                            of
                          </span>
                          <span style={{ textDecoration: "underline" }}>
                            (term and conditions
                          </span>
                          ) and
                          <span style={{ textDecoration: "underline" }}>
                            URL
                          </span>
                          <span style={{ textDecoration: "underline" }}>
                            {" "}
                            of{" "}
                          </span>
                          <span style={{ textDecoration: "underline" }}>
                            (Privacy Policy)
                          </span>{" "}
                          and incorporated herein by reference. These Terms do
                          not alter in any way the terms or conditions of any
                          other agreement you may have with SuperFit for
                          products, services or otherwise. If you are using the
                          Services on behalf of any entity, you represent that
                          you are authorized to do so.
                          <br />
                          <br />
                          We may, at our sole discretion, modify or revise these
                          Terms of Service and policies at any time by giving
                          notice on our Website and/or through the Services
                          provided through the App, and you agree to be bound by
                          such modifications or revisions. Although SuperFit may
                          attempt to notify you when major changes are made to
                          these Terms of Service, you should periodically click
                          on our Terms of Service to review any updates. All
                          changes shall be effective immediately when we post
                          them and shall apply to all access to and use of our
                          website/app thereafter. Nothing in these Terms of
                          Service shall be deemed to confer any third-party
                          rights or benefits hereunder. These Terms of Service
                          govern your and our rights and obligations with
                          respect to any pictures, videos, information, tags,
                          messages, graphics or other materials and any
                          “collections” or “canvases” of the foregoing
                          (collectively, the "Content"), uploaded, transmitted,
                          tagged or posted (altogether, "Posted")
                        </p>
                        <p>
                          The SuperFit App online mechanism which acts like a
                          fitness coach which help it users to achieve their
                          fitness by setting goals, managing, and sharing all of
                          your fitness activities. SuperFit requires all users
                          to be over the age of thirteen (13). If you are
                          between the ages of thirteen (13) and eighteen (18),
                          you may use SuperFit only under the supervision of a
                          parent or legal guardian who agrees to be bound by
                          these Terms of Use.
                        </p>
                        <h2>Electronic Communications</h2>
                        <p>
                          When you send e-mails or electronically chat with
                          SuperFit, you are communicating with us
                          electronically. You consent to receive communications
                          from us electronically. We will communicate with you
                          by e-mail. You agree that all agreements, notices,
                          disclosures and other communications that SuperFit
                          provides to you electronically satisfy legal
                          requirement that such communications be in writing.
                        </p>
                        <p>
                          <strong>In App Purchases</strong>
                        </p>
                        <p>
                          SuperFit may provide you with the opportunity to
                          license/subscribe a variety of virtual items such as
                          unlimited workouts. If you choose to make an in app
                          purchase, you will be prompted to enter details for
                          your account with the mobile platform you are using
                          (e.g., Apple Store) (“your IAP Account”). Your IAP
                          Account will be charged for the in app purchase in
                          accordance with the terms disclosed to you at the time
                          of purchase as well as the general terms for in app
                          purchases that apply to your IAP Account.
                        </p>
                        <p>
                          You have no property interest in any virtual items,
                          any purchase of virtual items, and virtual items
                          accumulated through any applicable SuperFit.
                          Re-purchases of a limited, non-transferable, revocable
                          license to use those virtual items within the
                          applicable SuperFit. Virtual items may not be
                          transferred or resold for commercial gain in any
                          manner, including, without limitation, by means of any
                          direct sale or auction service. Virtual Items may not
                          be purchased or sold from any individual or other
                          company via cash, barter or any other transaction.
                          Virtual items have no monetary value, and cannot be
                          used to purchase or use products or services other
                          than within the applicable SuperFit. Virtual items
                          cannot be refunded or exchanged for cash or any other
                          tangible value.
                        </p>
                        <p>
                          SuperFit may manage, regulate, control, modify or
                          eliminate your virtual items in its sole discretion,
                          and SuperFit will have no liability to you or anyone
                          for exercising these rights. In addition, all virtual
                          items are unconditionally forfeited if your iOS App
                          Store account is terminated or suspended for any
                          reason, in SuperFit’s sole discretion; or if SuperFit
                          discontinues any SuperFit or any portion or feature of
                          SuperFit.
                        </p>
                        <p>
                          SuperFit has no liability for hacking or loss of your
                          virtual items. SuperFit has no obligation to, and will
                          not, reimburse you for any virtual items lost due to
                          your violation of these Terms of Use. SuperFit
                          reserves the right, without prior notification, to
                          limit the order quantity on any virtual items and/or
                          to refuse to provide you with any virtual items. Price
                          and availability of virtual items are subject to
                          change without notice.
                          <br />
                          <br />
                          You agree to pay all fees and applicable taxes
                          incurred by you or anyone using an Account registered
                          to by you. SuperFit may revise the pricing for the
                          goods and services offered through the Service at any
                          time. YOU ACKNOWLEDGE THAT SUPERFIT IS NOT REQUIRED TO
                          PROVIDE A REFUND FOR ANY REASON, AND THAT YOU WILL NOT
                          RECEIVE MONEY OR OTHER COMPENSATION FOR UNUSED VIRTUAL
                          ITEMS WHEN AN ACCOUNT IS CLOSED, WHETHER SUCH CLOSURE
                          WAS VOLUNTARY OR INVOLUNTARY.
                          <br />
                          <br />
                          <strong>Use of the Service</strong>
                          <br />
                          <br />
                          The Services provides with guidance and information to
                          users on how to improve their fitness, health and
                          nutrition, but THE SERVICES ARE NOT A MEDICAL
                          ORGANIZATION, AND YOU SHOULD NOT RELY ON THIS GUIDANCE
                          AND INFORMATION AS A SUBSTITUTE FOR, NOR DOES IT
                          REPLACE, PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR
                          TREATMENT. YOU SHOULD CONSULT A PHYSICIAN BEFORE
                          BEGINNING A NEW FITNESS OR NUTRITIONAL PROGRAM. Our
                          recommended workout plans and exercises, even if they
                          are tailored to individual users, should not be
                          misconstrued as medical advice, diagnoses or
                          treatment. IF YOU HAVE ANY CONCERNS OR QUESTIONS ABOUT
                          YOUR HEALTH, YOU SHOULD ALWAYS CONSULT WITH A
                          PHYSICIAN OR OTHER HEALTHCARE PROFESSIONAL. THE USE OF
                          ANY INFORMATION OR PROGRAMS PROVIDED ON THE SERVICES
                          IS SOLELY AT YOUR OWN CHOICE AND RISK.
                        </p>
                        <p>
                          The Services are intended for use only by individuals
                          healthy enough to perform strenuous exercise. In
                          becoming a user of the Services, you affirm that a
                          physician has specifically approved your use of the
                          Services, OR that all of the following statements are
                          true:
                        </p>
                        <p>
                          · you do not have a history of high blood pressure,
                          and no one in your immediate family has a history of
                          high blood pressure or heart problems
                        </p>
                        <p>
                          · no physician has ever informed you that you have a
                          heart condition or that you should only do physical
                          activities recommended by a physician;
                          <br />
                          <br />· you do not have a condition of
                          high-cholesterol, diabetes, obesity or arthritis; and
                        </p>
                        <p>
                          · you have never felt chest pain when engaging in
                          physical activity;
                          <br />
                          <br />· you have never lost your balance because of
                          dizziness and you have never lost consciousness;
                        </p>
                        <p>
                          · you have not experienced chest pain when not engaged
                          in physical activity at any time within the past
                          month;
                        </p>
                        <p>
                          · you do not have a bone or joint problem that could
                          be made worse by a change in your physical activity;
                        </p>
                        <p>
                          · your physician is not currently prescribing drugs
                          for your blood pressure or heart condition;
                        </p>
                        <p>
                          · you do not know of any other reason you should not
                          exercise.
                        </p>
                        <p>
                          If applicable, you further affirm that (A) you are not
                          pregnant, breastfeeding or lactating, or (B) your
                          physician has specifically approved your use of the
                          Services.
                        </p>
                        <p>
                          You should discontinue exercise in cases where it
                          causes pain or severe discomfort, and should consult a
                          medical expert prior to returning to exercise in such
                          cases. We reserve the right to deny you access to the
                          Services for any reason or no reason, including if we
                          determine, in our sole discretion, that you have
                          certain medical conditions.
                          <br />
                          <br />
                          You should be aware that there are inherent physical
                          and mental health risks to exercise, including risk of
                          injury or illness. By accessing the Services, you
                          acknowledge and agree that your performance of any and
                          all exercises or activities recommended by the
                          Services is wholly at your own risk. Neither SuperFit
                          nor any of its trainers will be liable for any
                          physical or mental injury or illness that may result,
                          whether directly or indirectly, from any of our
                          recommended workout plans or exercises. While we may
                          provide guidelines such as written descriptions,
                          pictures, or videos describing how to perform specific
                          exercises or activities, you assume sole
                          responsibility for performing those exercises or
                          activities with proper form, as risk of injury or
                          illness increases with improper form. We encourage you
                          to seek multiple sources of information regarding how
                          to perform each exercise correctly and to consider
                          consulting with a qualified coach, instructor,
                          personal trainer, or physical therapist, especially if
                          you are new to any of the forms of training or
                          activity you seek to perform.
                          <br />
                          <br />
                          You are responsible for ensuring that your use of or
                          participation in the activities of this platform does
                          not affect your eligibility as an amateur athlete.
                          Please check with your amateur athletic association
                          for the rules that apply to you.
                        </p>
                        <p>
                          <strong>
                            Reviews, Communications And Submissions{" "}
                          </strong>
                        </p>
                        <p>
                          <span style={{ textDecoration: "underline" }}>
                            Generally{" "}
                          </span>
                        </p>
                        <p>
                          Without limiting the scope of these Terms of Use, you
                          agree to comply with iOS App Store Review Guidelines
                          when you submit reviews, forum posts and other content
                          via any SuperFit. Inappropriate, obscene, defamatory,
                          offensive language, crude or explicit sexual content,
                          discussions of any matters which are explicitly or by
                          inference illegal in any way, discussions of illegal
                          or any other drugs, and racially and ethnically
                          offensive speech are examples of unsuitable content
                          that are not permitted within the SuperFit. Content
                          standards may vary depending on where you are within a
                          SuperFit and the expectations of the relevant app
                          community. You should always use your best and most
                          respectful in submitting any content, such as a review
                          regarding SuperFit.
                        </p>
                        <p>
                          You are responsible for maintaining the
                          confidentiality of the username and password you
                          designate during
                          <span style={{ textDecoration: "underline" }}>
                            the registration process, and you are solely
                            responsible for all activities that occur under your
                            username and password
                          </span>
                          . You agree to immediately notify the us of any
                          disclosure or unauthorized use of your username or
                          password or any other breach of security at
                          <span style={{ textDecoration: "underline" }}>
                            URL for contact{" "}
                          </span>{" "}
                          and ensure that you log out from your account at the
                          end of each session.
                        </p>
                        <p>
                          We expressly reserve the right, but have no
                          obligation, to: (a) monitor any communications within
                          the SuperFit, including, without limitation, to ensure
                          that appropriate standards of online conduct are being
                          observed, and (b) immediately or at any time remove
                          any content that we deem objectionable or unsuitable
                          in our sole discretion. SuperFit does not endorse,
                          approve, or prescreen any content that you or other
                          users post or communicate on or through SuperFit.
                          SuperFit does not assume any responsibility or
                          liability for any content that is generated, posted or
                          communicated by any user on or through the SuperFit.
                          You agree to indemnify SuperFit and each of their
                          respective employees, contractors, officers,
                          directors, agents, representatives, vendors, and
                          content providers from any liability or damages
                          arising out of or resulting from any content you post
                          or communicate on or through the SuperFit.
                        </p>
                        <p>
                          Without limiting the generality of these policies and
                          standards, the following actions are examples of
                          behavior that violate these Terms of Use and may
                          result in any or all of your SuperFit account(s) being
                          immediately suspended or terminated:
                        </p>
                        <ul>
                          <li>
                            Posting, transmitting, promoting, or distributing
                            any content that is illegal.
                          </li>
                          <li>
                            Harassing or threatening any other user of a
                            SuperFit or any employee or contractor of SuperFit.
                          </li>
                          <li>
                            That promotes racism, bigotry, hatred or physical
                            harm of any kind against any group or individual;
                          </li>
                          <li>
                            advocates harassment or intimidation of another
                            person;
                          </li>
                          <li>
                            requests money from, or is intended to otherwise
                            defraud, other users of the Service;
                          </li>
                          <li>
                            contains video, audio photographs, or images of
                            another person without his or her permission (or in
                            the case of a minor, the minor’s legal guardian);
                          </li>
                          <li>
                            provides material that exploits people in a sexual,
                            violent or other illegal manner, or solicits
                            personal information from anyone under the age of
                            18;
                          </li>
                          <li>
                            provides instructional information about illegal
                            activities such as making or buying illegal weapons
                            or drugs, violating someone’s privacy, or providing,
                            disseminating or creating computer viruses;
                          </li>
                          <li>
                            Impersonating another person, indicating that you
                            are a SuperFit employee or a representative of
                            SuperFit (if you are not), or attempting to mislead
                            users by indicating that you represent SuperFit in
                            any way.
                          </li>
                          <li>
                            Attempting to obtain a password, other account
                            information, or other private information from any
                            other user of a SuperFit.
                          </li>
                          <li>
                            Uploading any software, files, photos, images or any
                            other content to a SuperFit that you do not own or
                            have the legal right to freely distribute, or that
                            contain a virus or corrupted data, or any other
                            malicious or invasive code or program.
                          </li>
                          <li>
                            Posting messages for any purpose other than personal
                            communication, including without limitation
                            advertising, promotional materials, chain letters,
                            pyramid schemes, political campaigning, soliciting
                            funds, mass mailings and sending "spam", or making
                            any commercial use of any SuperFit.
                          </li>
                          <li>
                            Disrupting the normal flow of dialogue, or otherwise
                            acting in a manner that negatively affects or
                            disrupts other users.
                          </li>
                          <li>
                            Improperly using any game support functions or
                            complaint buttons, or making false complaints or
                            other reports to SuperFit representatives.
                          </li>
                          <li>
                            Posting or communicating any player's real-world
                            personal information within a SuperFit.
                          </li>
                          <li>
                            Uploading or transmitting, or attempting to upload
                            or transmit, any material that acts as a passive or
                            active information collection or transmission
                            mechanism, including, without limitation, gifs, 1x1
                            pixels, web bugs, and other similar devices.
                          </li>
                          <li>
                            Using or launching any automated system, including,
                            without limitation, any spider, bot, cheat utility,
                            scraper or offline reader that accesses a SuperFit,
                            or using or launching any unauthorized script or
                            other software.
                          </li>
                          <li>
                            Using a false e-mail address or otherwise disguising
                            the source of any content that you submit within a
                            SuperFit, or using tools which anonymize your
                            internet protocol address.
                          </li>
                          <li>
                            Interfering or circumventing any SuperFit security
                            feature or any feature that restricts or enforces
                            limitations on use of or access to a SuperFit.
                          </li>
                          <li>
                            Attempting to sell any part of a SuperFit,
                            including, without limitation, any virtual items (if
                            applicable), SuperFit accounts and access to them in
                            exchange for real currency or items of monetary or
                            other value.
                          </li>
                          <li>
                            Engaging in cheating or any other activity that
                            SuperFit deems to be in conflict with the spirit of
                            SuperFit.
                          </li>
                        </ul>
                        <p>
                          You are solely responsible for your interactions with
                          other users. You understand that the we currently do
                          not conduct criminal background checks or screenings
                          on its users. The SuperFit also does not inquire into
                          the backgrounds of all of its users or attempt to
                          verify the statements of its users. The SuperFit makes
                          no representations or warranties as to the conduct of
                          users or their compatibility with any current or
                          future users. The SuperFit reserves the right to
                          conduct any criminal background check or other
                          screenings (such as sex offender register searches),
                          at any time and using available public records.
                          <br />
                          <br />
                          In no event shall the we, our affiliates or our
                          partners be liable (directly or indirectly) for any
                          losses or damages whatsoever, whether direct,
                          indirect, general, special, compensatory,
                          consequential, and/or incidental, arising out of or
                          relating to the conduct of you or anyone else in
                          connection with the use of the Service including,
                          without limitation, death, bodily injury, emotional
                          distress, and/or any other damages resulting from
                          communications or meetings with other users or persons
                          you meet through the Service.
                          <br />
                          <br />
                          You understand that we make no guarantee, either
                          express or implied, regarding your ultimate
                          compatibility with individuals you meet through the
                          Service. You should not provide your financial
                          information (for example, your credit card or bank
                          account information), or wire or otherwise send money,
                          to other users. You agree that any Content you place
                          on the Service may be viewed by other users and may be
                          viewed by any person visiting or participating in the
                          Service.
                        </p>
                        <p>
                          You are solely responsible for the content and
                          information that you post, upload, publish, link to,
                          transmit, record, display or otherwise make available
                          (hereinafter, “post”) on the Service or transmit to
                          other users, including text messages, chat, videos
                          (including streaming videos), photographs, or profile
                          text, whether publicly posted or privately transmitted
                          (collectively, “Content”). You may not post as part of
                          the Service, or transmit to the SuperFit or any other
                          user (either on or off the Service), any offensive,
                          inaccurate, incomplete, abusive, obscene, profane,
                          threatening, intimidating, harassing, racially
                          offensive, or illegal material, or any material that
                          infringes or violates another person’s rights
                          (including intellectual property rights, and rights of
                          privacy and publicity).
                        </p>
                        <p>
                          <span style={{ textDecoration: "underline" }}>
                            Suspension And Termination Of Account And Service
                          </span>
                        </p>
                        <p>
                          Generally, a User Account will be considered active
                          until we receive a user request to deactivate or
                          delete it. You understand and agree that the SuperFit
                          may, but is not obligated to, monitor or review any
                          Content you post as part of a Service. SuperFit takes
                          steps to verify the credentials and authenticity of
                          its users. We do not guarantee that the app or any
                          content contained on the app will always be available
                          or be uninterrupted. We reserve the right to limit,
                          suspend, terminate, modify, or delete the User Account
                          we provide to you or your access to our Services or
                          portions thereof (including any Content you or other
                          users submit) for any reason, with or without notice
                          and at any time, including, without limitation, if you
                          are, or we suspect that you are, improperly using the
                          Services, violating any applicable laws or failing to
                          comply with this Terms of Service. We also reserve the
                          right to stop offering and/or supporting the Services
                          or any part of the Services at any time either
                          permanently or temporarily, for any reason, with or
                          without notice to you, at which point your use of the
                          Services or any part thereof will be automatically
                          terminated or suspended. SuperFit reserves the right
                          to investigate, suspend and/or terminate your account
                          if you have misused the Service. The following is a
                          partial list of the type of actions that you may not
                          engage in with respect to the Service. You will not:
                        </p>
                        <ul>
                          <li>impersonate any person or entity.</li>
                          <li>solicit money from any users.</li>
                          <li>“stalk” or otherwise harass any person.</li>
                          <li>
                            express or imply that any statements you make are
                            endorsed by the us without our specific prior
                            written consent.
                          </li>
                          <li>
                            use the Service in an illegal manner or to commit an
                            illegal act;
                          </li>
                          <li>
                            access the Service in a jurisdiction in which it is
                            illegal or unauthorized;
                          </li>
                          <li>
                            collect usernames and/or email addresses of users by
                            electronic or other means for the purpose of sending
                            unsolicited email or unauthorized framing of or
                            linking to the Service.
                          </li>
                          <li>
                            interfere with or disrupt the Service or the servers
                            or networks connected to the Service.
                          </li>
                        </ul>
                        <p>
                          <span style={{ textDecoration: "underline" }}>
                            Commercial Activity and Unsolicited E-mail{" "}
                          </span>
                        </p>
                        <p>
                          You may not use any portion of the SuperFit to collect
                          information, including login names, about other users,
                          and use of such information to send unsolicited e-mail
                          or for any other purpose is strictly prohibited. You
                          may not advertise any goods or services on any
                          SuperFit, or otherwise exploit your participation on
                          or through any SuperFit for any commercial purpose.
                        </p>
                        <p>
                          <span style={{ textDecoration: "underline" }}>
                            Customer Reviews{" "}
                          </span>
                        </p>
                        <p>
                          You may submit reviews regarding SuperFit. Use of the
                          reviews feature is for your personal, non-commercial
                          use and is at your own option and risk, and you must
                          comply with the policies set forth in these Terms of
                          Use and the Google Play iOS App Store Review
                          Guidelines.
                        </p>
                        <p>
                          When you post a review, iOS App Store may display your
                          rating of the SuperFit, along with your user name and
                          certain other information you may provide, such as
                          your city and state location, skill level and favorite
                          exercise. By submitting a review, you are consenting
                          to the release of all information that you provide in
                          that review to a public forum. If you do not want any
                          such information to be shared in a public forum, do
                          not use the review feature.
                          <br />
                          <br />
                          <strong>
                            The service of SuperFit may be subscribed on monthly
                            or annual basis
                          </strong>
                        </p>
                        <p>
                          <span style={{ textDecoration: "underline" }}>
                            Subscription for monthly service
                          </span>
                          <br />
                          <br />
                          You can sign up for the monthly SuperFit service by
                          paying monthly subscription in accordance with the
                          (“Prescribed Fee”). For accessing the SuperFit service
                          you will have to make an advance payment of monthly
                          fee. In absence of the receipt of the subscription
                          fee, your service will remain disabled until payment
                          is received. You will be billed monthly on an on-going
                          and recurring basis, even if service from SuperFit is
                          not being actively used by you.
                          <br />
                          <br />
                          <span style={{ textDecoration: "underline" }}>
                            Subscription for annual service
                          </span>
                          <br />
                          <br />
                          You can sign up for the annual SuperFit service by
                          paying annual subscription in accordance with the
                          (“Prescribed Fee”). For accessing the SuperFit service
                          you will have to make an advance payment of annual
                          fee. In absence of the receipt of the subscription
                          fee, your service will remain disabled until payment
                          is received. You will be billed annually on an
                          on-going and recurring basis, even if service from
                          SuperFit is not being actively used by you.
                          <br />
                          <br />
                          <span style={{ textDecoration: "underline" }}>
                            Discounts on Prescribed Fee
                          </span>
                          <br />
                          <br />
                          By reviewing the Prescribed Fee from time to time you
                          are encouraged to remain aware of the fees charged by
                          us and applicable discounts, if any. The prescribed
                          fee including any discounts is subject to change at
                          any time in our sole and absolute discretion. However,
                          we shall try to notify you when there is any
                          significant change in the Prescribed Fee.
                          <br />
                          <br />
                          <span style={{ textDecoration: "underline" }}>
                            Payment
                          </span>
                          <br />
                          <br />
                          Fees are payable in U.S. dollars. You can make payment
                          for SuperFit service through Apple or. You hereby
                          authorize us to charge your credit card for such
                          amounts on a regular monthly or annual basis beginning
                          at the commencement of your subscription and
                          continuing until your account is terminated. If for
                          any reason Apple is unable to effect automatic payment
                          via your credit card, we will try to notify you via
                          email and your service will remain disabled until
                          payment is received. Amounts payed for the SuperFit
                          service, including the prepayments, are not
                          refundable.
                        </p>
                        <p>
                          <strong>SuperFit </strong>
                          <strong>Software</strong>
                        </p>
                        <p>
                          We may require that you download certain software from
                          SuperFit, its principals or its licensors onto your
                          device ("
                          <strong>SuperFit</strong>
                          <strong>Software</strong>"). Subject to your
                          compliance with these Terms of Use, SuperFit grants to
                          you a non-exclusive, non-transferable,
                          non-sublicensable, revocable, limited license to use
                          the SuperFit Software. The SuperFit Software is for
                          your personal use, and may not be reproduced,
                          duplicated, copied, resold, sublicensed, or otherwise
                          used in whole or in part by you for commercial
                          purposes. You may not modify, translate,
                          reverse-engineer, reverse-compile or decompile,
                          disassemble or create derivative works from any of the
                          SuperFit Software.
                        </p>
                        <p>
                          NEITHER SUPERFIT, NOR ITS LICENSORS ARE LIABLE FOR ANY
                          DAMAGES IN CONNECTION WITH YOUR USE OF ANY SUPERFIT
                          SOFTWARE (INCLUDING LIABILITY FOR ANY CONSEQUENTIAL OR
                          INCIDENTAL DAMAGES OR DAMAGE TO YOUR
                          <a href="https://www.google.co.in/search?espv=2&biw=1024&bih=441&q=mobile+DEVICE&spell=1&sa=X&ved=0ahUKEwjUne6Rq7nKAhVEMhoKHdnzD0oQvwUIGCgA">
                            DEVICE
                          </a>
                          HARDWARE OR SOFTWARE), AND THE ENTIRE RISK OF USE,
                          INCLUDING, WITHOUT LIMITATION, ANY DAMAGE TO YOUR
                          <a href="https://www.google.co.in/search?espv=2&biw=1024&bih=441&q=mobile+DEVICE&spell=1&sa=X&ved=0ahUKEwjUne6Rq7nKAhVEMhoKHdnzD0oQvwUIGCgA">
                            DEVICE
                          </a>
                          HARDWARE OR SOFTWARE, RESULTING FROM ANY USE OF THE
                          SUPERFIT SOFTWARE AND SUPERFIT UNLIMITED, RESIDES WITH
                          YOU.
                        </p>
                        <p>
                          <strong>Social Network Sites </strong>
                        </p>
                        <p>
                          SuperFit has ability to connect with Social networking
                          platforms. You may share the content/achievements on
                          all partnered social networking sites.
                        </p>
                        <p>
                          SuperFit may manage, modify or eliminate the
                          partnership with any of the social networking sites at
                          any time.
                          <br />
                          <br />
                          If you connect to any of your social networking
                          accounts through SuperFit, you authorize us to access
                          and use certain account information, including but not
                          limited to your public profile and information about
                          friends you might share in common with other SuperFit
                          users.
                          <br />
                          <br />
                          <strong>
                            Third Party Links And Third Party Content And
                            Services{" "}
                          </strong>
                        </p>
                        <p>
                          Any and all software, content and services (including
                          advertising) within a SuperFit that are not owned by
                          SuperFit are "third party content and services."
                          SuperFit acts merely as an intermediary service
                          provider of, and accepts no responsibility or
                          liability for, third party content and services. In
                          addition and without limiting the generality of the
                          foregoing, certain SuperFit may include videos or
                          links to sites or other apps operated by third
                          parties, including advertisers and other content
                          providers. Those sites/apps may collect data or
                          solicit personal information from you. SuperFit does
                          not control such sites/apps, and is not responsible
                          for their content, policies, or collection, use or
                          disclosure of any information those sites may collect.
                          <br />
                          <br />
                          <strong>Supplemental Policies</strong>
                        </p>
                        <p>
                          SuperFit may publish additional policies related to
                          specific services such as forums, contests or loyalty
                          programs. Your right to use such services is subject
                          to those specific policies and these Terms of Service.
                          <br />
                          <br />
                          <strong>Entire Agreement</strong>
                        </p>
                        <p>
                          These Terms of Service, any Supplemental Policies and
                          any documents expressly incorporated by reference
                          herein contain the entire understanding of you and
                          SuperFit, and supersede all prior understandings of
                          the parties hereto relating to the subject matter
                          hereof, whether electronic, oral or written, or
                          whether established by custom, practice, policy or
                          precedent, between you and us with respect to the
                          Service.
                        </p>
                        <p>
                          <strong>No Waiver</strong>
                        </p>
                        <p>
                          The failure of SuperFit to require or enforce strict
                          performance by you of any provision of these Terms of
                          Service or the SuperFit Privacy Policy or failure to
                          exercise any right under them shall not be construed
                          as a waiver or relinquishment of SuperFit’s right to
                          assert or rely upon any such provision or right in
                          that or any other instance.
                        </p>
                        <p>
                          The express waiver by SuperFit of any provision,
                          condition, or requirement of these Terms of Service or
                          the SuperFit Privacy Policy shall not constitute a
                          waiver of any future obligation to comply with such
                          provision, condition or requirement.
                        </p>
                        <p>
                          Except as expressly and specifically set forth in
                          these Terms of Service, no representations,
                          statements, consents, waivers, or other acts or
                          omissions by SuperFit shall be deemed a modification
                          of these Terms of Service, or legally binding, unless
                          documented in physical writing, hand signed by You and
                          a duly appointed officer of SuperFit.
                        </p>
                        <p>
                          <strong>Violation Of These Terms Of Use </strong>
                        </p>
                        <p>
                          If you violate our Terms of Use, SuperFit reserves the
                          right, in its sole discretion, to immediately
                          terminate your participation. You acknowledge that
                          SuperFit is not required to notify you prior to
                          terminating any such account.
                          <br />
                          <br />
                          <strong>Digital Millennium Copyright Actions</strong>
                        </p>
                        <p>
                          <strong>A.</strong> DMCA Take-Down Notices. If you are
                          a copyright owner or an agent thereof and believe that
                          any Content Posted on our App or through our Services
                          infringes upon your copyrights, you may submit a
                          written notification pursuant to the Digital
                          Millennium Copyright Act ("DMCA") by providing our
                          Copyright Agent (set forth in Section VII(B)) with the
                          following information (see 17 U.S.C 512(c)(3) for
                          further detail):
                        </p>
                        <ul>
                          <li>
                            a signature (physical or electronic) of the owner or
                            a person who has been authorized by the owner of the
                            allegedly infringed right to act on their behalf;
                          </li>
                          <li>
                            identification of the copyrighted work or other
                            intellectual property that has allegedly been
                            infringed;
                          </li>
                          <li>
                            identify the material on our App or our Services
                            that alleged to be infringing, with enough detail so
                            that we are able to locate it on our database;
                          </li>
                          <li>
                            a statement that you have a good faith belief that
                            the disputed use is not authorized by the copyright
                            owner, its agent, or the law;
                          </li>
                          <li>
                            information reasonably sufficient to permit SuperFit
                            to contact the complaining party, such as an
                            address, telephone number, and, if available, an
                            electronic mail address at which the complaining
                            party may be contacted; and
                          </li>
                          <li>
                            a statement that the information provided in the
                            notice is accurate, and under penalty of perjury,
                            that you are the owner of the copyright interest
                            involved or that you are authorized to act on behalf
                            of that owner.
                          </li>
                        </ul>
                        <p>
                          If you prefer to contact us via postal mail or email
                          you may do so here:
                          <span style={{ textDecoration: "underline" }}>
                            URL for contact{" "}
                          </span>
                        </p>
                        <p>
                          B. For clarity, only DMCA notices, any other feedback,
                          comments, requests for technical support, and other
                          communications should be directed to SuperFit at
                          <span style={{ textDecoration: "underline" }}>
                            URL for contact{" "}
                          </span>
                          You acknowledge that if you fail to comply with all of
                          the requirements, your DMCA notice may not be valid.
                        </p>
                        <p>
                          <strong>C.</strong> Counter-Notices. If you believe
                          that your Content that has been removed from our App
                          or our Services is not infringing, or that you have
                          the authorization from the copyright owner, the
                          copyright owner’s agent, or pursuant to the law, to
                          Post and use the Content in the manner so Posted or
                          used, you may send a counter-notice containing the
                          following information to our copyright agent using the
                          contact information set forth above:
                        </p>
                        <ul>
                          <li>your physical or electronic signature;</li>
                          <li>
                            a description of the Content that has been removed
                            and the location at which the content appeared
                            before it was removed;
                          </li>
                          <li>
                            a statement that you have a good faith belief that
                            the Content was removed as a result of mistake or a
                            misidentification of the Content; and
                          </li>
                          <li>
                            your name, address, telephone number, and email
                            address, a statement that you consent to the
                            jurisdiction of the Competent Court in New York,
                            State of New York, and a statement that you will
                            accept service of process from the person who
                            provided notification of the alleged infringement.
                          </li>
                        </ul>
                        <p>
                          <strong>E.</strong> If a counter-notice is received by
                          our copyright agent, SuperFit may send a copy of the
                          counter-notice to the original complaining party
                          informing such person that SuperFit may reinstate the
                          removed Content in ten (10) business days. Unless the
                          copyright owner files an action seeking a court order
                          against the Content provider, member or user, the
                          removed Content may (in SuperFit’s discretion) be
                          reinstated on our App and our Services by SuperFit in
                          ten (10) to fourteen (14) business days or more after
                          receipt of the counter-notice.
                          <br />
                          <br />
                          <strong>Intellectual Property Rights </strong>
                        </p>
                        <p>
                          The names and logos, and other graphics, logos, icons,
                          content related workout activities or any martial
                          which is published on the Superfit app/website and
                          service names associated with the SuperFit are
                          trademarks, registered trademarks or trade dress of
                          SuperFit or its licensors or principals in the United
                          States of America and/or other countries. SuperFit’s
                          trademarks and trade dress may not be used in
                          connection with any product or service that is not
                          owned or operated by or on behalf of SuperFit, or in
                          any manner that is likely to cause confusion among
                          consumers or that disparages or discredits SuperFit.
                          The compilation of all content on the SuperFit is the
                          exclusive property of SuperFit and is protected by
                          laws of United States of America and international
                          copyright laws. You may not use, copy, transmit,
                          modify, distribute, or create any derivative works
                          from any content from the SuperFit unless we have
                          expressly authorized you to do so in writing. All
                          other trademarks not owned by SuperFit that appear on
                          the SuperFit are the property of their respective
                          owners, who may or may not be affiliated with or
                          connected to SuperFit. If you fail to adhere to these
                          Terms of Use, other content owners may take criminal
                          or civil action against you. In the event legal action
                          is taken against you for your acts and/or omissions
                          with regard to any content on the SuperFit, you agree
                          to indemnify and hold harmless SuperFit and its
                          employees, contractors, officers, directors, agents,
                          representatives, vendors, and content providers. Also,
                          please note that you may be liable for damages
                          (including costs and attorney/lawyer’s fees) if you
                          make a false claim copyright infringement.
                        </p>
                        <p>
                          <strong>
                            Limitations On Warranties And Liability{" "}
                          </strong>
                        </p>
                        <p>
                          YOU EXPRESSLY AGREE THAT THE USE OF ANY SUPERFIT
                          SOFTWARE AND THE INTERNET IS AT YOUR SOLE RISK. ALL
                          SUPERFIT AND SUPERFIT SOFTWARE ARE PROVIDED ON AN "AS
                          IS" AND "AS AVAILABLE" BASIS FOR YOUR USE, WITHOUT
                          WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
                          INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF
                          MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE,
                          UNLESS SUCH WARRANTIES ARE LEGALLY INCAPABLE OF
                          EXCLUSION. WITHOUT LIMITING THE GENERALITY OF THE
                          FOREGOING, SUPERFIT DOES NOT GUARANTEE THAT YOU WILL
                          BE ABLE TO ACCESS OR USE THE SUPERFIT SOFTWARE AT ANY
                          PARTICULAR TIMES OR LOCATIONS, OR THAT THE SUPERFIT,
                          SUPERFIT SOFTWARE, NEWSLETTERS, E-MAILS OR OTHER
                          COMMUNICATIONS SENT FROM SUPERFIT ARE FREE FROM
                          VIRUSES OR OTHER HARMFUL COMPONENTS.
                        </p>
                        <p>
                          YOU ACKNOWLEDGE AND AGREE THAT YOUR SOLE AND EXCLUSIVE
                          REMEDY FOR ANY DISPUTE WITH SUPERFIT IS TO STOP USING
                          THE SUPERFIT SOFTWARE, AND TO CANCEL ANY AND ALL OF
                          YOUR SUPERFIT ACCOUNTS, IF APPLICABLE. YOU ACKNOWLEDGE
                          AND AGREE THAT SUPERFIT IS NOT LIABLE FOR ANY ACT OR
                          FAILURE TO ACT ON ITS OWN PART, OR FOR ANY CONDUCT OF,
                          OR COMMUNICATION OR CONTENT POSTED WITHIN A SUPERFIT
                          BY, ANY SUPERFIT USER. IN NO EVENT SHALL SUPERFIT’S OR
                          ITS EMPLOYEES', CONTRACTORS', OFFICERS', DIRECTORS' OR
                          SHAREHOLDERS' LIABILITY TO YOU EXCEED THE AMOUNT THAT
                          YOU PAID TO SUPERFIT FOR YOUR PARTICIPATION IN ANY
                          SUPERFIT. IN NO CASE SHALL SUPERFIT OR ITS EMPLOYEES,
                          CONTRACTORS, OFFICERS, DIRECTORS OR SHAREHOLDERS BE
                          LIABLE FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING
                          FROM YOUR USE OF SUPERFIT SOFTWARE. BECAUSE SOME
                          STATES/REGIONS OR JURISDICTIONS DO NOT ALLOW THE
                          EXCLUSION OR THE LIMITATION OF LIABILITY FOR
                          CONSEQUENTIAL OR INCIDENTAL DAMAGES, IN SUCH STATES/
                          REGIONS OR JURISDICTIONS, SUCH LIABILITY SHALL BE
                          LIMITED TO THE FULL EXTENT PERMITTED BY LAW.
                        </p>
                        <p>
                          YOU FURTHER SPECIFICALLY ACKNOWLEDGE THAT SUPERFIT IS
                          NOT LIABLE, AND YOU AGREE NOT TO SEEK TO HOLD SUPERFIT
                          LIABLE, FOR THE CONDUCT OF THIRD PARTIES, INCLUDING
                          OTHER USERS OF SUPERFIT AND OPERATORS OF SOCIAL
                          NETWORKING AND OTHER EXTERNAL SITES/APPS, AND THAT THE
                          RISK OF USING OR ACCESSING SUPERFIT OFFERINGS AND
                          SUPERFIT SOFTWARE, SOCIAL NETWORKING SITES AND OTHER
                          EXTERNAL SITES, AND OF INJURY FROM THE FOREGOING,
                          RESTS ENTIRELY WITH YOU.
                        </p>
                        <p>
                          <strong>Indemnification </strong>
                        </p>
                        <p>
                          You agree to defend, indemnify and hold harmless
                          SuperFit and its respective employees, contractors,
                          officers, directors, shareholders, agents,
                          representatives, vendors, and content providers from
                          and against any and all liabilities, claims and
                          expenses, including attorneys' fees, that arise from a
                          breach of these Terms of Use for which you are
                          responsible or in connection with your transmission of
                          any content to, on or through any SuperFit. Without
                          limiting your indemnification obligations described
                          herein, SuperFit reserves the right, at its own
                          expense, to assume the exclusive defense and control
                          of any matter otherwise subject to indemnification by
                          you.
                        </p>
                        <p>
                          <strong>Other Legal Terms </strong>
                        </p>
                        <p>
                          You agree that these Terms of Use are not intended to
                          confer and do not confer any rights or remedies upon
                          any third party. If any part of these Terms of Use are
                          held invalid or unenforceable, that portion shall be
                          construed in a manner consistent with applicable law
                          to reflect, as nearly as possible, the original
                          intentions of the parties, and the remaining portions
                          shall remain in full force and effect. If any
                          provision of these Terms of Use is found to be illegal
                          or unenforceable, these Terms of Use will be deemed
                          modified to the extent necessary to make them legal
                          and enforceable, and will remain, as modified, in full
                          force and effect. These Terms of Use, including all
                          terms and policies referenced herein, contain the
                          entire understanding, and supersede all prior
                          agreements, between you and SuperFit relating to this
                          subject matter, and cannot be changed or terminated
                          orally.
                        </p>
                        <p>
                          <strong>
                            Applicable Law, Jurisdiction, And Venue{" "}
                          </strong>
                        </p>
                        <p>
                          In order to expedite and control the cost of disputes,
                          you and SuperFit agree that any legal or equitable
                          claim relating to this Terms of Service (referred to
                          as a "Claim") will be resolved as set forth in this
                          Section XII.
                        </p>
                        <p>
                          <strong>A.</strong>
                          <strong>Informal Resolution</strong>. You and SuperFit
                          agree that we will first try to resolve any Claim
                          informally. Accordingly, neither of us may start a
                          formal proceeding for at least thirty (30) days after
                          one of us notifies the other of a Claim in writing.
                          SuperFit will send its notice to your email address.
                          You will send your notice to
                          <span style={{ textDecoration: "underline" }}>
                            URL for contact{" "}
                          </span>
                        </p>
                        <p>
                          <strong>B.</strong>
                          <strong>Arbitration</strong>. Please read this
                          carefully. It affects your rights. SuperFit and you
                          (such references include our respective predecessors
                          in interest, successors and assigns) agree to
                          arbitrate all disputes and claims arising out of or
                          relating to this Terms of Service between SuperFit and
                          you. The arbitration shall be governed by the
                          Commercial Dispute Resolution Procedures and the
                          Supplementary Procedures for Consumer Related Disputes
                          (collectively, "AAA Rules") of the American
                          Arbitration Association ("AAA"), as modified by this
                          Terms of Service, and shall be administered by the
                          AAA. All issues are for the arbitrator to decide,
                          including the scope of this arbitration clause, but
                          the arbitrator is bound by this Terms of Service.
                          Except as otherwise provided for herein, SuperFit will
                          pay all AAA filing, administration and arbitrator
                          fees. If, however, the arbitrator finds that either
                          the substance of your claim or the relief sought is
                          improper or not warranted, as measured by the
                          standards set forth in Federal Rule of Civil Procedure
                          11(b), then the payment of all such fees shall be
                          governed by the AAA Rules. In such case, you agree to
                          reimburse SuperFit for all monies previously disbursed
                          by it that are otherwise your obligation to pay under
                          the AAA Rules. If the arbitrator grants relief to you
                          that is equal to or greater than the value of your
                          demand, SuperFit shall reimburse you for your
                          reasonable attorneys’ fees and expenses incurred for
                          the arbitration. You agree that, by entering into this
                          Terms of Service, you and SuperFit are waiving the
                          right to a trial by jury. You and SuperFit agree that
                          YOU AND SUPERFIT MAY BRING CLAIMS AGAINST THE OTHER
                          ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, and not as a
                          plaintiff or class member in any purported class or
                          representative proceeding. Further, you agree that the
                          arbitrator may not consolidate proceedings or more
                          than one person's claims, and may not otherwise
                          preside over any form of a representative or class
                          proceeding, and that if this specific proviso is found
                          to be unenforceable, then the entirety of this
                          arbitration clause shall be null and void.
                        </p>
                        <p>
                          <strong>C.</strong>
                          <strong>Formal Resolution</strong>. If we cannot
                          resolve a Claim informally, you and SuperFit each
                          agree to submit to personal jurisdiction in New York
                          and agree that any and all Claims either of us asserts
                          shall be exclusively brought in the Competent Court of
                          New York, New York, provided that neither you nor
                          SuperFit shall be precluded from filing a Claim in
                          small claims court, regardless of whether such small
                          claims court is located in New York, New York, for
                          disputes within the jurisdiction of a small claims
                          court.
                        </p>
                        <p>
                          <strong>D.</strong>
                          <strong>
                            Governing Law and Jurisdictional Issues
                          </strong>
                          . These Terms of Service is governed in all respects
                          by the substantive laws of the State of New York and
                          of the United States of America. The UN Convention on
                          Contracts for the International Sale of Goods is
                          expressly disclaimed. Those who choose to access our
                          App or our Services from other locations do so on
                          their own initiative and are responsible for
                          compliance with local laws, if and to the extent local
                          laws are applicable. Access to our App or our Services
                          from any territory where the content is illegal is
                          prohibited. You may not use or export any of the
                          materials available on our App or through our Services
                          in violation of U.S. export laws and regulations.
                        </p>
                        <p>
                          <strong>Force Majeure</strong>
                        </p>
                        <p>
                          SuperFit shall not be liable for any delay or failure
                          to perform resulting from causes outside the
                          reasonable control of SuperFit, including without
                          limitation any failure to perform hereunder due to
                          unforeseen circumstances or cause beyond SuperFit’s
                          control such as acts of God, war, terrorism, riots,
                          embargoes, acts of civil or military authorities,
                          fire, floods, accidents, strikes, or shortages of
                          transportation facilities, fuel, energy, labor or
                          materials.
                        </p>
                      </div>
                    </article>
                  </div>
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
