import { NextApiRequest, NextApiResponse } from "next";
import { fetchShowSchedule } from "@/lib/schedule";
import rateLimit from "@/utils/rate-limit";
import { fetchShowActivity } from "@/lib/activity";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await limiter.check(res, 10, "FETCH_ACTIVITY_CACHE_TOKEN");
    const scheduleId = req.query.scheduleId as string;
    const activityId = req.query.activityId as string;
    const response = await fetchShowActivity(scheduleId, activityId);
    res.status(200).json(response);
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }
}