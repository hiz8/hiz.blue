import { style, vars, responsiveStyle } from "~/styles.css";

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
