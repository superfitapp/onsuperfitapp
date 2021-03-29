import * as admin from "firebase-admin";
import {
  FIRSchedule,
  FIRUser,
  ScheduleRole,
  FIRScheduleMember,
  MemberStatus,
  ConnectMembershipInfo,
} from "@superfitapp/superfitjs";

export async function scheduleMemberSnap(
  userId: string,
  scheduleId: string
): Promise<
  FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData | undefined>
> {
  // check if user is already in schedule.
  let matchingRecipients = await admin
    .firestore()
    .collection("schedules")
    .doc(scheduleId)
    .collection("schedule_members")
    .where("userId", "==", userId)
    .get();

  return matchingRecipients.docs[0];
}

export async function addUserToSchedule(
  scheduleToJoin: FIRSchedule,
  scheduleSnap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
  user: FIRUser,
  membershipInfo?: ConnectMembershipInfo
): Promise<any> {
  let scheduleMemberSnap = await this.scheduleMemberSnap(
    user.userId,
    scheduleSnap.id
  );

  // redundant check
  if (scheduleMemberSnap && scheduleMemberSnap.data()) {
    throw Error("already a member in schedule.");
  }

  // add member
  const joinedTimestamp: FirebaseFirestore.Timestamp = admin.firestore.Timestamp.now();

  let member: FIRScheduleMember = {
    userId: user.userId,
    username: user.username,
    name: user.name,
    memberRole: ScheduleRole.Member,
    scheduleTitle: scheduleToJoin.title,
    scheduleId: scheduleSnap.id,
    joined: joinedTimestamp,
    status: MemberStatus.Active,
    membershipInfo: membershipInfo,
  };

  await admin
    .firestore()
    .collection("schedules")
    .doc(scheduleSnap.id)
    .collection("schedule_members")
    .add(member);
}

