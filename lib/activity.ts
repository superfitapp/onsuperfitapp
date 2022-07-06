import { db } from "@/lib/firebase-admin";
import { getSession } from "@auth0/nextjs-auth0";
import {
  AccessLevel,
  FIRActivity,
  FIRInstructionSet,
  FIRProgressLog,
  FIRSchedule,
  FIRScheduleMember,
  ShowFIRSchedule,
  VisibilityStatus,
} from "@superfitapp/superfitjs";
import { scheduleMemberSnap } from "./schedule-member";
import { ShowFIRActivityResponse } from "./db-public";
import { createShowSchedule } from "./schedule";
import { progressLogSnap } from "./progress-log";
import { isPayingMember } from "@/utils/schedule-member";

export async function fetchActivity(
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
    return {
      hasAccess: false,
      accessOptions: [AccessLevel.all],
      schedule: null,
      activity: null,
      instructionSet: null,
      scheduleMember: null,
      accessLevel: AccessLevel.all,
    }
  }

  // not public schedule.
  if (currentSchedule.visibilityStatus == VisibilityStatus.Archived) {
    throw Error("activity no longer available");
  }

  let showSchedule: ShowFIRSchedule = createShowSchedule(currentSchedule);
  let scheduleMember: FIRScheduleMember | undefined = null;
  let userLog: FIRProgressLog | undefined = null;

  if (userId) {
    try {
      const snap = await scheduleMemberSnap(userId, scheduleId);
      if (snap && snap.data()) {
        scheduleMember = snap.data() as FIRScheduleMember;
        let logSnap = await progressLogSnap({
          activityId: activityId,
          userId: userId,
        });

        userLog = logSnap?.data() as FIRProgressLog;
      }
    } catch { }
  }

  // This is a public schedule.
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

  const { accessOptions, hasAccess } = accessOptionsForActivity({
    activity: activity,
    member: scheduleMember,
    userLog: userLog,
  });

  if (!hasAccess) {
    // not public activity, not a member
    return {
      hasAccess: hasAccess,
      accessOptions: accessOptions,
      schedule: showSchedule,
      scheduleMember: scheduleMember,
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
    hasAccess: hasAccess,
    accessOptions: accessOptions,
    schedule: showSchedule,
    activity: activity,
    instructionSet: instructionSet,
    scheduleMember: scheduleMember,
    accessLevel: activity.access,
  };
}

interface WeightedAccessLevel {
  level: AccessLevel;
  weight: number;
}

function accessOptionsForActivity(data: {
  activity: FIRActivity;
  member?: FIRScheduleMember;
  userLog?: FIRProgressLog;
}): {
  accessOptions: AccessLevel[];
  hasAccess: boolean;
} {
  let activityLevel = data.activity.access || AccessLevel.all;

  if (activityLevel == AccessLevel.all) {
    return {
      accessOptions: [],
      hasAccess: true,
    };
  }

  const membersOnly: WeightedAccessLevel = {
    level: AccessLevel.members,
    weight: 10,
  };

  const paidMembersOnly: WeightedAccessLevel = {
    level: AccessLevel.paidMembers,
    weight: 20,
  };

  const oneTimePurchases: WeightedAccessLevel = {
    level: AccessLevel.oneTimePurchase,
    weight: 30,
  };

  // In the future, when owners can allows paid members
  // access to by-pass otps, weights will change.
  let levels: WeightedAccessLevel[] = [
    membersOnly,
    paidMembersOnly,
    oneTimePurchases,
  ];

  let requiredAccessLevels: WeightedAccessLevel[] = levels.filter(
    (weightedLevel) => weightedLevel.level == activityLevel
  );

  if (requiredAccessLevels.length == 0) {
    throw Error("internal error: unhandled access level case");
  }

  // One Time Purchaser
  if (data.userLog?.signupInfo?.signedUp == true) {
    requiredAccessLevels = requiredAccessLevels.filter((x) => {
      return x.weight > oneTimePurchases.weight;
    });
  }

  if (data.member) {
    
    // paid member
    if (isPayingMember(data.member)) {
      requiredAccessLevels = requiredAccessLevels.filter((x) => {
        return x.weight > paidMembersOnly.weight;
      });
    } else {
      // free member
      requiredAccessLevels = requiredAccessLevels.filter((x) => {
        return x.weight > membersOnly.weight;
      });
    }
  }

  return {
    accessOptions: requiredAccessLevels.map((x) => x.level),
    hasAccess: requiredAccessLevels.length == 0,
  };
}
