import {
  ShowFIRSchedule,
  FIRUser,
  FIRActivity,
  FIRInstructionSet,
  FIRScheduleMember,
  VisibilityStatus,
} from "@superfitapp/superfitjs";
import axios from "axios";
import { fetchShowActivity } from "./activity";
import { fetchShowSchedule } from "./schedule";

export interface ShowFIRScheduleResponse {
  schedule: ShowFIRSchedule;
  currentUser?: FIRUser;
  activities: FIRActivity[];
  scheduleMember?: FIRScheduleMember;
}

export interface ShowFIRActivityResponse {
  activityVisibility?: string;
  activity?: FIRActivity;
  schedule: ShowFIRSchedule;
  scheduleMember?: FIRScheduleMember;
  instructionSet?: FIRInstructionSet;
}

export async function getShowActivity(
  activityId: string,
  scheduleId: string
): Promise<ShowFIRActivityResponse> {
  const activity = await fetchShowActivity(scheduleId, activityId);
  // we only do this stringify/parse dance because
  // fetching FIR documents ƒrom getStaticProps does not
  // return clean json
  let string = JSON.stringify(activity);
  let data = JSON.parse(string);

  return data;
}
