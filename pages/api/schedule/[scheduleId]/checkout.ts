import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { stripeNode } from "@/utils/stripe-server";
import { db } from "@/lib/firebase-admin";
import { FIRSchedule, FIRUser } from "@superfitapp/superfitjs";
import { fetchOrCreateStripeCustomerIdForConnectAccount } from "@/utils/stripe-server";
import { CheckoutResponse } from "@/lib/checkout-response";
import { CheckoutType } from "./activity/[activityId]/CheckoutType";

export default withApiAuthRequired(async function CheckoutSession(req, res) {
  const userSession = getSession(req, res);
  const user = userSession?.user;
  const userId = user?.sub;

  if (!user || !userId) {
    res.status(401);
    res.end();
    return;
  }

  const scheduleId = req.query["scheduleId"] as string;

  if (!scheduleId) {
    throw Error("schedule id required.");
  }

  let currentUserSnap = await db.collection("users").doc(userId).get();
  const currentUser: FIRUser = currentUserSnap.data() as FIRUser;

  if (!currentUser) {
    throw Error("Authenticated user not found.");
  }

  let scheduleSnap = await db.collection("schedules").doc(scheduleId).get();
  const currentSchedule: FIRSchedule | undefined =
    scheduleSnap.data() as FIRSchedule;

  if (!currentSchedule) {
    throw Error("schedule not found.");
  }

  if (!currentSchedule.stripeProductId) {
    throw Error("membership payments not enabled for schedule.");
  }

  let stripePrice =
    currentSchedule.stripeCurrentOneTimePrice ||
    currentSchedule.stripeCurrentMonthlyPrice ||
    currentSchedule.stripeCurrentYearlyPrice;

  if (!currentSchedule || !stripePrice) {
    throw Error("schedule or price not found.");
  }

  let scheduleOwnerSnap = await db
    .collection("users")
    .doc(currentSchedule.ownerId)
    .get();
  const scheduleOwner: FIRUser = scheduleOwnerSnap.data() as FIRUser;

  if (
    !scheduleOwner.billingInfo ||
    !scheduleOwner.billingInfo.stripe ||
    !scheduleOwner.billingInfo.stripe.connectId
  ) {
    console.log("schedule owner is not a commerce user", userId);
    throw Error("owner is not a commerce user.");
  }

  let currentUserCustomerId =
    await fetchOrCreateStripeCustomerIdForConnectAccount(
      currentUser,
      scheduleOwner.billingInfo.stripe.connectId
    );

  const session = await stripeNode.checkout.sessions.create(
    {
      payment_method_types: ["card"],
      metadata: {
        checkoutType: CheckoutType.Schedule,
        productId: currentSchedule.stripeProductId,
        priceId: stripePrice.priceId,
        ownerId: scheduleOwner.userId,
        userId: userId,
        scheduleId: scheduleId,
      },
      line_items: [
        {
          price: stripePrice.priceId,
          quantity: 1,
        },
      ],
      customer: currentUserCustomerId,
      allow_promotion_codes: true,
      mode:
        currentSchedule.stripeCurrentOneTimePrice == undefined
          ? "subscription"
          : "payment",
      subscription_data:
        currentSchedule.stripeCurrentOneTimePrice == undefined
          ? {
              application_fee_percent: 5,
            }
          : undefined,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${scheduleSnap.id}/checklist`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${scheduleSnap.id}/checklist`,
    },
    {
      stripeAccount: scheduleOwner.billingInfo.stripe.connectId,
    }
  );

  let response: CheckoutResponse = {
    type: "checkout",
    sessionId: session.id,
    connectStripeAccountId: scheduleOwner.billingInfo.stripe.connectId,
  };

  res.json(response);
});
