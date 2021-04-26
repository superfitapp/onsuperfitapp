import {
  ShowFIRSchedule,
  FIRUser,
  FIRActivity,
  FIRInstructionSet,
  FIRScheduleMember,
  VisibilityStatus,
  FIRProgressLog,
} from "@superfitapp/superfitjs";
import axios from "axios";
import { fetchActivity } from "./activity";

export interface ShowFIRScheduleResponse {
  schedule: ShowFIRSchedule;
  currentUser?: FIRUser;
  activities: FIRActivity[];
  scheduleMember?: FIRScheduleMember;
}

export interface ShowFIRActivityResponse {
  accessLevel?: string;
  hasAccess: boolean;
  accessOptions: string[];
  activity?: FIRActivity;
  schedule: ShowFIRSchedule;
  scheduleMember?: FIRScheduleMember;
  instructionSet?: FIRInstructionSet;
  userLog?: FIRProgressLog
}

export async function getShowActivity(
  activityId: string,
  scheduleId: string
): Promise<ShowFIRActivityResponse> {
  const activity = await fetchActivity(scheduleId, activityId);
  // we only do this stringify/parse dance because
  // fetching FIR documents ƒrom getStaticProps does not
  // return clean json
  let string = JSON.stringify(activity);
  let data = JSON.parse(string);

  return data;
}
