import {
  handleAuth,
  handleCallback,
  handleLogout,
  Session,
} from "@auth0/nextjs-auth0";
import * as Sentry from '@sentry/nextjs';
import { useFetchUser } from "@/lib/firUser";
import firebase from "@/lib/firebase";

const afterCallback = async (req, res, session: Session, state) => {
  try {
    if (session.accessToken && session.user?.sub) {
      // Set user information, as well as tags and further extras
      Sentry.configureScope(scope => {
        Sentry.captureMessage(`User logged in: ${session.user.sub}`);
        scope.setUser(session.user);
      });
      useFetchUser({ required: true });
    }
  } catch (error) {
    // Don't throw attempt for firebase token.
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
    Sentry.configureScope(scope => {
      Sentry.captureMessage(`User signed out.`);
      scope.clear();
    });
  },
});
