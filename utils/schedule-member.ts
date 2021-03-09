import { FIRScheduleMember } from "@superfitapp/superfitjs";

export function isPayingMember(scheduleMember: FIRScheduleMember): boolean {
  const info = scheduleMember.membershipInfo;

  if (!scheduleMember.membershipInfo) {
    return false;
  }

  const subscriptionStatus = info?.subscriptionStatus;
  const endedAtTimeStamp = info?.subscriptionEndedAt;

  function statusIsActive(subscriptionStatus: string): boolean {
    return (
      subscriptionStatus == "active" ||
      subscriptionStatus == "trialing" ||
      subscriptionStatus == "canceled"
    );
  }

  if (info.subscriptionStatus && endedAtTimeStamp && subscriptionStatus) {
    let endDate = new Date(endedAtTimeStamp * 1000);
    return statusIsActive(subscriptionStatus) && endDate > new Date();
  } else if (!subscriptionStatus && !info.invoiceStatus) {
    // Lifetime membership
    return true;
  }

  return true;
}
