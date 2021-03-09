import {
  ShowFIRSchedule,
  FIRUser,
  FIRActivity,
  FIRInstructionSet,
  FIRScheduleMember,
} from "@superfitapp/superfitjs";
import axios from "axios";
import { fetchShowSchedule } from "./show-schedule";

export interface ShowFIRScheduleResponse {
  schedule: ShowFIRSchedule;
  currentUser?: FIRUser;
  activities: FIRActivity[];
  scheduleMember?: FIRScheduleMember;
}

export interface ShowFIRActivityResponse {
  activity: FIRActivity;
  schedule: ShowFIRSchedule;
  instructionSet?: FIRInstructionSet;
}

export async function getSchedule(
  id: string
): Promise<{ schedule: ShowFIRScheduleResponse }> {
  const schedule = await fetchShowSchedule(id);

  let string = JSON.stringify(schedule);
  let data = JSON.parse(string);

  return { schedule: data };
}

export async function getShowActivity(
  activityId: string,
  scheduleId: string
): Promise<ShowFIRActivityResponse> {
  const { data } = await axios.get<ShowFIRActivityResponse>(
    `${process.env.NEXT_PUBLIC_SUPERFIT_API_BASE_URL}/show_activity`,
    {
      params: {
        activityId: activityId,
        scheduleId: scheduleId,
      },
    }
  );

  return data;
}
