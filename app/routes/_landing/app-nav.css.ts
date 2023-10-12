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
      gap: vars.space["5x"],
    },
  }),
]);

export const link = style([
  {
    color: "inherit",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    width: "44px",
    height: "44px",
    borderRadius: "14px",

    ":hover": {
      backgroundColor: "rgba( 255, 255, 255, 0.3)",
    },
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
