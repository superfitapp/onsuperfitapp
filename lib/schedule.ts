import { db } from "@/lib/firebase-admin";
import * as admin from "firebase-admin";
import {
  ActivityStatus,
  FIRActivity,
  FIRSchedule,
  FIRScheduleInvite,
  FIRScheduleMember,
  ScheduleInviteType,
  ShowFIRSchedule,
  VisibilityStatus,
} from "@superfitapp/superfitjs";
import { scheduleMemberSnap } from "./schedule-member";
import { ShowFIRScheduleResponse } from "./db-public";

export async function latestScheduleInviteRequestSnap(
  scheduleId: string,
  scheduleRequesterUserId: string
): Promise<
  FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData | undefined>
> {

  const matchingRequests = await admin
    .firestore()
    .collection("schedules")
    .doc(scheduleId)
    .collection("schedule_invites")
    .orderBy("invitedAt", 'desc')
    .where("type", "==", ScheduleInviteType.Request)
    .where("senderId", "==", scheduleRequesterUserId)
    .get()

  return matchingRequests.docs[0];
}

export async function fetchShowSchedule({
  scheduleId,
  fetchRecentActivities,
  userId,
}: {
  scheduleId: string;
  fetchRecentActivities: boolean;
  userId?: string;
}): Promise<ShowFIRScheduleResponse> {
  if (!scheduleId) {
    throw Error("id required");
  }

  let scheduleSnap = await db.collection("schedules").doc(scheduleId).get();

  const currentSchedule: FIRSchedule | undefined =
    scheduleSnap.data() as FIRSchedule;

  if (!currentSchedule) {
    return {
      schedule: null,
      activities: [],
      scheduleMember: null,
    };
  }

  let showSchedule: ShowFIRSchedule = createShowSchedule(currentSchedule);

  var scheduleMember: FIRScheduleMember | undefined = null;
  var latestInviteRequest: FIRScheduleInvite | undefined = null;

  if (userId) {
    try {
      const memberSnap = await scheduleMemberSnap(userId, scheduleId);
      if (memberSnap && memberSnap.data()) {
        scheduleMember = memberSnap.data() as FIRScheduleMember;
      }

      const latestInviteSnap = await latestScheduleInviteRequestSnap(scheduleId, userId)
      
      if (latestInviteSnap && latestInviteSnap.data()) {
        latestInviteRequest = latestInviteSnap.data() as FIRScheduleInvite;
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (currentSchedule.visibilityStatus != VisibilityStatus.Public) {
    return {
      schedule: showSchedule,
      activities: [],
      scheduleMember: scheduleMember,
      latestInviteRequest: latestInviteRequest
    };
  }

  var activities: FIRActivity[] | undefined = null;
  if (fetchRecentActivities) {
    // fetch recent activities
    let activitiesSnap = await db
      .collectionGroup("activities")
      .orderBy("scheduledDate", "desc")
      .limit(50)
      .where("status", "==", ActivityStatus.Published)
      .where("scheduleInfo.id", "==", scheduleSnap.id)
      .get();

    activities = activitiesSnap.docs.map((x) => {
      var activity = x.data() as FIRActivity;
      activity.id = x.id;
      return activity;
    });
  }

  const data = {
    schedule: showSchedule,
    activities: activities,
    scheduleMember: scheduleMember,
    latestInviteRequest: latestInviteRequest
  };

  let string = JSON.stringify(data);

  return JSON.parse(string);
}

export function createShowSchedule(schedule: FIRSchedule): ShowFIRSchedule {
  let showSchedule: ShowFIRSchedule = {
    title: schedule.title,
    created: schedule.created,
    photo: schedule.photo,
    color: schedule.color,
    visibilityStatus: schedule.visibilityStatus,
    ownerDisplayName: schedule.ownerDisplayName,
    profile: schedule.profile,
    enableSubscription: schedule.enableSubscription,
    stripeProductId: schedule.stripeProductId,
    stripeCurrentOneTimePrice: schedule.stripeCurrentOneTimePrice,
    stripeCurrentMonthlyPrice: schedule.stripeCurrentMonthlyPrice,
    stripeCurrentYearlyPrice: schedule.stripeCurrentYearlyPrice,
    payToJoin: schedule.payToJoin,
    signupType: schedule.signupType,
  };

  return showSchedule;
}
