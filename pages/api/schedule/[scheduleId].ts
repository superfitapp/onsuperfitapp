import { NextApiRequest, NextApiResponse } from "next";
import { fetchShowSchedule } from "@/lib/show-schedule";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function showSchedule(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = getSession(req, res);

  const response = await fetchShowSchedule(
    req.query.scheduleId as string,
    user.sub
  );

  res.status(200).json(response);
});
