import { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { fetchActivity } from "@/lib/activity";

export default withApiAuthRequired(async function showActivity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = getSession(req, res);

  const response = await fetchActivity(
    req.query.scheduleId as string,
    req.query.activityId as string,
    user.sub
  );

  res.status(200).json(response);
});
