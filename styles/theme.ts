import React from "react";
import { theme as chakraTheme } from "@chakra-ui/react";

const customTheme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    heading: `Nunito,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    semibold: 700,
    bold: 800,
    extrabold: 800,
  },
};

export default customTheme;
