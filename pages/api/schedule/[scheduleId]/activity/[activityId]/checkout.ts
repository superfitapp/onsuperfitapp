import { getSession } from "@auth0/nextjs-auth0";
import { db } from "@/lib/firebase-admin";
import { CheckoutResponse } from "@/lib/checkout-response";
import { FIRActivity, FIRUser } from "@superfitapp/superfitjs";
import {
  StripeService,
  stripeNode,
} from "@/utils/StripeService";
import { fetchScheduleOwnerConnectData } from "@/lib/db-authed";
import { CheckoutType } from "./CheckoutType";
import { getPhotoUrl } from "@/utils/helpers";
import { PriceCalculator } from "@/utils/price-calculator";

export default async function CheckoutActivity(req, res) {
  const userSession = getSession(req, res);
  const user = userSession?.user;
  let userId = user?.sub;

  let activityId = req.query["activityId"];
  let scheduleId = req.query["scheduleId"];
  let tipAmount = req.query["tipAmount"];

  if (!activityId || !scheduleId) {
    throw Error("activity id and schedule id required.");
  }

  let activitySnap = await db
    .collection("schedules")
    .doc(scheduleId)
    .collection("activities")
    .doc(activityId)
    .get();

  const activity: FIRActivity | undefined = activitySnap.data() as FIRActivity;
  const currency = activity.signupConfig?.priceCurrency || "usd"

  if (!activity) {
    throw Error("activity id and schedule id required.");
  }

  // not required
  let currentUser: FIRUser | undefined;

  if (userId) {
    let currentUserSnap = await db.collection("users").doc(userId).get();
    currentUser = currentUserSnap.data() as FIRUser;
  }

  const { connectId, owner } = await fetchScheduleOwnerConnectData({
    scheduleId: scheduleId,
  });

  if (!connectId) {
    throw Error("owner is not a commerce user.");
  }

  let configuredForPurchase =
    activity.signupConfig && activity.signupConfig.priceAmount;

  let configuredForGift =
    tipAmount && activity.tipConfig && activity.tipConfig?.tipEnabled;

  if (!configuredForPurchase && !configuredForGift) {
    throw Error("checkout not configured for activity");
  }

  let currentUserCustomerId: string | undefined;
  if (currentUser) {
    currentUserCustomerId =
      await StripeService.fetchOrCreateStripeCustomerIdForConnectAccount(
        currentUser,
        connectId,
        currency
      );
  }

  let { amount, fee } = PriceCalculator.calculatePrice({
    activity: activity,
    appFeePercent: 0.05,
    tipAmount: tipAmount,
  });

  let description = `${activity.title}${
    activity?.description ? `: ${activity?.description}` : ""
  }`;

  let images = [activity.photo ? getPhotoUrl(activity.photo) : null].filter(
    (item) => item
  );

  const giftNote = PriceCalculator.isTipEnabled(activity) ? "[GIFT]" : "";

  const session = await stripeNode.checkout.sessions.create(
    {
      customer: currentUserCustomerId,
      payment_method_types: ["card"],
      payment_intent_data: {
        application_fee_amount: fee,
        metadata: {
          checkoutType: CheckoutType.Activity,
          ownerId: owner.userId,
          userId: userId,
          activityId: activityId,
          scheduleId: scheduleId,
        },
      },
      line_items: [
        {
          price_data: {
            currency: currency,
            unit_amount: amount,
            product_data: {
              name: `${giftNote} ${activity.title}`,
              description: `${giftNote} ${truncate(description, 200)}`,
              images: images,
            },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${scheduleId}/a/${activityId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${scheduleId}/a/${activityId}`,
    },
    {
      stripeAccount: connectId,
    }
  );

  let response: CheckoutResponse = {
    type: "checkout",
    sessionId: session.id,
    connectStripeAccountId: connectId,
    customerEmail: user?.email,
  };

  res.json(response);
}

function truncate(text: string, length: number): string {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  } else {
    return text;
  }
}
