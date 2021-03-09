import {
  handleAuth,
  handleCallback,
  handleLogout,
  Session,
} from "@auth0/nextjs-auth0";
import { auth } from "@/lib/firebase-admin";
import { useFetchUser } from "@/lib/firUser";
import firebase from "@/lib/firebase";

const afterCallback = async (req, res, session: Session, state) => {
  try {
    if (session.accessToken && session.user?.sub) {
      useFetchUser({ required: true });

      // const firToken = await auth.createCustomToken(session.user.sub);
      // const firCredentials = await firebase
      //   .auth()
      //   .signInWithCustomToken(firToken);
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
  async logout(req, res) {
    await firebase.auth().signOut();
    await handleLogout(req, res);
  },
});
