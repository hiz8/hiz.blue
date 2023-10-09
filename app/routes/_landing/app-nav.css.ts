import { style, vars, responsiveStyle } from "~/styles.css";

export const root = style([
  {
    backgroundColor: vars.color.background.blue,
    color: vars.color.text.white,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "50px",
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 1,
    gridArea: "nav",
  },
  responsiveStyle({
    md: {
      width: "auto",
      height: "100%",
      position: "static",
      flexDirection: "column",
      justifyContent: "center",
      gap: vars.space["6x"],
    },
  }),
]);

export const link = style([
  {
    color: "inherit",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "24px",
  },
  responsiveStyle({
    md: {
      fontSize: "32px",
    },
  }),
]);

export const lintText = style([
  {
    fontSize: "10px",
  },
  responsiveStyle({
    md: {
      display: "none", // hide text on desktop
    },
  }),
]);
