import { NextApiRequest, NextApiResponse } from "next";
import { fetchShowSchedule } from "@/lib/schedule";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";

export default withApiAuthRequired(withSentry(async function showSchedule(
  req: NextApiRequest,
  res: NextApiResponse
) {

  throw new Error("API throw error test")
  return res.status(200)
  const { user } = getSession(req, res);
  const fetchRecentActivities = req.query?.fetchRecentActivities;

  const response = await fetchShowSchedule({
    scheduleId: req.query.scheduleId as string,
    fetchRecentActivities: fetchRecentActivities == "true",
    userId: user.sub,
  });

  res.status(200).json(response);
}));
