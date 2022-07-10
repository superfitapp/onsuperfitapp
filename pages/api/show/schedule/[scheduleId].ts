import { NextApiRequest, NextApiResponse } from "next";
import { fetchShowSchedule } from "@/lib/schedule";
import rateLimit from "@/utils/rate-limit";
import { withSentry } from "@sentry/nextjs";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default withSentry(async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await limiter.check(res, 10, "FETCH_SCHEDULE_CACHE_TOKEN");
    const fetchRecentActivities = req.query?.fetchRecentActivities || "false";

    const response = await fetchShowSchedule({
      scheduleId: req.query.scheduleId as string,
      fetchRecentActivities: fetchRecentActivities == "true",
    });
    res.json(response)
    res.status(200).end()
  } catch {
    res.json({ error: 'Rate limit exceeded' })
    res.status(429).end()
  }
})
