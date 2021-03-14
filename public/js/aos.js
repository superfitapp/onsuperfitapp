//
// aos.js
// Theme module
//

// import AOS from "aos";
const AOS = require("aos");
const options = {
  duration: 700,
  easing: "ease-out-quad",
  once: true,
  delay: 1000,
  startEvent: "load",
};

AOS.init(options);
