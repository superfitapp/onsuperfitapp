import { AccessLevel, FIRActivity } from "@superfitapp/superfitjs";
/**
 * NOTE: This file is copied from cloud-functions.
 */

export class PriceCalculator {
  static isTipEnabled(activity: FIRActivity): boolean {
    return (
      activity.tipConfig?.tipEnabled == true &&
      activity.access == AccessLevel.all
    );
  }

  static calculatePrice(data: {
    activity: FIRActivity;
    appFeePercent: number;
    tipAmount?: number;
  }): {
    amount: number;
    fee: number;
  } {
    const tipEnabled = PriceCalculator.isTipEnabled(data.activity);
    const priceAmount = data.activity.signupConfig?.priceAmount;
    const tipAmount = data.tipAmount as number;

    if (tipEnabled) {
      if (!tipAmount) {
        throw Error("Tip amount required when tip enabled.");
      }

      if (!(tipAmount >= 0)) {
        throw Error("Tip amount must be greater than 0");
      }

      return {
        fee: 0,
        amount: tipAmount,
      };
    } else {
      if (!priceAmount) {
        throw Error("Price amount required to calculate price.");
      }

      return {
        fee: priceAmount * data.appFeePercent,
        amount: priceAmount,
      };
    }
  }
}
