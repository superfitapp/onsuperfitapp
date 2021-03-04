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
}

export interface ShowFIRActivityResponse {
  activity: FIRActivity;
  instructionSet?: FIRInstructionSet;
}

export async function getSchedule(
  id: string
): Promise<ShowFIRScheduleResponse> {
  const { data } = await axios.get<ShowFIRScheduleResponse>(
    `${process.env.NEXT_PUBLIC_SUPERFIT_API_BASE_URL}/show_schedule`,
    {
      params: {
        scheduleId: id,
      },
    }
  );

  return data;
}

export async function getActivity(
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
