import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { auth } from "@/lib/firebase-admin";

export default withApiAuthRequired(async function ProtectedRoute(req, res) {
  const session = getSession(req, res);

  if (!session.user.sub) {
    res.status(401);
    res.end();
    return;
  }

  let token = await generateFirebaseToken(session.user.sub);
  res.json({ token: token });
});

async function generateFirebaseToken(userId: string): Promise<string> {
  try {
    return auth.createCustomToken(userId);
  } catch (err) {
    throw Error("Something went wrong acquiring a Firebase token.");
  }
}
