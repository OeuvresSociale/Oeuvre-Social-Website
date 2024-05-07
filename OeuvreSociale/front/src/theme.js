// this file for dark and white mode
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


//color pallette
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        blue: {
            100: "#ccd1dc",
            200: "#99a3b9",
            300: "#667595",
            400: "#334772",
            500: "#00194f",
            600: "#00143f",
            700: "#000f2f",
            800: "#000a20",
            900: "#000510"
        },
        green_theme: {
            100: "#d0e7e6",
            200: "#a1cecd",
            300: "#71b6b4",
            400: "#429d9b",
            500: "#138582",
            600: "#0f6a68",
            700: "#0b504e",
            800: "#083534",
            900: "#041b1a"
        },
        white: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333"
},
        gray: {
            100: "#ebebeb",
            200: "#d6d6d6",
            300: "#c2c2c2",
            400: "#adadad",
            500: "#999999",
            600: "#7a7a7a",
            700: "#5c5c5c",
            800: "#3d3d3d",
            900: "#1f1f1f"
        },
        white_grey: {
            100: "#fefdfd",
            200: "#fcfcfc",
            300: "#fbfafa",
            400: "#f9f9f9",
            500: "#f8f7f7",
            600: "#c6c6c6",
            700: "#959494",
            800: "#636363",
            900: "#323131"
        },
        red: {
            100: "#fccece",
            200: "#f89d9d",
            300: "#f56c6c",
            400: "#f13b3b",
            500: "#ee0a0a",
            600: "#be0808",
            700: "#8f0606",
            800: "#5f0404",
            900: "#300202"
        },
        green: {
            100: "#e2f8e0",
            200: "#c5f0c1",
            300: "#a8e9a3",
            400: "#8be184",
            500: "#6eda65",
            600: "#58ae51",
            700: "#42833d",
            800: "#2c5728",
            900: "#162c14"
        },
        yellow: {
            100: "#fff1d7",
            200: "#ffe4af",
            300: "#ffd686",
            400: "#ffc95e",
            500: "#ffbb36",
            600: "#cc962b",
            700: "#997020",
            800: "#664b16",
            900: "#33250b"
        },
      }
    : {
        blue: {
        },
            100: "#000510",
            200: "#000a20",
            300: "#000f2f",
            400: "#00143f",
            500: "#00194f",
            600: "#334772",
            700: "#667595",
            800: "#99a3b9",
            900: "#ccd1dc",
        green_theme: {
            100: "#041b1a",
            200: "#083534",
            300: "#0b504e",
            400: "#0f6a68",
            500: "#138582",
            600: "#429d9b",
            700: "#71b6b4",
            800: "#a1cecd",
            900: "#d0e7e6",
        },
        white: {
            100: "#333333",
            200: "#666666",
            300: "#999999",
            400: "#cccccc",
            500: "#ffffff",
            600: "#ffffff",
            700: "#ffffff",
            800: "#ffffff",
            900: "#ffffff",
        },
        gray: {
            100: "#1f1f1f",
            200: "#3d3d3d",
            300: "#5c5c5c",
            400: "#7a7a7a",
            500: "#999999",
            600: "#adadad",
            700: "#c2c2c2",
            800: "#d6d6d6",
            900: "#ebebeb",
        },
        white_grey: {
            100: "#323131",
            200: "#636363",
            300: "#959494",
            400: "#c6c6c6",
            500: "#f8f7f7",
            600: "#f9f9f9",
            700: "#fbfafa",
            800: "#fcfcfc",
            900: "#fefdfd",
        },
        red: {
            100: "#300202",
            200: "#5f0404",
            300: "#8f0606",
            400: "#be0808",
            500: "#ee0a0a",
            600: "#f13b3b",
            700: "#f56c6c",
            800: "#f89d9d",
            900: "#fccece",
        },
        green: {
            100: "#162c14",
            200: "#2c5728",
            300: "#42833d",
            400: "#58ae51",
            500: "#6eda65",
            600: "#8be184",
            700: "#a8e9a3",
            800: "#c5f0c1",
            900: "#e2f8e0",
        },
        yellow: {
            100: "#33250b",
            200: "#664b16",
            300: "#997020",
            400: "#cc962b",
            500: "#ffbb36",
            600: "#ffc95e",
            700: "#ffd686",
            800: "#ffe4af",
            900: "#fff1d7",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            blue: {
              main: colors.blue[500],
            },
            secondary: {
              main: colors.green_theme[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.white_grey[500],
            },
          }
        : {
            // palette values for light mode
            blue: {
              main: colors.blue[100],
            },
            secondary: {
              main: colors.green_theme[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
                default: colors.white_grey[500],
            },
          }),
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
