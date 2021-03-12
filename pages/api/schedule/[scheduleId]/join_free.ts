import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { stripeNode } from "@/utils/stripe-server";

import { db } from "@/lib/firebase-admin";

import {
  FIRSchedule,
  FIRUser,
  ScheduleSignUpType,
} from "@superfitapp/superfitjs";
import { addUserToSchedule } from "@/lib/schedule-member";

export default withApiAuthRequired(async function Join(req, res) {
  const userSession = getSession(req, res);
  const user = userSession?.user;
  const userId = user?.sub;

  if (!user || !userId) {
    throw Error("The function must be called while authenticated.");
  }

  const scheduleId = req.query["scheduleId"] as string;

  if (!scheduleId) {
    throw Error("schedule id required.");
  }

  let currentUserSnap = await db.collection("users").doc(userId).get();

  const recipientUser: FIRUser | undefined = currentUserSnap.data() as FIRUser;

  if (!recipientUser) {
    throw Error("user not found.");
  }

  let scheduleSnap = await db.collection("schedules").doc(scheduleId).get();
  const scheduleToJoin:
    | FIRSchedule
    | undefined = scheduleSnap.data() as FIRSchedule;

  if (!scheduleToJoin) {
    throw Error("schedule not found.");
  }

  if (scheduleToJoin.signupType == ScheduleSignUpType.inviteOnly) {
    throw Error("must be invited to schedule");
  }

  if (scheduleToJoin.payToJoin) {
    throw Error("must pay to join");
  }

  await addUserToSchedule(scheduleToJoin, scheduleSnap, recipientUser);

  res.json(scheduleToJoin);
});
