import { createGlobalTheme, type StyleRule } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    main: {
      brand: "#091581",
      white: "#fff",
    },
    text: {
      white: "#f7f9f9",
      black: "#1C274C",
      gray: "#666",
    },
    background: {
      white: "##f6fbff",
      blue: "#091581",
    },
    component: {
      border: "#E8E8E8",
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
    "9x": "36px",
    "10x": "40px",
  },
  font: {
    family: {
      sans: "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
      systemUI: "system-ui",
    },
    size: {
      "1x": "12px",
      "2x": "14px",
      "3x": "16px",
      "4x": "18px",
      "5x": "20px",
      "6x": "22px",
      "7x": "24px",
      "8x": "28px",
      "9x": "32px",
      "10x": "36px",
    },
    weight: {
      normal: "400",
      bold: "700",
    },
  },
});

const breakpoints = {
  sm: 600,
  md: 840,
  lg: 1280,
  xl: 1920,
} as const;

type Breakpoint = keyof typeof breakpoints;
type CSSProps = Omit<StyleRule, "@media" | "@supports">;
type ResponsiveStyle = {
  sm?: CSSProps;
  md?: CSSProps;
  lg?: CSSProps;
  xl?: CSSProps;
};

const makeMediaQuery = (breakpoint: Breakpoint) => (styles?: CSSProps) =>
  !styles || Object.keys(styles).length === 0
    ? {}
    : {
        [`screen and (min-width: ${breakpoints[breakpoint]}px)`]: styles,
      };

const mediaQuery = {
  sm: makeMediaQuery("sm"),
  md: makeMediaQuery("md"),
  lg: makeMediaQuery("lg"),
  xl: makeMediaQuery("xl"),
};

export const responsiveStyle = ({
  sm,
  md,
  lg,
  xl,
}: ResponsiveStyle): StyleRule => ({
  "@media": {
    ...mediaQuery.sm(sm ?? {}), // Hnadset
    ...mediaQuery.md(md ?? {}), // Small tablet
    ...mediaQuery.lg(lg ?? {}), // Large tablet
    ...mediaQuery.xl(xl ?? {}),
  },
});

export * from "@vanilla-extract/css";
