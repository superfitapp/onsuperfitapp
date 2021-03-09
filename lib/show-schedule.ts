import { db } from "@/lib/firebase-admin";
import { getSession } from "@auth0/nextjs-auth0";
import {
  ActivityStatus,
  FIRActivity,
  FIRSchedule,
  FIRUser,
  ShowFIRSchedule,
  VisibilityStatus,
} from "@superfitapp/superfitjs";
import { NextApiRequest, NextApiResponse } from "next";

export async function fetchShowSchedule(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const scheduleId = req.query.scheduleId as string;
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

  if (currentSchedule.visibilityStatus != VisibilityStatus.Public) {
    res.status(200).json({
      schedule: showSchedule,
    });

    return;
  }

  // fetch recent activities
  let activitiesSnap = await db
    .collectionGroup("activities")
    .orderBy("scheduledDate", "desc")
    .limit(10)
    .where("status", "==", ActivityStatus.Published)
    .where("scheduleInfo.id", "==", scheduleSnap.id)
    .get();

  const activities: FIRActivity[] | undefined = activitiesSnap.docs.map((x) => {
    var activity = x.data() as FIRActivity;
    activity.id = x.id;
    return activity;
  });

  res.status(200).json({
    schedule: showSchedule,
    activities: activities,
  });
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
