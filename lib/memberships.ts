import { FIRScheduleMember } from "@superfitapp/superfitjs";

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

// to do, move shared js
enum SubscriptionStatus {
  active = "active",
  past_due = "past_due",
  unpaid = "unpaid",
  canceled = "canceled",
  incomplete = "incomplete",
  incomplete_expired = "incomplete_expired",
  trialing = "trialing",
}
