import { NextApiRequest, NextApiResponse } from "next";
import { fetchShowSchedule } from "@/lib/show-schedule";
import rateLimit from "@/utils/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetchShowSchedule(req.query.scheduleId as string);
    res.status(200).json(response);
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }
}
