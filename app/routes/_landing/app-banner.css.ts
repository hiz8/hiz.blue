import { style, keyframes, vars, responsiveStyle } from "~/styles.css";

export const root = style([
  {
    background:
      "url(/images/patterns_01.png) top -250px right 0 no-repeat, linear-gradient(180deg, #7E94CE 0%, #13D5E7 48.96%, #13D5E7 81.25%, #F0F7D8 100%)",
    color: vars.color.text.white,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    width: "100%",
    gridArea: "banner",
    position: "relative",
  },
  responsiveStyle({
    md: {
      height: "100%",
      backgroundPosition: "bottom 0 left -150px",
    },
  }),
]);

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
