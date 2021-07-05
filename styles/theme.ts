import { hexColor, hexToRGB } from "@/utils/helpers";
import { theme as chakraTheme } from "@chakra-ui/react";
import { getColor, mode } from "@chakra-ui/theme-tools";
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
    components: {
      ...chakraTheme.components,
      CustomSelect: {
        parts: ["field", "menu", "option"],
        baseStyle: (props: Record<string, any>) => ({
          field: {
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 50ms ease",
          },
          option: {
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            _focus: {
              bg: mode(`gray.100`, `whiteAlpha.100`)(props),
            },
            _hover: {
              bg: mode(`gray.100`, `whiteAlpha.100`)(props),
            },
            _selected: {
              bg: mode(`gray.200`, `whiteAlpha.200`)(props),
            },
            _disabled: {
              opacity: 0.4,
              cursor: "not-allowed",
            },
          },
          menu: {
            bg: mode("white", "gray.700")(props),
            boxShadow: mode("sm", "dark-lg")(props),
            color: "inherit",
            minW: "3xs",
            py: "2",
            borderRadius: "md",
            borderWidth: "1px",
          },
        }),
        variants: {
          outline: (props: Record<string, any>) => ({
            field: {
              border: "1px solid",
              borderColor: "inherit",
              _hover: {
                borderColor: mode("gray.300", "whiteAlpha.400")(props),
              },
              _disabled: {
                opacity: 0.4,
                cursor: "not-allowed",
                borderColor: "inherit",
              },
              _readOnly: {
                boxShadow: "none !important",
                userSelect: "all",
              },
              _invalid: {
                borderColor: getColor(
                  props.theme,
                  mode("red.500", "red.300")(props)
                ),
                boxShadow: `0 0 0 1px ${getColor(
                  props.theme,
                  mode("red.500", "red.300")(props)
                )}`,
              },
              _focus: {
                borderColor: getColor(
                  props.theme,
                  mode(
                    `${props.colorScheme}.500`,
                    `${props.colorScheme}.300`
                  )(props)
                ),
                boxShadow: `0 0 0 1px ${getColor(
                  props.theme,
                  mode(
                    `${props.colorScheme}.500`,
                    `${props.colorScheme}.300`
                  )(props)
                )}`,
              },
              _expanded: {
                borderColor: getColor(
                  props.theme,
                  mode(
                    `${props.colorScheme}.500`,
                    `${props.colorScheme}.300`
                  )(props)
                ),
                boxShadow: `0 0 0 1px ${getColor(
                  props.theme,
                  mode(
                    `${props.colorScheme}.500`,
                    `${props.colorScheme}.300`
                  )(props)
                )}`,
              },
            },
          }),
        },
        sizes: {
          xs: {
            field: {
              fontSize: "xs",
              px: 2,
              h: 6,
              borderRadius: "sm",
            },
          },
          sm: {
            field: {
              fontSize: "sm",
              px: 3,
              h: 8,
              borderRadius: "sm",
            },
          },
          md: {
            option: {
              px: 4,
              h: 10,
            },
            field: {
              fontSize: "md",
              px: 4,
              h: 10,
              borderRadius: "md",
            },
          },
          lg: {
            field: {
              fontSize: "lg",
              px: 4,
              h: 12,
              borderRadius: "md",
            },
          },
        },
        defaultProps: {
          size: "md",
          variant: "outline",
          colorScheme: "teal",
        },
      },
    },
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
