const Intercom = require("intercom-client");

const intercomClient = new Intercom.Client({
  token: process.env.INTERCOM_ACCESS_TOKEN,
});

import { FIRUser } from "@superfitapp/superfitjs";
import SegmentAnalytics from "analytics-node";
const segmentAnalytics = new SegmentAnalytics(process.env.SEGMENT_WRITE_KEY);

interface MailchimpSubscriber {
  name?: string;
  userId: string;
  username: string;
  email: string;

  // stripe pro end date
  proEndedAt?: string;

  // apple pro end date
  appleEnded?: string;
}

class LoggerService {
  async identify(user: FIRUser) {
    var traits: MailchimpSubscriber = {
      name: user.name,
      userId: user.userId,
      email: user.email,
      username: user.username,
      proEndedAt: user.billingInfo?.stripe?.superfitSubscriptionEndedAt?.toString(),
      appleEnded: user.billingInfo?.apple?.endedAt?.toString(),
    };

    try {
      await intercomClient.users.create({
        type: "user",
        name: user.name,
        user_id: user.userId,
        email: user.email,
        custom_attributes: {
          username: user.username,
          proEndedAt: user.billingInfo?.stripe?.superfitSubscriptionEndedAt?.toString(),
          appleEnded: user.billingInfo?.apple?.endedAt?.toString(),
        },
      });

      segmentAnalytics.identify({
        userId: user.userId,
        traits: traits,
      });
    } catch (error) {
      throw error;
    }
  }
}

const logger = new LoggerService();

export default logger;
