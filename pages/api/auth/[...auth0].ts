import { handleAuth, handleCallback, Session } from "@auth0/nextjs-auth0";
import firebase from "@/lib/firebase";
import { auth } from "@/lib/firebase-admin";

const afterCallback = async (req, res, session: Session, state) => {
  try {
    if (session.accessToken && session.user?.sub) {
      const firToken = await auth.createCustomToken(session.user.sub);
      const firCredentials = await firebase
        .auth()
        .signInWithCustomToken(firToken);
    }
  } catch (error) {
    // don't throw attempt for firebase token
  }

  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
