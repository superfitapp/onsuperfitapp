import { hexColor, hexToRGB } from "@/utils/helpers";
import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
import { ShowFIRSchedule } from "@superfitapp/superfitjs";

export interface SFThemeProps {
  primaryHex: string;
  secondaryHex: string;
}

export function createThemeFromSchedule(schedule?: ShowFIRSchedule): any {
  return createTheme({
    primaryHex: schedule?.color,
    secondaryHex: schedule?.secondaryColor,
  });
}

export function createTheme(themeProps: SFThemeProps): any {
  const { primaryHex = "#506690", secondaryHex = "#4abf85" } = themeProps || {};

  const customTheme = {
    ...chakraTheme,
    fonts: {
      ...chakraTheme.fonts,
      heading: `Nunito,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    },

    fontWeights: {
      ...chakraTheme.fontWeights,
      normal: 400,
      medium: 600,
      semibold: 700,
      bold: 800,
      extrabold: 800,
    },
    colors: {
      ...chakraTheme.colors,
      primary: hexColor(primaryHex),
      primaryAlpha: {
        100: hexToRGB(hexColor(primaryHex), 0.1),
        200: hexToRGB(hexColor(primaryHex), 0.2),
        300: hexToRGB(hexColor(primaryHex), 0.3),
        400: hexToRGB(hexColor(primaryHex), 0.4),
        500: hexToRGB(hexColor(primaryHex), 0.5),
        600: hexToRGB(hexColor(primaryHex), 0.6),
        700: hexToRGB(hexColor(primaryHex), 0.7),
        800: hexToRGB(hexColor(primaryHex), 0.8),
        900: hexToRGB(hexColor(primaryHex), 0.9),
      },
      secondary: hexColor(secondaryHex),
    },
  };
  return customTheme;
}

export default createTheme;
