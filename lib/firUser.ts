import { useState, useEffect } from "react";
import fetcher from "@/utils/fetcher";
import firebase from "@/lib/firebase";
import { useUser } from "@auth0/nextjs-auth0";

export async function fetchUser() {
  const currentFirUser = await firebase.auth().currentUser;

  if (typeof window !== "undefined" && window["__user"]) {
    return window["__user"];
  }

  function deleteAndExit() {
    delete window["__user"];
    return null;
  }

  if (currentFirUser) {
    window["__user"] = currentFirUser;
    return currentFirUser;
  }

  let { token } = await fetcher(
    `/api/firebase_token`
  );

  if (!token) {
    deleteAndExit;
  }

  let firCreds = await firebase.auth().signInWithCustomToken(token);
  const firUser = firCreds.user;

  if (!firUser) {
    delete window["__user"];
    return null;
  }

  if (typeof window !== "undefined") {
    window["__user"] = firUser;
  }
  return firUser;
}

export function useFetchUser({
  required,
}): { user: firebase.User; loading: boolean } {
  const [loading, setLoading] = useState(
    () => !(typeof window !== "undefined" && window["__user"])
  );

  const [user, setUser] = useState<firebase.User>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window["__user"] || null;
  });

  useEffect(
    () => {
      if (!loading && user) {
        return;
      }

      setLoading(true);
      let isMounted = true;

      fetchUser().then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = "/api/login";
            return;
          }
          setUser(user);
          setLoading(false);
        }
      });

      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { user, loading };
}
