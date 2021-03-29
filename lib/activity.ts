import { db } from "@/lib/firebase-admin";
import { getSession } from "@auth0/nextjs-auth0";
import {
  AccessLevel,
  FIRActivity,
  FIRInstructionSet,
  FIRSchedule,
  FIRScheduleMember,
  ShowFIRSchedule,
  VisibilityStatus,
} from "@superfitapp/superfitjs";
import { scheduleMemberSnap } from "./schedule-member";
import { ShowFIRActivityResponse } from "./db-public";
import { createShowSchedule } from "./schedule";

export async function fetchShowActivity(
  scheduleId: string,
  activityId: string,
  userId?: string
): Promise<ShowFIRActivityResponse> {
  if (!scheduleId || !activityId) {
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

  // not public schedule.
  if (currentSchedule.visibilityStatus != VisibilityStatus.Public) {
    if (!userId) {
      // and not a user
      return {
        schedule: currentSchedule,
        activity: null,
      };
    } else {
      // not public, not a member
      if (!scheduleMember) {
        return {
          schedule: currentSchedule,
          activity: null,
        };
      } else {
        // is a member
      }
    }
  }

  // is a public schedule
  let activitySnap = await db
    .collection("schedules")
    .doc(scheduleId)
    .collection("activities")
    .doc(activityId)
    .get();

  const activity: FIRActivity | undefined = activitySnap.data() as FIRActivity;
  var instructionSet: FIRInstructionSet | undefined = null;

  if (!activity) {
    throw Error("activity not found.");
  }

  if (activity.access != AccessLevel.all && !scheduleMember) {
    // not public activity, not a member
    return {
      schedule: showSchedule,
      scheduleMember: null,
      activity: activity,
      accessLevel: activity.access,
    };
  }

  // Either:
  // 1. not a public activity and is a member
  // 2. public activity
  let instructionSetId = activity.instructionSetId;

  if (instructionSetId) {
    let instructionSetSnap = await db
      .collection("instruction_sets")
      .doc(instructionSetId)
      .get();

    const instructionSetData:
      | FIRInstructionSet
      | undefined = instructionSetSnap.data() as FIRInstructionSet;

    if (instructionSetData) {
      instructionSet = instructionSetData;
    }
  }
  return {
    schedule: showSchedule,
    activity: activity,
    instructionSet: instructionSet,
    scheduleMember: scheduleMember,
    accessLevel: activity.access,
  };
}
