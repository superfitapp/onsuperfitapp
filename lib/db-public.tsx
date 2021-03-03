import { ShowFIRSchedule, FIRUser } from "@superfitapp/superfitjs";
import axios from "axios";

export interface ShowFIRScheduleResponse {
  schedule: ShowFIRSchedule;
  currentUser?: FIRUser;
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

// export async function getActivity(slug: string) {
//   return await api.posts
//     .read(
//       {
//         slug: slug,
//       },
//       {
//         include: ["authors"],
//       }
//     )
//     .catch((err) => {
//       console.error(err);
//     });
// }
