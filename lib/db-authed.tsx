// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import firebase from "./firebase";
import {
  FIRSchedule,
  FIRUser,
  ScheduleRole,
  FIRScheduleMember,
  MemberStatus,
  ConnectMembershipInfo,
} from "@superfitapp/superfitjs";

export async function fetchScheduleOwnerConnectData(data: {
  scheduleId: string;
}): Promise<{
  schedule: FIRSchedule;
  scheduleRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  owner: FIRUser;
  connectId?: string;
}> {
  let scheduleSnap = await admin
    .firestore()
    .collection("schedules")
    .doc(data.scheduleId)
    .get();

  const currentSchedule:
    | FIRSchedule
    | undefined = scheduleSnap.data() as FIRSchedule;

  if (!currentSchedule) {
    throw Error("schedule not found.");
  }

  let scheduleOwnerSnap = await admin
    .firestore()
    .collection("users")
    .doc(currentSchedule.ownerId)
    .get();

  const scheduleOwner: FIRUser = scheduleOwnerSnap.data() as FIRUser;

  if (!scheduleOwnerSnap || !scheduleOwner) {
    throw Error("owner not found.");
  }

  return {
    schedule: currentSchedule,
    scheduleRef: scheduleSnap.ref,
    owner: scheduleOwner,
    connectId: scheduleOwner?.billingInfo?.stripe?.connectId,
  };
}
