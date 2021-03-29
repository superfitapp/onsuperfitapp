import { db } from "@/lib/firebase-admin";
import { getSession } from "@auth0/nextjs-auth0";
import {
  ActivityStatus,
  FIRActivity,
  FIRSchedule,
  FIRScheduleMember,
  FIRUser,
  ShowFIRSchedule,
  VisibilityStatus,
} from "@superfitapp/superfitjs";
import { scheduleMemberSnap } from "./schedule-member";
import { ShowFIRScheduleResponse } from "./db-public";

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

  const currentSchedule:
    | FIRSchedule
    | undefined = scheduleSnap.data() as FIRSchedule;

  if (!currentSchedule) {
    throw Error("schedule not found.");
  }

  let showSchedule: ShowFIRSchedule = createShowSchedule(currentSchedule);

  var scheduleMember: FIRScheduleMember | undefined = null;

  if (userId) {
    try {
      const snap = await scheduleMemberSnap(userId, scheduleId);
      if (snap && snap.data()) {
        scheduleMember = snap.data() as FIRScheduleMember;
      }
    } catch {}
  }

  if (currentSchedule.visibilityStatus != VisibilityStatus.Public) {
    return {
      schedule: showSchedule,
      activities: [],
      scheduleMember: scheduleMember,
    };
  }

  var activities: FIRActivity[] | undefined = null;
  if (fetchRecentActivities) {
    // fetch recent activities
    let activitiesSnap = await db
      .collectionGroup("activities")
      .orderBy("scheduledDate", "desc")
      .limit(10)
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
