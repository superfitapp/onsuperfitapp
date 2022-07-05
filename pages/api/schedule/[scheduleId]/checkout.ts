import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { stripeNode } from "@/utils/StripeService";
import { db } from "@/lib/firebase-admin";
import { FIRUser } from "@superfitapp/superfitjs";
import { StripeService } from "@/utils/StripeService";
import { CheckoutResponse } from "@/lib/checkout-response";
import { CheckoutType } from "./activity/[activityId]/CheckoutType";
import { fetchScheduleOwnerConnectData } from "@/lib/db-authed";

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

  const { schedule, connectId, owner } = await fetchScheduleOwnerConnectData({
    scheduleId: scheduleId,
  });

  let stripePrice =
    schedule.stripeCurrentOneTimePrice ||
    schedule.stripeCurrentMonthlyPrice ||
    schedule.stripeCurrentYearlyPrice;

  const currency = stripePrice.currency || "usd"

  if (!schedule || !stripePrice || !schedule.stripeProductId) {
    throw Error(
      "schedule or price/product not found."
    );
  }

  let currentUserCustomerId =
    await StripeService.fetchOrCreateStripeCustomerIdForConnectAccount(
      currentUser,
      connectId,
      currency
    );

  const session = await stripeNode.checkout.sessions.create(
    {
      payment_method_types: ["card"],
      metadata: {
        checkoutType: CheckoutType.Schedule,
        productId: schedule.stripeProductId,
        priceId: stripePrice.priceId,
        ownerId: owner.userId,
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
        schedule.stripeCurrentOneTimePrice == undefined
          ? "subscription"
          : "payment",
      subscription_data:
        schedule.stripeCurrentOneTimePrice == undefined
          ? {
            application_fee_percent: 5,
          }
          : undefined,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${scheduleId}/checklist`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${scheduleId}/checklist`,
    },
    {
      stripeAccount: connectId,
    }
  );

  let response: CheckoutResponse = {
    type: "checkout",
    sessionId: session.id,
    connectStripeAccountId: connectId,
  };

  res.json(response);
});
