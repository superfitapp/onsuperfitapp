import {
  ShowFIRSchedule,
  FIRUser,
  FIRActivity,
  FIRInstructionSet,
} from "@superfitapp/superfitjs";
import axios from "axios";

export interface ShowFIRScheduleResponse {
  schedule: ShowFIRSchedule;
  currentUser?: FIRUser;
  activities: FIRActivity[];
}

export interface ShowFIRActivityResponse {
  activity: FIRActivity;
  schedule: ShowFIRSchedule;
  instructionSet?: FIRInstructionSet;
}

export async function getSchedule(
  id: string
): Promise<ShowFIRScheduleResponse> {
  const { data } = await axios
  .get<ShowFIRScheduleResponse>(
    `${process.env.NEXT_PUBLIC_SUPERFIT_API_BASE_URL}/show_schedule`,
    {
      params: {
        scheduleId: id,
      },
    }
  )

  return data;
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
