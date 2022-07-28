import {
  handleAuth,
  handleCallback,
  handleLogout,
  Session,
  handleLogin
} from "@auth0/nextjs-auth0";

import * as Sentry from '@sentry/nextjs';
import { useFetchUser } from "@/lib/firUser";
import firebase from "@/lib/firebase";

// https://github.com/auth0/nextjs-auth0/issues/383
// Set to VERCEL_URL or override with AUTH0_BASE_URL 
process.env.AUTH0_BASE_URL = process.env.AUTH0_BASE_URL || process.env.VERCEL_URL;

const afterCallback = async (req, res, session: Session, state) => {
  try {
    if (session.accessToken && session.user?.sub) {
      // Set user information, as well as tags and further extras
      Sentry.configureScope(scope => {
        Sentry.captureMessage(`User logged in: ${session.user.sub}`);
        scope.setUser(session.user);
      });

      await fetch(`${process.env.FIREBASE_CLOUD_FUNCTION_URL}/sign_in`, {
        method: "POST",
        body: JSON.stringify({
          email: session.user.email
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.accessToken}`
        })
      });

      // Firebase
      useFetchUser({ required: true });
    }
  } catch (error) {
    // Don't throw attempt for firebase token.
    console.error(error);
  }
  return session
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          scope: 'openid email profile name picture'
        }
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
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
