import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@/utils/rate-limit";
import { fetchActivity } from "@/lib/activity";
import { withSentry } from "@sentry/nextjs";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default withSentry(async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await limiter.check(res, 10, "FETCH_ACTIVITY_CACHE_TOKEN");
    const scheduleId = req.query.scheduleId as string;
    const activityId = req.query.activityId as string;
    const response = await fetchActivity(scheduleId, activityId);
    res.json(response)
    res.status(200).end()
  } catch {
    res.json({ error: 'Rate limit exceeded' })
    res.status(429).end()
  }
})