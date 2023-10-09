import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    main: {
      brand: "#091581",
      white: "#fff",
    },
    text: {
      white: "#fff",
      black: "#1C274C",
      gray: "#888",
    },
    background: {
      white: "#fff",
      blue: "#091581",
    },
    component: {
      border: "#D9D9D9",
    },
  },
  space: {
    "0x": "0px",
    "1x": "4px",
    "2x": "8px",
    "3x": "12px",
    "4x": "16px",
    "5x": "20px",
    "6x": "24px",
    "7x": "28px",
    "8x": "32px",
  },
});

export const breakpointNames = ["sm", "md", "lg", "xl"] as const;

export const breakpoints = {
  sm: 600,
  md: 840,
  lg: 1280,
  xl: 1920,
} as const;

type ResponsiveStyle = {
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
};

export const responsiveStyle = ({ sm, md, lg, xl }: ResponsiveStyle) => ({
  "@media": {
    [`screen and (min-width: ${breakpoints.sm}px)`]: sm ?? {}, // Hnadset
    [`screen and (min-width: ${breakpoints.md}px)`]: md ?? {}, // Small tablet
    [`screen and (min-width: ${breakpoints.lg}px)`]: lg ?? {}, // Large tablet
    [`screen and (min-width: ${breakpoints.xl}px)`]: xl ?? {},
  },
});

export * from "@vanilla-extract/css";
