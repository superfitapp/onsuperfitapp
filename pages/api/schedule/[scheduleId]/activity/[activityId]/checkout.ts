import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { db } from "@/lib/firebase-admin";
import { CheckoutResponse } from "../../checkout_session";
import { FIRActivity, FIRUser } from "@superfitapp/superfitjs";
import {
  fetchOrCreateStripeCustomerIdForConnectAccount,
  stripeNode,
} from "@/utils/stripe-server";
import { fetchScheduleOwnerConnectData } from "@/lib/db-authed";
import { CheckoutType } from "./CheckoutType";
export default async function CheckoutActivity(req, res) {
  const userSession = getSession(req, res);
  const user = userSession?.user;
  let userId = user?.sub;

  let activityId = req.query["activityId"];
  let scheduleId = req.query["scheduleId"];
  let currency = req.query["currency"] || "usd";

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

  let currentUserCustomerId: string | undefined;
  if (currentUser) {
    currentUserCustomerId = await fetchOrCreateStripeCustomerIdForConnectAccount(
      currentUser,
      connectId
    );
  }
  
  let unitAmount = 100;
  let fee = unitAmount * 0.05;
  const session = await stripeNode.checkout.sessions.create(
    {
      customer: currentUserCustomerId,
      payment_method_types: ["card"],
      metadata: {
        checkoutType: CheckoutType.Activity,
        ownerId: owner.userId,
        userId: userId,
        activityId: activityId,
        scheduleId: scheduleId,
      },
      payment_intent_data: {
        application_fee_amount: fee,
      },
      line_items: [
        {
          price_data: {
            currency: currency,
            unit_amount: unitAmount,
            product_data: {
              name: activity.title,
              description: truncate(activity.description || "", 30),
              // images: ["https://example.com/t-shirt.png"],
            },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      mode: "payment",
      success_url: `https://superfitapp.com/s/${scheduleId}`,
      cancel_url: `https://superfitapp.com/s/${scheduleId}`,
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
