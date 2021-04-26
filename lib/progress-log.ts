import * as admin from "firebase-admin";
import {
  FIRSchedule,
  FIRUser,
  ScheduleRole,
  FIRScheduleMember,
  MemberStatus,
  ConnectMembershipInfo,
} from "@superfitapp/superfitjs";

export async function progressLogSnap(data: {
  activityId: string,
  userId: string
}): Promise<
  FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData | undefined>
> {
  // check if user is already in schedule.
  let matchingLogs = await admin
    .firestore()
    .collectionGroup("entries")
    .where("activityId", "==", data.activityId)
    .where("ownerId", "==", data.userId)
    .get();

  return matchingLogs.docs[0];
}