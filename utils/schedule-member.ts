import { FIRScheduleMember, SubscriptionStatus } from "@superfitapp/superfitjs";

// TODO:// this should be tested
export function isPayingMember(scheduleMember: FIRScheduleMember): boolean {
  const info = scheduleMember.membershipInfo;

  if (!scheduleMember.membershipInfo) {
    return false;
  }

  const subscriptionStatus = info?.subscriptionStatus;
  const endedAtTimeStamp = info?.subscriptionEndedAt;

  let isActive =
    subscriptionStatus == SubscriptionStatus.active ||
    subscriptionStatus == SubscriptionStatus.trialing ||
    subscriptionStatus == SubscriptionStatus.canceled;

  if (endedAtTimeStamp && isActive ) {
    let endDate = new Date(endedAtTimeStamp * 1000);
    return endDate > new Date();
  } else if (!subscriptionStatus && !info.invoiceStatus) {
    // Lifetime membership
    return true;
  }

  return true;
}
