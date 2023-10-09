import { style, vars } from "~/styles.css";

export const root = style({
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
});

export const link = style({
  color: "inherit",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: "10px",
});
