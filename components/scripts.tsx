import App, { AppContext } from "next/app";
import { useEffect } from "react";

function Scripts() {
  useEffect(() => {
    require("bootstrap");
    // require("flickity");
    // require("flickity-fade");

    require("@/public/js/aos");
    require("@/public/js/popover");
    require("@/public/js/modal");
    require("@/public/js/smooth-scroll");
  }, []);
  return <div></div>;
}

export default Scripts;
