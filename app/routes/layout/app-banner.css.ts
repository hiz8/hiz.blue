import { style, keyframes, vars, responsiveStyle } from "~/styles.css";

export const root = style([
  {
    background:
      "url(/images/patterns_01.png) top -10px right 0 no-repeat, linear-gradient(180deg, #7E94CE 0%, #13D5E7 48.96%, #13D5E7 81.25%, #F0F7D8 100%)",
    fontFamily: vars.font.family.brand,
    color: vars.color.text.white,
    display: "flex",
    alignItems: "center",
    gap: vars.space["4x"],
    height: 60,
    width: "100%",
    gridArea: "banner",
    position: "relative",
    paddingInline: vars.space["5x"],
    boxSizing: "border-box",
    overflow: "hidden",
  },
  responsiveStyle({
    md: {
      width: "230px",
      height: "100%",
      backgroundPosition: "bottom 0 left -150px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "fixed",
      top: 0,
      left: 60,
    },
  }),
]);

export const headlineLink = style({
  zIndex: 1,
  textDecoration: "none",
  color: "inherit",
});

export const headline = style([
  {
    fontWeight: 500,
    margin: 0,
  },
  responsiveStyle({
    md: {
      fontSize: 32,
    },
  }),
]);

export const subHeadline = style([
  {
    margin: 0,
    textAlign: "center",
    fontSize: 12,
    zIndex: 1,
  },
  responsiveStyle({
    md: {
      fontSize: 16,
    },
  }),
]);

const cloudOneKeyframes = keyframes({
  "0%": { top: 0, left: 0 },
  "100%": { top: "-100%", left: 100 },
});

export const cloudOne = style({
  backgroundImage:
    "radial-gradient( white 1%, transparent 3%), radial-gradient( white 0%, transparent 3%)",
  backgroundSize: "100px 100px",
  backgroundPosition: "5% 100%, 10% 50%",
  backgroundRepeat: "no-repeat",
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  width: "100%",
  animationName: cloudOneKeyframes,
  animationDuration: "33s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
});

const cloudTowKeyframes = keyframes({
  "0%": { top: "100%", left: 0 },
  "100%": { top: "-100%", left: 100 },
});

export const cloudTwo = style({
  backgroundImage:
    "radial-gradient( white 0%, transparent 3%), radial-gradient( white 0%, transparent 3%), radial-gradient( white 0%, transparent 3%), radial-gradient( white 1%, transparent 3%)",
  backgroundSize: "100px 100px",
  backgroundPosition: "0% 100%, 5% 50%, 10% 20%, 25% 95%",
  backgroundRepeat: "no-repeat",
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  width: "100%",
  animationName: cloudTowKeyframes,
  animationDuration: "20s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
});
