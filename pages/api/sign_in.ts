import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import admin from "firebase-admin";
import { db } from "@/lib/firebase-admin";
import {
  FIRSchedule,
  FIRScheduleMember,
  FIRUser,
  MemberStatus,
  ScheduleRole,
  SignInDTO,
} from "@superfitapp/superfitjs";
import logger from "@/lib/LoggerService";

export default withApiAuthRequired(async function ProtectedRoute(req, res) {
  const session = getSession(req, res);
  const userId = session?.user?.sub;
  if (!userId) {
    res.status(401);
    res.end();
    return;
  }

  const { body } = req;

  let payload: SignInDTO | undefined = body["payload"];
  // Checking that the user is authenticated.
  if (!payload) {
    // Throwing an HttpsError so that the client gets the error details.
    throw Error("Sign in payload missing");
  }

  let currentUserSnap = await db.collection("users").doc(userId).get();
  const currentUser: FIRUser | undefined = currentUserSnap.data() as FIRUser;

  // Identify
  try {
    logger.identify(currentUser);
  } catch {
    // move on
  }

  if (currentUser) {
    res.json({ user: currentUser });
    return;
  }

  try {
    const randomNumber = Math.floor(Math.random() * 100 + 1);
    const email =
      payload.email.substring(0, payload.email.lastIndexOf("@")) ||
      "superfit_user";

    let firUser: FIRUser = {
      userId: userId,
      email: payload.email,
      username: payload.migratedUsername || `${email}${randomNumber}`,
    };
    if (payload.migratedBillingInfo) {
      firUser["billingInfo"] = payload.migratedBillingInfo;
    }

    // Create new user
    await admin.firestore().collection("users").doc(userId).create(firUser);

    // Identify
    try {
      logger.identify(firUser);
    } catch {
      // move on
    }

    // Add owner to roles
    let roles: any = {};
    roles[userId] = ScheduleRole.Owner;
    const scheduleTitle = "Personal Schedule";

    const schedule: FIRSchedule = {
      ownerId: userId,
      ownerDisplayName: firUser.username,
      created: admin.firestore.Timestamp.now(),
      title: scheduleTitle,
      color: "#DD9E00",
      roles: roles,
    };

    // Create schedule
    let newSchedule = await db.collection("schedules").add(schedule);
    let newScheduleId = newSchedule.id;

    const joinedTimestamp = admin.firestore.FieldValue.serverTimestamp();

    // Update active schedule list
    let member: FIRScheduleMember = {
      userId: userId,
      username: firUser.username,
      name: firUser.name,
      memberRole: schedule.roles[userId] || ScheduleRole.Member,
      scheduleTitle: scheduleTitle,
      scheduleId: newScheduleId,
      joined: joinedTimestamp,
      status: MemberStatus.Active,
    };

    // Add Member
    await db
      .collection("schedules")
      .doc(newScheduleId)
      .collection("schedule_members")
      .add(member);

    res.json({ user: firUser });
  } catch (error) {
    console.log(error);
    throw Error("Fetching user error");
  }
});
