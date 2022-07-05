import { db } from "@/lib/firebase-admin";

import {
  FIRUser,
} from "@superfitapp/superfitjs";
import Stripe from "stripe";

export const stripeNode = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export class StripeService {
  static async fetchOrCreateStripeCustomerIdForConnectAccount(
    user: FIRUser,
    connectedAccountId: string,
    currency: string
  ): Promise<string> {
    var ownerConnectAccountByCurrency = connectedAccountId
    if (currency != "usd") {
      // if currency is not usd, hash account with custom currency
      ownerConnectAccountByCurrency = `${connectedAccountId}-${currency.toLowerCase()}`
    }
  
    if (
      !user.billingInfo ||
      !user.billingInfo.stripe ||
      !user.billingInfo.stripe.connectCustomerIds ||
      !user.billingInfo.stripe.connectCustomerIds[ownerConnectAccountByCurrency]
    ) {
      // add customer to hash
      const customer = await this.createCustomerForConnectAccount({
        userEmail: user.email,
        connectedAccountId: connectedAccountId,
      });
  
      let update: { [key: string]: any } = {};
      update[ownerConnectAccountByCurrency] = customer.id;
  
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
      return user.billingInfo.stripe.connectCustomerIds[ownerConnectAccountByCurrency];
    }
  }
  

  static async createCustomerForConnectAccount(data: {
    userEmail: string;
    connectedAccountId: string;
  }): Promise<Stripe.Customer> {
    if (!data.userEmail) {
      throw Error("email required to create stripe customer");
    }

    return await stripeNode.customers.create(
      {
        description: `Customer for ${data.userEmail}`,
        email: data.userEmail,
      },
      {
        stripeAccount: data.connectedAccountId,
      }
    );
  }
}
