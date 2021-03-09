import { NextApiRequest, NextApiResponse } from "next";
import { fetchShowSchedule } from "@/lib/show-schedule";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function showSchedule(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchShowSchedule(req, res);
});
