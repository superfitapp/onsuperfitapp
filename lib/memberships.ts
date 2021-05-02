import { FIRScheduleMember, SubscriptionStatus } from "@superfitapp/superfitjs";

export function hasValidMembership(member: FIRScheduleMember): boolean {
  if (!member.membershipInfo) {
    return false;
  }

  let subscriptionStatus = member.membershipInfo.subscriptionStatus;
  let endedAt = member.membershipInfo.subscriptionEndedAt;

  if (subscriptionStatus && endedAt) {
    let endDate = new Date(endedAt);
    let isActive =
      subscriptionStatus == SubscriptionStatus.active ||
      subscriptionStatus == SubscriptionStatus.trialing ||
      subscriptionStatus == SubscriptionStatus.canceled;
    return isActive && endDate > new Date();
  }

  return true;
}
