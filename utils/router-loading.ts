import { NextRouter } from "next/router";
import React from "react";

export function routerLoading(
  router: NextRouter
): { isLoading: boolean; effect: () => void; onDestroy: () => void } {
  const [routerLoading, setRouterLoading] = React.useState<boolean>(false);

  let routeChangeStart = () => setRouterLoading(true);
  let routeChangeComplete = () => setRouterLoading(false);

  return {
    isLoading: routerLoading,
    effect: () => {
      router.events.on("routeChangeStart", routeChangeStart);
      router.events.on("routeChangeComplete", routeChangeComplete);
      router.events.on("routeChangeError", routeChangeComplete);
    },
    onDestroy: () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    },
  };
}
