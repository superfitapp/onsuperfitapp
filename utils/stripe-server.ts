import { db } from "@/lib/firebase-admin";
import { addUserToSchedule, scheduleMemberSnap } from "@/lib/schedule-member";
import {
  ConnectMembershipInfo,
  FIRSchedule,
  FIRScheduleMember,
  FIRUser,
} from "@superfitapp/superfitjs";
import Stripe from "stripe";

export const stripeNode = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export async function createSetupIntent(user: FIRUser): Promise<any> {
  const stripeCustomerId = await fetchStripeCustomerId(user);
  return stripeNode.setupIntents.create({
    payment_method_types: ["card"],
    customer: stripeCustomerId,
  });
}

export async function fetchScheduleForProductId(
  productId: string
): Promise<{
  schedule: FIRSchedule;
  scheduleSnap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;
}> {
  // Create or update schedule member
  const schedulesSnap = await db
    .collection("schedules")
    .where("stripeProductId", "==", productId)
    .get();

  const errorMessage = "schedule does not exist.";
  if (schedulesSnap.empty) {
    throw Error(errorMessage);
  }

  const scheduleSnap = schedulesSnap.docs[0];
  const schedule = scheduleSnap.data() as FIRSchedule;

  if (!schedule) {
    throw Error(errorMessage);
  }

  return { schedule, scheduleSnap };
}

export async function createPaymentIntent(
  user: FIRUser,
  paymentMethodId: string,
  amount: number,
  currency: string,
  stripeOwnerId: string,
  description: string
): Promise<any> {
  const stripeCustomerId = await fetchStripeCustomerId(user);

  const paymentIntent = await stripeNode.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: stripeCustomerId,
    payment_method: paymentMethodId,
    setup_future_usage: "off_session",
    capture_method: "automatic",
    confirmation_method: "automatic",
    confirm: true,
    description: description,
    statement_descriptor: `SuperFit`,
    // The destination parameter directs the transfer of funds from platform to pilot
    transfer_data: {
      // Send the amount for the pilot after collecting a 20% platform fee:
      // the `amountForPilot` method simply computes `ride.amount * 0.8`
      // The destination of this Payment Intent is the pilot's Stripe account
      destination: stripeOwnerId,
    },
  });

  return paymentIntent;
}

export async function createEphemeralKey(
  user: FIRUser,
  apiVersion: string
): Promise<Stripe.EphemeralKey> {
  // Create ephemeral key for customer
  const ephemeralKey = await stripeNode.ephemeralKeys.create(
    {
      customer: await fetchStripeCustomerId(user),
    },
    {
      apiVersion: apiVersion,
    }
  );
  return ephemeralKey;
}

export async function fetchStripeCustomerId(user: FIRUser): Promise<string> {
  let stripeCustomerId = user.billingInfo?.stripe?.customerId;

  // create customer
  if (!stripeCustomerId) {
    const customer = await createCustomer(user);

    var update: any = {};
    update["billingInfo.stripe.customerId"] = customer.id;

    await db.collection("users").doc(user.userId).update(update);
    return customer.id;
  }

  return stripeCustomerId;
}

export async function fetchUserForConnectAccount(data: {
  connectAccountId: string;
  connectCustomerId: string;
}): Promise<{
  customerUser: FIRUser;
  customerSnap: FirebaseFirestore.DocumentData;
}> {
  const usersSnap = await db
    .collection("users")
    .where(
      `billingInfo.stripe.connectCustomerIds.${data.connectAccountId}`,
      "==",
      data.connectCustomerId
    )
    .get();

  const customerSnap = usersSnap.docs[0];

  if (!customerSnap) {
    throw Error("customer does not exist.");
  }

  const customerUser: FIRUser = customerSnap?.data() as FIRUser;

  if (!customerUser) {
    throw Error("customer does not exist.");
  }

  return { customerUser, customerSnap };
}

export async function fetchOrCreateStripeCustomerIdForConnectAccount(
  user: FIRUser,
  connectedAccountId: string
): Promise<string> {
  // create customer
  if (
    !user.billingInfo ||
    !user.billingInfo.stripe ||
    !user.billingInfo.stripe.connectCustomerIds ||
    !user.billingInfo.stripe.connectCustomerIds[connectedAccountId]
  ) {
    const customer = await createCustomerForConnectAccount(
      user,
      connectedAccountId
    );

    let update: { [key: string]: any } = {};
    update[connectedAccountId] = customer.id;

    await db
      .collection("users")
      .doc(user.userId)
      .set(
        {
          billingInfo: {
            stripe: {
              connectCustomerIds: update,
            },
          },
        },
        { merge: true }
      );

    return customer.id;
  } else {
    return user.billingInfo.stripe.connectCustomerIds[connectedAccountId];
  }
}

export async function fetchStripeConnectId(user: FIRUser): Promise<string> {
  let stripeConnectId = user.billingInfo?.stripe?.connectId;

  // create customer
  if (!stripeConnectId) {
    const connectAccount = await createConnectAccount(user);

    var update: any = {};
    update["billingInfo.stripe.connectId"] = connectAccount.id;

    await db.collection("users").doc(user.userId).update(update);
    return connectAccount.id;
  }

  return stripeConnectId;
}

async function createConnectAccount(user: FIRUser): Promise<Stripe.Account> {
  if (!user.email) {
    throw Error("email required to create stripe customer");
  }

  return await stripeNode.accounts.create({
    type: "standard",
    email: user.email,
  });
}

async function createCustomer(user: FIRUser): Promise<Stripe.Customer> {
  if (!user.email) {
    throw Error("email required to create stripe customer");
  }

  return await stripeNode.customers.create({
    description: `Customer for ${user.email}`,
    email: user.email,
  });
}

async function createCustomerForConnectAccount(
  user: FIRUser,
  connectedAccountId: string
): Promise<Stripe.Customer> {
  if (!user.email) {
    throw Error("email required to create stripe customer");
  }

  return await stripeNode.customers.create(
    {
      description: `Customer for ${user.email}`,
      email: user.email,
    },
    {
      stripeAccount: connectedAccountId,
    }
  );
}
